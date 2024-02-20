import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { UserSetting } from '../../models/user-settings.model';
import { setCopyright, setPhotographer, setCopyrightAndPhotographer } from './set-metadata';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { TopoMap } from '../../models/topo-map.enum';

const basicUserSettings: UserSetting = {
  appMode: AppMode.Prod,
  language: LangKey.nb,
  currentGeoHazard: [GeoHazard.Snow],
  observationDaysBack: [{ geoHazard: GeoHazard.Snow, daysBack: 2 }],
  completedStartWizard: true,
  supportTiles: [],
  showMapCenter: true,
  showObservations: true,
  showGeoSelectInfo: true,
  useRetinaMap: false,
  completedSimpleObsOnboarding: true,
  preferCompleteSnowObservations: true,
  featureToggeGpsDebug: false,
  featureToggleDeveloperMode: false,
  topoMap: TopoMap.default,
};

describe('setCopyright', () => {
  it('should throw exception if attachment is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: 'JOLOKV' };

    // Act
    const act = () => {
      setCopyright(userSettings, null);
    };

    // Assert
    expect(act).toThrowError('attachment is null or undefined');
  });

  it('should return attachment if userSettings.copyright is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: null };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setCopyright(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
  });

  it('should return attachment if userSettings.copyright is undefined', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: undefined };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setCopyright(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
  });

  it('should not change attachment if attachment.Copyright is not null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: 'JOLOKV' };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
      Copyright: 'NVE',
    };

    // Act
    const result = setCopyright(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
    expect(result.Copyright).toEqual('NVE');
  });

  it('should set userSettings.copyright on attachment if it is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: 'JOLOKV' };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setCopyright(userSettings, attachment);

    // Assert
    expect(result).toEqual({ ...attachment, Copyright: 'JOLOKV' });
  });
});

describe('setPhotographer', () => {
  it('should throw exception if attachment is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV' };

    // Act
    const act = () => {
      setPhotographer(userSettings, null);
    };

    // Assert
    expect(act).toThrowError('attachment is null or undefined');
  });

  it('should return attachment if userSettings.photographer is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: null };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setPhotographer(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
  });

  it('should return attachment if userSettings.photographer is undefined', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: undefined };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setPhotographer(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
  });

  it('should not change attachment if attachment.Photographer is not null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV' };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
      Photographer: 'NVE',
    };

    // Act
    const result = setPhotographer(userSettings, attachment);

    // Assert
    expect(result).toEqual(attachment);
    expect(result.Photographer).toEqual('NVE');
  });

  it('should set userSettings.photographer on attachment if it is null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV' };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setPhotographer(userSettings, attachment);

    // Assert
    expect(result).toEqual({ ...attachment, Photographer: 'JOLOKV' });
  });

  it('should set userSettings.photographer on attachment if it is undefined', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV' };
    const attachment: AttachmentUploadEditModel = {
      id: '1234',
      type: 'Attachment',
    };

    // Act
    const result = setPhotographer(userSettings, attachment);

    // Assert
    expect(result).toEqual({ ...attachment, Photographer: 'JOLOKV' });
  });
});

describe('setCopyrightAndPhotographer', () => {
  it('should set userSettings.photographer and userSettings.copyright on all attachments', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV', copyright: 'NVE' };
    const attachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ];

    // Act
    const result = setCopyrightAndPhotographer(userSettings, attachments);

    // Assert
    expect(result).toEqual([
      { id: '1234', type: 'Attachment', Photographer: 'JOLOKV', Copyright: 'NVE' },
      { id: '5678', type: 'Attachment', Photographer: 'JOLOKV', Copyright: 'NVE' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test', Copyright: 'NVE' },
      { id: 'efgh', type: 'Attachment', Photographer: 'JOLOKV', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ]);
  });

  it('should not change anything if userSettings.photographer and userSettings.copyright are null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: null, copyright: null };
    const attachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ];

    // Act
    const result = setCopyrightAndPhotographer(userSettings, attachments);

    // Assert
    expect(result).toEqual([
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ]);
  });

  it('should only set userSettings.photographer if userSettings.copyright are null', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV', copyright: null };
    const attachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ];

    // Act
    const result = setCopyrightAndPhotographer(userSettings, attachments);

    // Assert
    expect(result).toEqual([
      { id: '1234', type: 'Attachment', Photographer: 'JOLOKV' },
      { id: '5678', type: 'Attachment', Photographer: 'JOLOKV' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Photographer: 'JOLOKV', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ]);
  });

  it('should only set userSettings.copyright if userSettings.photographer is undefined', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, copyright: 'NVE' };
    const attachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ];

    // Act
    const result = setCopyrightAndPhotographer(userSettings, attachments);

    // Assert
    expect(result).toEqual([
      { id: '1234', type: 'Attachment', Copyright: 'NVE' },
      { id: '5678', type: 'Attachment', Copyright: 'NVE' },
      { id: 'abcd', type: 'Attachment', Photographer: 'Test', Copyright: 'NVE' },
      { id: 'efgh', type: 'Attachment', Copyright: 'Test2' },
      { id: 'ijkl', type: 'Attachment', Photographer: 'Test3', Copyright: 'Test4' },
    ]);
  });

  it('should throw error if any attachments are null or undefined', () => {
    // Arrange
    const userSettings = { ...basicUserSettings, photographer: 'JOLOKV', copyright: 'NVE' };
    const attachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment' },
      { id: '5678', type: 'Attachment' },
      null,
      undefined,
    ];

    // Act
    const act = () => {
      setCopyrightAndPhotographer(userSettings, attachments);
    };

    // Assert
    expect(act).toThrowError('attachment is null or undefined');
  });
});
