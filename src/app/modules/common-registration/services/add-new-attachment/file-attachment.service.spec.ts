import { TestBed } from '@angular/core/testing';
import { FilesystemPlugin, MkdirOptions, ReaddirOptions, ReaddirResult } from '@capacitor/filesystem';
import { firstValueFrom } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import FileAttachmentService, { FILESYSTEM } from './file-attachment.service';

const DATA_URI = 'file:///data';
const ROOT_URI = `${DATA_URI}/attachments`;

/**
 * Enkel falsk filsystem-modell: holder styr på hvilke mapper som finnes,
 * og oppfører seg som Capacitor Filesystem på iOS/Android når mappa allerede finnes.
 */
class FakeFolders {
  readonly folders = new Set<string>();

  readdir = async (options: ReaddirOptions): Promise<ReaddirResult> => {
    // gi andre kall sjansen til å komme inn mellom readdir og mkdir, slik det skjer på telefonen
    await Promise.resolve();
    const parent = options.path === '' ? DATA_URI : options.path;
    const names = [...this.folders]
      .filter((folder) => folder.substring(0, folder.lastIndexOf('/')) === parent)
      .map((folder) => folder.substring(folder.lastIndexOf('/') + 1));
    return { files: names.map((name) => ({ name, type: 'directory', size: 0, mtime: 0, uri: `${parent}/${name}` })) };
  };

  mkdir = async (options: MkdirOptions): Promise<void> => {
    await Promise.resolve();
    const path = options.directory ? `${DATA_URI}/${options.path}` : options.path;
    if (this.folders.has(path)) {
      throw Object.assign(new Error(`Directory at '${path}' already exists, cannot be overwritten.`), {
        code: 'OS-PLUG-FILE-0010',
      });
    }
    this.folders.add(path);
  };
}

const createMeta = (id: string): AttachmentUploadEditModel => ({
  id,
  GeoHazardTID: GeoHazard.Snow,
  RegistrationTID: RegistrationTid.DangerObs,
  AttachmentMimeType: 'image/jpeg',
  type: 'Attachment',
  fileName: `${id}.jpg`,
});

describe('FileAttachmentService', () => {
  let service: FileAttachmentService;
  let logger: jasmine.SpyObj<LoggingService>;
  let fakeFolders: FakeFolders;
  let readdirSpy: jasmine.Spy;
  let mkdirSpy: jasmine.Spy;
  let writeFileSpy: jasmine.Spy;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggingService', ['debug', 'error', 'log']);
    fakeFolders = new FakeFolders();
    const filesystem = jasmine.createSpyObj<FilesystemPlugin>('Filesystem', [
      'readdir',
      'mkdir',
      'getUri',
      'writeFile',
    ]);
    readdirSpy = filesystem.readdir.and.callFake(fakeFolders.readdir);
    mkdirSpy = filesystem.mkdir.and.callFake(fakeFolders.mkdir);
    filesystem.getUri.and.callFake(async ({ path }) => ({ uri: `${DATA_URI}/${path}` }));
    writeFileSpy = filesystem.writeFile.and.resolveTo({ uri: '' });

    TestBed.configureTestingModule({
      providers: [
        FileAttachmentService,
        { provide: LoggingService, useValue: logger },
        { provide: FILESYSTEM, useValue: filesystem },
      ],
    });
    service = TestBed.inject(FileAttachmentService);
  });

  it('creates the root folder only once when attachments are saved simultaneously', async () => {
    await Promise.all([
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-2', createMeta('b'))),
    ]);

    const rootMkdirCalls = mkdirSpy.calls.allArgs().filter(([options]) => options.path === 'attachments');
    expect(rootMkdirCalls.length).toBe(1);
    expect(writeFileSpy).toHaveBeenCalledTimes(2);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('creates the registration folder only once when attachments are saved simultaneously', async () => {
    await Promise.all([
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('b'))),
      firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('c'))),
    ]);

    const registrationMkdirCalls = mkdirSpy.calls.allArgs().filter(([options]) => options.path === `${ROOT_URI}/reg-1`);
    expect(registrationMkdirCalls.length).toBe(1);
    expect(writeFileSpy).toHaveBeenCalledTimes(3);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('treats folders that already exist as created, even if readdir did not list them', async () => {
    fakeFolders.folders.add(ROOT_URI);
    fakeFolders.folders.add(`${ROOT_URI}/reg-1`);
    readdirSpy.and.resolveTo({ files: [] }); // f.eks. utdatert liste, eller mappa ble opprettet av noen andre

    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeResolved();

    expect(writeFileSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ path: `${ROOT_URI}/reg-1/a.json` }));
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('logs and rethrows other errors when creating the root folder, and tries again on the next call', async () => {
    const ioError = new Error("'mkdir' failed: unknown error");
    mkdirSpy.and.rejectWith(ioError);

    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeRejectedWith(ioError);
    expect(logger.error).toHaveBeenCalledWith(ioError, jasmine.any(String), jasmine.any(String));

    mkdirSpy.and.callFake(fakeFolders.mkdir);
    await expectAsync(firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')))).toBeResolved();
    expect(writeFileSpy).toHaveBeenCalledTimes(1);
  });

  it('logs other errors when creating the registration folder, and still returns the folder path', async () => {
    fakeFolders.folders.add(ROOT_URI);
    const ioError = new Error("'mkdir' failed: unknown error");
    mkdirSpy.and.rejectWith(ioError);

    await firstValueFrom(service.saveAttachmentMeta$('reg-1', createMeta('a')));

    expect(logger.error).toHaveBeenCalledWith(ioError, jasmine.any(String), jasmine.any(String));
    expect(writeFileSpy).toHaveBeenCalledOnceWith(jasmine.objectContaining({ path: `${ROOT_URI}/reg-1/a.json` }));
  });
});
