const createSimpleUuid = (value: number): string => {
  const format = '00000000-0000-0000-0000-000000000000';
  const valueString = value.toString();

  return `${format.substring(0, format.length - valueString.length)}${valueString}`;
};

export default createSimpleUuid;
