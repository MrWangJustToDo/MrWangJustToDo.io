export const clickDom = (selector: string) => () => {
  const dom: HTMLDivElement | null = document.querySelector(selector);
  dom?.click();
};
