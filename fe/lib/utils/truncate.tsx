const truncate = (str: string) => {
  if (str.length < 20) return str;
  else return str.slice(0, 20) + "...";
};

export default truncate;
