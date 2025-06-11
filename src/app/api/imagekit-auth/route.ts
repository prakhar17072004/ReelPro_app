// app/api/auth/route.ts
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // Must be private
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const result = imagekit.getAuthenticationParameters();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "ImageKit Auth Failed" },
      { status: 500 }
    );
  }
}
