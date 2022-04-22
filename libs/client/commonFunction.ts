export const dateToString = (date: Date | string) => {
  const init = new Date(date);
  return `${init.getFullYear()}-${init.getMonth() + 1 < 10 ? "0" : ""}${
    init.getMonth() + 1
  }-${init.getDate() < 10 ? "0" : ""}${init.getDate()}`;
};
