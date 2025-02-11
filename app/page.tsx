"use client";
export const dynamic = "force-dynamic"; // Prevents static build issues

import { useEffect, useState } from "react";

const API_ENDPOINT = "https://iutqwuscug.execute-api.ap-south-1.amazonaws.com/telegram-bot-handler";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [startAppParam, setStartAppParam] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    import("@twa-dev/sdk").then((module) => {
      const WebApp = module.default;

      if (!WebApp.initDataUnsafe) {
        console.error("Error: WebApp.initDataUnsafe is undefined");
        return;
      }

      // Get startapp parameter safely
      const param = WebApp.initDataUnsafe?.start_param || null;
      setStartAppParam(param);

      // Get user details safely
      if (WebApp.initDataUnsafe?.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        setUserData(user);

        // Store user data and then fetch channel link
        sendUserData(user).then(() => {
          if (param) fetchChannelLink(param);
        });
      }
    }).catch((err) => {
      console.error("Error loading WebApp SDK:", err);
    });
  }, []);

  const sendUserData = async (user: UserData) => {
    const payload = {
      operation: "store-user-data",
      data: JSON.stringify({
        id: user.id.toString(),
        first_name: user.first_name || "None",
        user_name: user.username || "None",
        last_name: user.last_name || "None",
      }),
    };

    try {
      console.log("Sending user data:", payload);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("User data sent successfully:", result);
    } catch (error) {
      console.error("Error sending user data:", error);
    }
  };

  const fetchChannelLink = async (encryptedName: string) => {
    const payload = {
      operation: "fetch-channel-link",
      data: JSON.stringify({ encrpyted_name: encryptedName })
    };

    try {
      console.log("Fetching channel link with:", payload);

      // Instead of fetching, directly redirect to API Gateway
      window.location.href = API_ENDPOINT + "?operation=fetch-channel-link&data=" + encodeURIComponent(JSON.stringify({ encrpyted_name: encryptedName }));

    } catch (error) {
      console.error("Error redirecting to channel link:", error);
    }
  };


  return <main className="p-4"></main>;
}
