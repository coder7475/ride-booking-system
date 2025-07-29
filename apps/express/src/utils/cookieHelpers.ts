import { env } from "@/configs/envConfig";
import { parseExpiry } from "@repo/math";
import { Response } from "express";

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (
  res: Response,
  { accessToken, refreshToken }: AuthTokens,
) => {
  const isDev = env.NODE_ENV === "development";

  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: parseExpiry("15m"), // 15 minutes - better taken from env
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: parseExpiry("7d"), // 7 days - better taken from env
    });
  }
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
