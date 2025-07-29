import { IUser } from "@/modules/user/user.interface";

import { generateToken, verifyToken } from "./jwtHelpers";

export function createUserTokens(payload: Partial<IUser>) {
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  return {
    accessToken,
    refreshToken,
  };
}

export function createNewAccessTokenWithRefreshToken(refreshToken: string) {
  // We'll verify the refresh token and generate a new access token
  try {
    // The payload should be the user info stored in the refresh token
    const { password, ...userPayload } = verifyToken<Partial<IUser>>(
      refreshToken,
      "refresh",
    );
    // Remove password if present, for safety
    const accessToken = generateToken(userPayload, "access");
    return { accessToken };
  } catch (error) {
    // You may want to throw a custom error or return null/undefined
    throw new Error("Invalid refresh token");
  }
}
