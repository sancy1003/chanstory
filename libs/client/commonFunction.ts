import { CATEGORY } from "@utils/define/category";

export const dateToString = (date: Date | string) => {
  const init = new Date(date);
  return `${init.getFullYear()}-${init.getMonth() + 1 < 10 ? "0" : ""}${
    init.getMonth() + 1
  }-${init.getDate() < 10 ? "0" : ""}${init.getDate()}`;
};
export const formattingImageURL = (url?: string | null, type?: string) => {
  let imageType = type ? type : "public";
  if (url) {
    return `https://imagedelivery.net/R2WiK4wfRK3oBXTwjgzQfA/${url}/${imageType}`;
  } else {
    return "";
  }
};
export const formattingUserProfileURL = (
  url?: string | null,
  type?: string
) => {
  let imageType = type ? type : "public";
  if (url) {
    return `https://imagedelivery.net/R2WiK4wfRK3oBXTwjgzQfA/${url}/${imageType}`;
  } else {
    return "/images/profile/defaultProfile.svg";
  }
};
export const categoryToNumber = ({
  query,
  title,
}: {
  query?: string;
  title?: string;
}) => {
  if (query) {
    return CATEGORY.find((item) => item.query === query)?.idx;
  }
  if (title) {
    return CATEGORY.find((item) => item.title === title)?.idx;
  }
};
