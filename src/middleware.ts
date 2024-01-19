import { NextRequest, NextResponse, userAgent } from "next/server";
import NextHeaders from "./utils/headers";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  const nextHeaders = new NextHeaders(new Headers(request.headers))
    .setDeviceType(device.type)
    .build();

  return NextResponse.next({
    request: {
      headers: nextHeaders,
    },
  });
}
