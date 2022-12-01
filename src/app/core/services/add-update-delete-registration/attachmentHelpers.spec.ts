import cloneDeep from 'clone-deep';
import { GeoHazard } from 'src/app/modules/common-core/models';
import {
  AttachmentUploadEditModel,
  WaterLevelMeasurementUploadModel,
} from 'src/app/modules/common-registration/registration.models';
import { AttachmentEditModel, RegistrationEditModel } from 'src/app/modules/common-regobs-api';
import { addAttachmentToRegistration } from './attachmentHelpers';

const getSmallTestReg = (): RegistrationEditModel => ({
  GeneralObservation: { ObsComment: 'a test' },
  GeoHazardTID: GeoHazard.Snow,
  DtObsTime: 'test',
});

describe('addAttachmentToRegistration', () => {
  it('should not modify the draft, but return a new one', () => {
    const registration = getSmallTestReg();
    const registrationCopy = cloneDeep(registration);
    const attachment: AttachmentUploadEditModel = { id: '12345-test-id', type: 'Attachment', AttachmentUploadId: '12' };
    const updatedRegistration = addAttachmentToRegistration(attachment, registration);
    expect(updatedRegistration.Attachments.length).toBe(1);
    expect(registration).toEqual(registrationCopy);
    expect(registration.Attachments).toBeUndefined();
  });

  it('should add the attachment', () => {
    const registration = getSmallTestReg();

    const attachment: AttachmentUploadEditModel = {
      id: '12345-test-id',
      type: 'Attachment',
      AttachmentUploadId: 'test-id-56789',
      Comment: 'Test image',
    };

    const addedAttachment: AttachmentEditModel = {
      AttachmentUploadId: 'test-id-56789',
      Comment: 'Test image',
    };

    const updatedReg = addAttachmentToRegistration(attachment, registration);
    expect(updatedReg.Attachments[0]).toEqual(addedAttachment);
  });

  it('should add the attachment as the last item in the list of already added attachments', () => {
    const attachmentA: AttachmentEditModel = { AttachmentUploadId: 'test-id-a' };
    const attachmentB: AttachmentEditModel = { AttachmentUploadId: 'test-id-b' };
    const attachmentACopy = cloneDeep(attachmentA);
    const attachmentBCopy = cloneDeep(attachmentB);

    const registration: RegistrationEditModel = {
      ...getSmallTestReg(),
      Attachments: [attachmentA, attachmentB],
    };

    const attachmentToAdd: AttachmentUploadEditModel = {
      id: '12345-test-id',
      type: 'Attachment',
      AttachmentUploadId: 'test-id-56789',
    };

    const updatedReg = addAttachmentToRegistration(attachmentToAdd, registration);
    expect(updatedReg.Attachments[0]).toEqual(attachmentACopy);
    expect(updatedReg.Attachments[1]).toEqual(attachmentBCopy);
    expect(updatedReg.Attachments.length).toBe(3);
  });

  it('should add water level attachments to respective water level measurements', () => {
    const measurementA: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'abc',
    };

    const measurementB: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'def',
      Attachments: [{ AttachmentUploadId: 'test-id-a' }],
    };

    const measurementC: WaterLevelMeasurementUploadModel = {
      WaterLevelMeasurementId: 1,
      WaterLevelValue: 50,
      DtMeasurementTime: 'testdato',
      ref: 'ghi',
    };

    const registration: RegistrationEditModel = {
      ...getSmallTestReg(),
      WaterLevel2: {
        WaterLevelMeasurement: [measurementA, measurementB, measurementC],
      },
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

    const updatedRegistration = addAttachmentToRegistration(attachmentToAdd, registration);
    expect(updatedRegistration.WaterLevel2.WaterLevelMeasurement[0].Attachments[0]).toEqual(addedAttachment);
    expect(updatedRegistration.WaterLevel2.WaterLevelMeasurement[0].Attachments.length).toBe(1);
    expect(updatedRegistration.WaterLevel2.WaterLevelMeasurement[1].Attachments.length).toBe(1);
    expect(updatedRegistration.WaterLevel2.WaterLevelMeasurement[2].Attachments).toBeUndefined();

    const attachmentToAdd2: AttachmentUploadEditModel = {
      id: '56789-test-id',
      ref: 'def',
      type: 'WaterLevelMeasurementAttachment',
      AttachmentUploadId: 'test-id-12345',
    };

    const addedAttachment2: AttachmentEditModel = {
      AttachmentUploadId: 'test-id-12345',
    };

    const updatedRegistration2 = addAttachmentToRegistration(attachmentToAdd2, updatedRegistration);
    expect(updatedRegistration2.WaterLevel2.WaterLevelMeasurement[0].Attachments.length).toBe(1);
    expect(updatedRegistration2.WaterLevel2.WaterLevelMeasurement[1].Attachments[1]).toEqual(addedAttachment2);
    expect(updatedRegistration2.WaterLevel2.WaterLevelMeasurement[1].Attachments.length).toBe(2);
    expect(updatedRegistration2.WaterLevel2.WaterLevelMeasurement[2].Attachments).toBeUndefined();
  });

  it('should throw if the attachment has no AttachmentUploadId', () => {
    expect(() => {
      addAttachmentToRegistration({ Comment: 'Test image', id: 'test', type: 'Attachment' }, getSmallTestReg());
    }).toThrow();
  });
});
