import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Line 4 post")
    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        if (!SECRET_KEY) {
            return NextResponse.json({ error: "Missing SECRET_KEY" }, { status: 500 });
        }

        const body = await req.json();
        const { encryptedName } = body;

        if (!encryptedName) {
            return NextResponse.json({ error: "Missing encryptedName" }, { status: 400 });
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

        return NextResponse.json({ channelLink }, { status: 200 });

    } catch (error) {
        console.error("Decryption failed:", error);
        return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
    }
}

export function GET() {
    console.log("Line 34 get")
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
