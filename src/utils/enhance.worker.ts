import { enhanceMax } from './epic7';

declare let self: Worker;

const ctx: Worker = self as unknown as Worker;

ctx.addEventListener('message', (evt) => {
  const { equipment, count } = (evt as MessageEvent<any>).data;
  const reuslt = new Array(Number(count)).fill(1).map(() => {
    return enhanceMax(equipment);
  });

  postMessage(reuslt);
});
