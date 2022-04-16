import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { CATEGORY } from "utils/define/category";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const categoryList = CATEGORY.map((item) => item.query);
  if (
    req?.page?.params?.category &&
    !categoryList.includes(req.page.params.category)
  ) {
    return NextResponse.redirect(new URL("/blog", req.url));
  }
}
