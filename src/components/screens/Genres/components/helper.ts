export const HandleClickOption = (
  value: string,
  array: string[],
  setArray: (platforms: string[]) => void,
) => {
  const arrLow: string[] = [];

  for (const item of array) {
    arrLow.push(item.toLowerCase());
  }

  const index = arrLow.indexOf(value.toLowerCase());

  const arr: string[] = [...array];

  if (index >= 0) {
    arr.splice(index, 1);
  } else arr.push(value);

  console.log("arr", arr);
  console.log("arrLow", arrLow);

  return setArray(arr);
};
