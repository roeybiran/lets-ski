export const lerp = (start: number, stop: number, amt: number) => {
  return amt * (stop - start) + start;
};

export const dist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.hypot(x2 - x1, y2 - y1);
};

export const toRadians = (degrees: number) => degrees * (Math.PI / 180);
