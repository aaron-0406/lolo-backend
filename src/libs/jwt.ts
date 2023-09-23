import jwt from "jsonwebtoken";

// Sign token function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signToken = (payload: any, secret: string) => {
  return jwt.sign(payload, secret, { expiresIn: 14400 });
};

// Verify token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
