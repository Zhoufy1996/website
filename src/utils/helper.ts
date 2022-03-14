// 数组中随机选择一项
export const randomSelect = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};
