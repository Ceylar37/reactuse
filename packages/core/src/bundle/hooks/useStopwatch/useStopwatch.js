import { useEffect, useState } from 'react';
const getStopwatchTime = (time) => {
  if (!time)
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      count: 0
    };
  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return { days, hours, minutes, seconds, count: time };
};
/**
 * @name useStopwatch
 * @description - Hook that creates a stopwatch functionality
 * @category Time
 *
 * @overload
 * @param {number} [initialTime=0] The initial time of the timer
 * @param {boolean} [options.enabled=true] The enabled state of the timer
 * @returns {UseStopwatchReturn} An object containing the current time and functions to interact with the timer
 *
 * @example
 * const { seconds, minutes, start, pause, reset } = useStopwatch(1000, { enabled: false });
 *
 * @overload
 * @param {number} [options.initialTime=0] -The initial time of the timer
 * @param {boolean} [options.enabled=true] The enabled state of the timer
 * @returns {UseStopwatchReturn} An object containing the current time and functions to interact with the timer
 *
 * @example
 * const { seconds, minutes, start, pause, reset } = useStopwatch({ initialTime: 1000, enabled: false });
 */
export const useStopwatch = (...params) => {
  const initialTime = (typeof params[0] === 'number' ? params[0] : params[0]?.initialTime) ?? 0;
  const options = typeof params[0] === 'number' ? params[1] : params[0];
  const [time, setTime] = useState(getStopwatchTime(initialTime));
  const [paused, setPaused] = useState(!options?.enabled);
  useEffect(() => {
    if (paused) return;
    const onInterval = () => {
      setTime((prevTime) => {
        const updatedCount = prevTime.count + 1;
        if (updatedCount % 60 === 0) {
          return {
            ...prevTime,
            minutes: prevTime.minutes + 1,
            seconds: 0,
            count: updatedCount
          };
        }
        if (updatedCount % (60 * 60) === 0) {
          return {
            ...prevTime,
            hours: prevTime.hours + 1,
            minutes: 0,
            seconds: 0,
            count: updatedCount
          };
        }
        if (updatedCount % (60 * 60 * 24) === 0) {
          return {
            ...prevTime,
            days: prevTime.days + 1,
            hours: 0,
            minutes: 0,
            seconds: 0,
            count: updatedCount
          };
        }
        return {
          ...prevTime,
          seconds: prevTime.seconds + 1,
          count: updatedCount
        };
      });
    };
    const interval = setInterval(() => onInterval(), 1000);
    return () => clearInterval(interval);
  }, [paused]);
  return {
    ...time,
    paused,
    pause: () => setPaused(true),
    start: () => setPaused(false),
    reset: () => setTime(getStopwatchTime(initialTime)),
    toggle: () => setPaused((prevPause) => !prevPause)
  };
};
