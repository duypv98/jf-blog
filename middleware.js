// eslint-disable-next-line no-unused-vars
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param {NextRequest} req
 */
export function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:function*"
}