// https://usehooks-typescript.com/react-hook/use-debounce

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/*
USAGE
const [value, setValue] = useState<string>('')
const debouncedValue = useDebounce<string>(value, 500)

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value)
}

useEffect(() => {
  // Do fetch here...
}, [debouncedValue])

return (
  <input type="text" value={value} onChange={handleChange} />
)
*/
