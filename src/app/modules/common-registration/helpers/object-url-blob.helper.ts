export function getBlobFromUrl(url: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onerror = ((err) => reject(err));
    xhr.onload = () => {
      if (xhr.status == 200) {
        resolve(xhr.response);
      }else{
        reject(new Error('Not found'));
      }
    };
    xhr.send();
  });
}