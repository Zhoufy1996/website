import { createWorker as cw } from 'tesseract.js';

const worker = cw();

export const initializeOCR = async (language: string) => {
  await worker.load();
  await worker.loadLanguage(language);
  await worker.initialize(language);
  console.log('initialize finished');
};

export const handleOCR = async (url: string) => {
  const { data } = await worker.recognize(url);
  await worker.terminate();
  return data.text;
};
