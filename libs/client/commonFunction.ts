import { CATEGORY } from "@utils/define/category";

export const dateToString = (date: Date | string) => {
  const init = new Date(date);
  return `${init.getFullYear()}-${init.getMonth() + 1 < 10 ? "0" : ""}${
    init.getMonth() + 1
  }-${init.getDate() < 10 ? "0" : ""}${init.getDate()}`;
};

export const dateToStringFromServer = (date: Date) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const init = new Date(new Date(date).getTime() + KR_TIME_DIFF);
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
    return "/images/user/default_profile.svg";
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

export const categoryToString = ({
  index,
  type,
}: {
  index: number;
  type: "query" | "title";
}) => {
  if (type === "query") {
    return CATEGORY.find((item) => item.idx === index)?.query;
  }
  if (type === "title") {
    return CATEGORY.find((item) => item.idx === index)?.title;
  }
};
