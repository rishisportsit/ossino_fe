function deepCompare(obj1: object, obj2: object) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !deepCompare(
        obj1[key as keyof typeof obj1],
        obj2[key as keyof typeof obj2],
      )
    ) {
      return false;
    }
  }

  return true;
}

export default deepCompare;
