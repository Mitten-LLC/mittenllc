import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (hostname === "training.mitten.consulting" && request.nextUrl.pathname === "/") {
    const trainingUrl = request.nextUrl.clone();
    trainingUrl.pathname = "/training";
    return NextResponse.rewrite(trainingUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
