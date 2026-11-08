import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { Types } from 'mongoose';

type TokenPayload = {
  userId: string ;
  role: 'user' | 'admin';
};

function genAccessToken({ userId, role }: TokenPayload) {
  const accessToken = jwt.sign(
    { userId: userId.toString(), role: role },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "60m" },
  );

  return accessToken;
}

function genRefreshToken({ userId, role }: TokenPayload) {
  const refreshToken = jwt.sign(
    { userId: userId, role: role },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7Days" },
  );

  return refreshToken;
}

function readAccessToken(accessToken: string) {
  return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET) as TokenPayload

}
function readRefreshToken(refreshToken: string) {
  return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET) as TokenPayload
}



export { genAccessToken, genRefreshToken, readAccessToken, readRefreshToken };
