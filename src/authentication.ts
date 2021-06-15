import * as jwt from 'jsonwebtoken';
import { Context } from './context';

export function simpleAuth(_: any, __: any, ctx: Context): boolean | Promise<boolean> {
  try {
    jwt.verify(ctx.headers.authorization.slice(7), process.env.JWT_SECRET);
  } catch {
    return false;
  }
  return true;
};

export function adminAuth(_: any, __: any, ctx: Context): boolean | Promise<boolean> {
  return simpleAuth(_, __, ctx);
};
