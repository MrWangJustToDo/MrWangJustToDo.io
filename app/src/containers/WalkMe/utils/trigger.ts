export const TRIGGER = "tour-trigger";

export const trigger = (delay = 500) => {
  const hack = document.createElement("div");
  hack.classList.add(TRIGGER);
  setTimeout(() => {
    try {
      document.body.appendChild(hack);
    } catch (err) {
      void 0;
    } finally {
      hack.remove();
    }
  }, delay);
};
