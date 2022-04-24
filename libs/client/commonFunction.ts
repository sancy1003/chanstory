export const dateToString = (date: Date | string) => {
  const init = new Date(date);
  return `${init.getFullYear()}-${init.getMonth() + 1 < 10 ? "0" : ""}${
    init.getMonth() + 1
  }-${init.getDate() < 10 ? "0" : ""}${init.getDate()}`;
};
export const loadProfileURL = (url?: string | null, type?: string) => {
  let imageType = type ? type : "public";
  if (url) {
    return `https://imagedelivery.net/R2WiK4wfRK3oBXTwjgzQfA/${url}/${imageType}`;
  } else {
    return "/images/defaultProfile.svg";
  }
};
