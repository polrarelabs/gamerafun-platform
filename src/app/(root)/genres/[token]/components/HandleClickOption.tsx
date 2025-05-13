"use client";

export const HandleClickOption = (
  value: string,
  array: string[],
  setArray: (platforms: string[]) => void,
) => {
  const index = array.indexOf(value);

  const arr: string[] = [...array];

  if (index >= 0) {
    arr.splice(index, 1);
  } else arr.push(value);

  return setArray(arr);
};
