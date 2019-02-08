export class DataUrlHelper {

    static async toDataUrlWithSize(blob: Blob, mimeType: string): Promise<{ dataUrl: string, size: number }> {
        const dataUrl = await this.toDataUrl(blob, mimeType);
        return { size: blob.size, dataUrl };
    }

    static toDataUrl(blob: Blob, mimeType: string) {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(this.ensureCorrectMimeType(reader.result as string, mimeType));
            reader.onerror = () => reject();
            reader.readAsDataURL(blob);
        });
    }

    private static ensureCorrectMimeType(dataUrl: string, mimeType: string) {
        if (dataUrl.startsWith(`data:${mimeType};`)) {
            return dataUrl;
        } else {
            const textToFind = ';base64,';
            const index = dataUrl.indexOf(textToFind) + textToFind.length;
            return `data:${mimeType};base64,${dataUrl.substr(index)}`;
        }
    }
}
