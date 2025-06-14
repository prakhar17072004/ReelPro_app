"use client";

import React from "react";
import { IKContext } from "imagekitio-react"; // ✅ Correct import
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const { signature, expire, token } = await response.json();
    return { signature, expire, token };
  } catch (error) {
    console.error(error);
    throw new Error("ImageKit Authentication Request failed");
  }
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </IKContext>
    </SessionProvider>
  );
}
