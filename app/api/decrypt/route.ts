import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { encryptedName } = await req.json();
    const SECRET_KEY = process.env.SECRET_KEY; // Read from .env.local

    if (!SECRET_KEY) {
      return NextResponse.json({ error: "Secret key not found" }, { status: 500 });
    }

    // Convert Telegram-safe Base64 back to normal Base64
    let paddedInput = encryptedName.replace(/-/g, "+").replace(/_/g, "/");
    paddedInput += "=".repeat((4 - (paddedInput.length % 4)) % 4);

    // Decode Base64
    let encryptedBytes = atob(paddedInput);

    // XOR Decryption
    let decryptedText = "";
    for (let i = 0; i < encryptedBytes.length; i++) {
      decryptedText += String.fromCharCode(
        encryptedBytes.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      );
    }

    // Construct the final channel link
    let channelLink = `https://t.me/+${decryptedText}`;

    return NextResponse.json({ channelLink });
  } catch (error) {
    console.error("Decryption failed:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
