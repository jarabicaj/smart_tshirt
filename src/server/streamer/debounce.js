export default function(func, wait) {
  let last = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - wait > last) {
      last = now;
      func(args);
    }
  };
}
