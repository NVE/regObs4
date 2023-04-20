import { AttachmentViewModel } from "./attachment-view-model";

export interface SearchRegistrationsWithAttachments {

        /// Unique registration id that contains attachments
        RegId: number

        /// List of registration's attachments
        Attachments: Array<AttachmentViewModel>
}
