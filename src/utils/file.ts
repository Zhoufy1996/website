export const importFile = (accept: string): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    let input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = accept;

    const handleReadFile = async () => {
      const file = input.files && input.files[0];
      if (file) {
        try {
          resolve(file);
        } catch (e) {
          reject(e);
        } finally {
          input.removeEventListener('change', handleReadFile);
          input = null as unknown as HTMLInputElement;
        }
      } else {
        reject(new Error('error'));
      }
    };

    input.addEventListener('change', handleReadFile);
    input.click();
  });
};
