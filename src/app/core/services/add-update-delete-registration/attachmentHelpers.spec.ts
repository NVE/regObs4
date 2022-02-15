import cloneDeep from 'clone-deep';
import { AttachmentUploadEditModel, WaterLevelMeasurementUploadModel } from 'src/app/modules/common-registration/registration.models';
import { AttachmentEditModel, RegistrationEditModel } from 'src/app/modules/common-regobs-api';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { addAttachmentToDraft } from './attachmentHelpers';

const getSmallTestDraft = (): RegistrationEditModel => ({
  GeneralObservation: { ObsComment: 'a test' },
  GeoHazardTID: GeoHazard.Snow,
  DtObsTime: 'test'
});

describe('addAttachmentToDraft', () => {

  it('should not modify the draft, but return a new one', () => {
    const draft = getSmallTestDraft();
    const draftCopy = cloneDeep(draft);
    const attachment: AttachmentUploadEditModel = { id: '12345-test-id', type: 'Attachment', AttachmentUploadId: '12' };
    const newDraft = addAttachmentToDraft(attachment, draft);
    expect(newDraft.Attachments.length).toBe(1);
    expect(draft).toEqual(draftCopy);
    expect(draft.Attachments).toBeUndefined();
  });

  it('should add the attachment', () => {
    const draft = getSmallTestDraft();

    const attachment: AttachmentUploadEditModel = {
      id: '12345-test-id',
      type: 'Attachment',
      AttachmentUploadId: 'test-id-56789',
      Comment: 'Test image'
    };

    const addedAttachment: AttachmentEditModel = {
      AttachmentUploadId: 'test-id-56789',
      Comment: 'Test image'
    };

    const newDraft = addAttachmentToDraft(attachment, draft);
    expect(newDraft.Attachments[0]).toEqual(addedAttachment);
  });

  it('should add the attachment as the last item in the list of already added attachments', () => {
    const attachmentA: AttachmentEditModel = { AttachmentUploadId: 'test-id-a' };
    const attachmentB: AttachmentEditModel = { AttachmentUploadId: 'test-id-b' };
    const attachmentACopy = cloneDeep(attachmentA);
    const attachmentBCopy = cloneDeep(attachmentB);

    const draft: RegistrationEditModel = {
      ...getSmallTestDraft(),
      Attachments: [attachmentA, attachmentB]
    };

    const attachmentToAdd: AttachmentUploadEditModel = {
      id: '12345-test-id',
      type: 'Attachment',
      AttachmentUploadId: 'test-id-56789',
    };

    const newDraft = addAttachmentToDraft(attachmentToAdd, draft);
    expect(newDraft.Attachments[0]).toEqual(attachmentACopy);
    expect(newDraft.Attachments[1]).toEqual(attachmentBCopy);
    expect(newDraft.Attachments.length).toBe(3);
  });

  it('should add water level attachments to respective water level measurements', () => {
    const measurementA: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'abc'
    };

    const measurementB: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'def',
      Attachments: [{ AttachmentUploadId: 'test-id-a' }]
    };

    const measurementC: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'ghi'
    };

    const draft: RegistrationEditModel = {
      ...getSmallTestDraft(),
      WaterLevel2: {
        WaterLevelMeasurement: [ measurementA, measurementB, measurementC ]
      }
    };

    const attachmentToAdd: AttachmentUploadEditModel = {
      id: '12345-test-id',
      ref: 'abc',
      type: 'WaterLevelMeasurementAttachment',
      AttachmentUploadId: 'test-id-56789',
    };

    const addedAttachment: AttachmentEditModel = {
      AttachmentUploadId: 'test-id-56789',
    };

    const newDraft = addAttachmentToDraft(attachmentToAdd, draft);
    expect(newDraft.WaterLevel2.WaterLevelMeasurement[0].Attachments[0]).toEqual(addedAttachment);
    expect(newDraft.WaterLevel2.WaterLevelMeasurement[0].Attachments.length).toBe(1);
    expect(newDraft.WaterLevel2.WaterLevelMeasurement[1].Attachments.length).toBe(1);
    expect(newDraft.WaterLevel2.WaterLevelMeasurement[2].Attachments).toBeUndefined();

    const attachmentToAdd2: AttachmentUploadEditModel = {
      id: '56789-test-id',
      ref: 'def',
      type: 'WaterLevelMeasurementAttachment',
      AttachmentUploadId: 'test-id-12345',
    };

    const addedAttachment2: AttachmentEditModel = {
      AttachmentUploadId: 'test-id-12345',
    };

    const newDraft2 = addAttachmentToDraft(attachmentToAdd2, newDraft);
    expect(newDraft2.WaterLevel2.WaterLevelMeasurement[0].Attachments.length).toBe(1);
    expect(newDraft2.WaterLevel2.WaterLevelMeasurement[1].Attachments[1]).toEqual(addedAttachment2);
    expect(newDraft2.WaterLevel2.WaterLevelMeasurement[1].Attachments.length).toBe(2);
    expect(newDraft2.WaterLevel2.WaterLevelMeasurement[2].Attachments).toBeUndefined();
  });

  it('should throw if the attachment has no AttachmentUploadId', () => {
    expect(() => {
      addAttachmentToDraft({ Comment: 'Test image', id: 'test', type: 'Attachment' }, getSmallTestDraft());
    }).toThrow();
  });
});
