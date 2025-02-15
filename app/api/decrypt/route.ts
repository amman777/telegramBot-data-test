import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🔹 API Route Hit: /api/decrypt");

  try {
    const { encryptedName } = await req.json();
    console.log("Received Encrypted Name:", encryptedName);

    const SECRET_KEY = process.env.TDDLE_SECRET; // Read from .env.local

    if (!SECRET_KEY) {
      console.error("❌ SECRET_KEY is missing!");
      return NextResponse.json({ error: "Secret key not found" }, { status: 500 });
    }

    let paddedInput = encryptedName.replace(/-/g, "+").replace(/_/g, "/");
    paddedInput += "=".repeat((4 - (paddedInput.length % 4)) % 4);
    let encryptedBytes = atob(paddedInput);

    let decryptedText = "";
    for (let i = 0; i < encryptedBytes.length; i++) {
      decryptedText += String.fromCharCode(
        encryptedBytes.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      );
    }

    let channelLink = `https://t.me/+${decryptedText}`;
    console.log("✅ Decrypted Channel Link:", channelLink);

    return NextResponse.json({ channelLink });
  } catch (error) {
    console.error("❌ Decryption Error:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}

// Handle GET requests correctly
export async function GET() {
  console.log("The get method")
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
