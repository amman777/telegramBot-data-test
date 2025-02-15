import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        if (!SECRET_KEY) {
            return NextResponse.json({ error: "Missing SECRET_KEY" }, { status: 500 });
        }

        const { encryptedName } = await req.json();
        if (!encryptedName) {
            return NextResponse.json({ error: "Missing encryptedName" }, { status: 400 });
        }

        // Convert Telegram-safe Base64 back to normal Base64
        let paddedInput = encryptedName.replace(/-/g, "+").replace(/_/g, "/");

        // Ensure proper Base64 padding
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
        return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
    }
}
