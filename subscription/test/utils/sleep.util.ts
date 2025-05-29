/**
 * @param seconds Default: 1
 */
export function sleep(seconds = 1) {
  return new Promise((resolve) =>
    setTimeout(resolve, seconds * 1000),
  );
}
