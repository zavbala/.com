import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Command-line HTTP clients get the man page; browsers fall through to the
// HTML page. So `curl zavbala.com` prints a real man page, while a browser
// visiting the same URL renders app/page.tsx as usual.
const CLI_AGENTS = /\b(curl|wget|httpie|libcurl|powershell|python-requests)\b/i;

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  if (CLI_AGENTS.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = "/man";
    return NextResponse.rewrite(url);
  }

  // Browsers fall through to the HTML page — but leave a breadcrumb in the
  // response headers for the curious who pop open the network tab.
  const response = NextResponse.next();
  response.headers.set("x-easter-egg", "try: curl zavbala.com");
  return response;
}

export const config = {
  // Only intercept the home page; everything else is untouched.
  matcher: "/",
};
