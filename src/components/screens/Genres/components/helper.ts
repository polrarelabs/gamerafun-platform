export const HandleClickOption = (
  value: string,
  array: string[],
  setArray: (platforms: string[]) => void,
) => {
  const arrLow: string[] = [];

  for (const item of array) {
    arrLow.push(item.toUpperCase());
  }

  const index = arrLow.indexOf(value.toUpperCase());

  const arr: string[] = [...array];

  if (index >= 0) {
    arr.splice(index, 1);
  } else arr.push(value);
  return setArray(arr);
};
