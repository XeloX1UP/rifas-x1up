import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url));
  if (request.nextUrl.pathname == "/user") {
    // const cookie = request.cookies.get("usuario");
    // if (!cookie || cookie.value == "") {
    //   return NextResponse.redirect(new URL("/user/login", request.url));
    // }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user"],
};
