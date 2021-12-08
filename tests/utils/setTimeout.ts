import timers from 'timers';

/**
 * Promise version of setTimeout. timers/promises was only added in node 16
 * @param ms - time in ms to wait
 */
export default function setTimeout(ms: number): Promise<void> {
  return new Promise(resolve => {
    return timers.setTimeout(() => resolve(), ms);
  });
}
