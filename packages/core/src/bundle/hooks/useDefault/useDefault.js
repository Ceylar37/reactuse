import { useState } from 'react';
/**
 * @name useDefault
 * @description - Hook that returns the default value
 * @category Utilities
 *
 * @template Value The type of the value
 * @param {Value} initialValue The initial value
 * @param {Value} defaultValue The default value
 * @returns {[Value, (value: Value) => void]} An array containing the current value and a function to set the value
 *
 * @example
 * const [value, setValue] = useDefault(initialValue, defaultValue);
 */
export const useDefault = (initialValue, defaultValue) => {
  const [value, setValue] = useState(initialValue);
  return [value === undefined || value === null ? defaultValue : value, setValue];
};
