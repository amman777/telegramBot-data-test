export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
        return res.status(500).json({ error: "Missing SECRET_KEY" });
    }

    try {
        const { encryptedName } = req.body;
        if (!encryptedName) {
            return res.status(400).json({ error: "Missing encryptedName" });
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

        return res.status(200).json({ channelLink });

    } catch (error) {
        return res.status(500).json({ error: "Decryption failed" });
    }
}
