import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUserData;
  }
}

export interface SessionUserData {
  id: number;
  account: string;
  profileURL: string | null;
  nickname: string;
  role: string;
  status: number;
}

const cookieOptions = {
  cookieName: "chanstorysession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
