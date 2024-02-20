import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { UserSetting } from 'src/app/core/models/user-settings.model';

export const setPhotographer = (userSettings: UserSetting, attachment: AttachmentUploadEditModel) => {
  if (attachment == null) {
    throw new Error('attachment is null or undefined');
  }

  if (userSettings?.photographer == null) {
    return attachment;
  }

  if (attachment?.Photographer != null) {
    return attachment;
  }

  return {
    ...attachment,
    Photographer: userSettings.photographer,
  };
};

export const setCopyright = (userSettings: UserSetting, attachment: AttachmentUploadEditModel) => {
  if (attachment == null) {
    throw new Error('attachment is null or undefined');
  }

  if (userSettings?.copyright == null) {
    return attachment;
  }

  if (attachment?.Copyright != null) {
    return attachment;
  }

  return {
    ...attachment,
    Copyright: userSettings.copyright,
  };
};

export const setCopyrightAndPhotographer = (userSettings: UserSetting, attachments: AttachmentUploadEditModel[]) => {
  return attachments.map((a) => setCopyright(userSettings, a)).map((a) => setPhotographer(userSettings, a));
};
