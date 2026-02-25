import jwt from "jsonwebtoken";

export type TokenPayload = {
  userId: number;
  email: string;
  role: "USER" | "ADMIN";
};

type JwtPayloadWithType = TokenPayload & {
  tokenType: "access" | "refresh";
};

const getAccessSecret = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

export const generateAccessToken = (payload: TokenPayload) => {
  const secret = getAccessSecret();
  if (!secret) throw new Error("JWT access secret is not configured");

  return jwt.sign({ ...payload, tokenType: "access" }, secret, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  const secret = getRefreshSecret();
  if (!secret) throw new Error("JWT refresh secret is not configured");

  return jwt.sign({ ...payload, tokenType: "refresh" }, secret, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  const secret = getAccessSecret();
  if (!secret) throw new Error("JWT access secret is not configured");

  const decoded = jwt.verify(token, secret) as JwtPayloadWithType;
  if (decoded.tokenType !== "access") {
    throw new Error("Invalid token type for access token");
  }

  return {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  } as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  const secret = getRefreshSecret();
  if (!secret) throw new Error("JWT refresh secret is not configured");

  const decoded = jwt.verify(token, secret) as JwtPayloadWithType;
  if (decoded.tokenType !== "refresh") {
    throw new Error("Invalid token type for refresh token");
  }

  return {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  } as TokenPayload;
};
