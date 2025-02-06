// 'use client'

// import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// // Define the interface for user data
// interface UserData {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code: string;
//   is_premium?: boolean;
// }

// export default function Home() {
//   const [userData, setUserData] = useState<UserData | null>(null)

//   useEffect(() => {
//     if (WebApp.initDataUnsafe.user) {
//       setUserData(WebApp.initDataUnsafe.user as UserData)
//     }
//   }, [])

//   return (
//     <main className="p-4">
//       {userData ? (
//         <>
//           <h1 className="text-2xl font-bold mb-4">User Data</h1>
//           <ul>
//             <li>ID: {userData.id}</li>
//             <li>First Name: {userData.first_name}</li>
//             <li>Last Name: {userData.last_name || 'N/A'}</li>
//             <li>Username: {userData.username || 'N/A'}</li>
//             <li>Language Code: {userData.language_code}</li>
//             <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
//           </ul>
//         </>
//       ) : (
//         <div>Working...</div>
//       )}
//     </main>
//   )
// }




// redirect
// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     window.location.href = "https://t.me/+wS5_mahZWWk3OTI1"
//   }, [])

//   return (
//     <main className="p-4">
//       <div>Redirecting...</div>
//     </main>
//   )
// }




// parameter extraction
// 'use client'

// import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// export default function Home() {
//   const [startAppParam, setStartAppParam] = useState<string | null>(null)

//   useEffect(() => {
//     // Ensure WebApp is available
//     if (WebApp.initDataUnsafe.start_param) {
//       setStartAppParam(WebApp.initDataUnsafe.start_param)
//     }
//   }, [])

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Start App Parameter</h1>
//       <p>{startAppParam ? startAppParam : 'No parameter found'}</p>
//     </main>
//   )
// }



// Merege user details and parameter
// 'use client'

// import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// // Define the interface for user data
// interface UserData {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code: string;
//   is_premium?: boolean;
// }

// export default function Home() {
//   const [startAppParam, setStartAppParam] = useState<string | null>(null)
//   const [userData, setUserData] = useState<UserData | null>(null)

//   useEffect(() => {
//     // Get startapp parameter
//     if (WebApp.initDataUnsafe.start_param) {
//       setStartAppParam(WebApp.initDataUnsafe.start_param)
//     }

//     // Get user details
//     if (WebApp.initDataUnsafe.user) {
//       setUserData(WebApp.initDataUnsafe.user as UserData)
//     }
//   }, [])

//   return (
//     <main className="p-4">
//       {/* Display Start App Parameter */}
//       <h1 className="text-2xl font-bold mb-4">Start App Parameter</h1>
//       <p>{startAppParam ? startAppParam : 'No parameter found'}</p>

//       {/* Display User Details */}
//       <h1 className="text-2xl font-bold mt-6 mb-4">User Data</h1>
//       {userData ? (
//         <ul>
//           <li><strong>ID:</strong> {userData.id}</li>
//           <li><strong>First Name:</strong> {userData.first_name}</li>
//           <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
//           <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
//           <li><strong>Language Code:</strong> {userData.language_code}</li>
//           <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
//         </ul>
//       ) : (
//         <div>Fetching user details...</div>
//       )}
//     </main>
//   )
// }



// send data to lambda
// 'use client'

// import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// const API_ENDPOINT = 'https://iutqwuscug.execute-api.ap-south-1.amazonaws.com/telegram-bot-handler';

// // Define the interface for user data
// interface UserData {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code: string;
//   is_premium?: boolean;
// }

// export default function Home() {
//   const [startAppParam, setStartAppParam] = useState<string | null>(null)
//   const [userData, setUserData] = useState<UserData | null>(null)

//   useEffect(() => {
//     // Get startapp parameter
//     if (WebApp.initDataUnsafe.start_param) {
//       setStartAppParam(WebApp.initDataUnsafe.start_param)
//     }

//     // Get user details
//     if (WebApp.initDataUnsafe.user) {
//       const user = WebApp.initDataUnsafe.user as UserData;
//       setUserData(user);

//       // Send user data to API Gateway
//       sendUserData(user);
//     }
//   }, [])

//   const sendUserData = async (user: UserData) => {
//     const payload = {
//       operation: "store-user-data",
//       data: JSON.stringify({
//         id: user.id.toString(),
//         first_name: user.first_name || "None",
//         username: user.username || "None",
//         last_name: user.last_name || "None"
//       })
//     };

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       console.log("Data sent successfully:", result);
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }
//   };

//   return (
//     <main className="p-4">
//       {/* Display Start App Parameter */}
//       <h1 className="text-2xl font-bold mb-4">Start App Parameter</h1>
//       <p>{startAppParam ? startAppParam : 'No parameter found'}</p>

//       {/* Display User Details */}
//       <h1 className="text-2xl font-bold mt-6 mb-4">User Data</h1>
//       {userData ? (
//         <ul>
//           <li><strong>ID:</strong> {userData.id}</li>
//           <li><strong>First Name:</strong> {userData.first_name}</li>
//           <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
//           <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
//           <li><strong>Language Code:</strong> {userData.language_code}</li>
//           <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
//         </ul>
//       ) : (
//         <div>Fetching user details...</div>
//       )}
//     </main>
//   )
// }




//All previuos + display the url 
// 'use client'

// import WebApp from '@twa-dev/sdk'
// import { useEffect, useState } from 'react'

// const API_ENDPOINT = 'https://iutqwuscug.execute-api.ap-south-1.amazonaws.com/telegram-bot-handler';

// // Define the interface for user data
// interface UserData {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code: string;
//   is_premium?: boolean;
// }

// export default function Home() {
//   const [startAppParam, setStartAppParam] = useState<string | null>(null)
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [channelLink, setChannelLink] = useState<string | null>(null)

//   useEffect(() => {
//     // Get startapp parameter
//     if (WebApp.initDataUnsafe.start_param) {
//       const param = WebApp.initDataUnsafe.start_param;
//       setStartAppParam(param);

//       // Fetch channel link using startapp parameter
//       fetchChannelLink(param);
//     }

//     // Get user details
//     if (WebApp.initDataUnsafe.user) {
//       const user = WebApp.initDataUnsafe.user as UserData;
//       setUserData(user);

//       // Send user data to API Gateway
//       sendUserData(user);
//     }
//   }, [])

//   const sendUserData = async (user: UserData) => {
//     const payload = {
//       operation: "store-user-data",
//       data: JSON.stringify({
//         id: user.id.toString(),
//         first_name: user.first_name || "None",
//         username: user.username || "None",
//         last_name: user.last_name || "None"
//       })
//     };

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       console.log("User data sent successfully:", result);
//     } catch (error) {
//       console.error("Error sending user data:", error);
//     }
//   };

//   const fetchChannelLink = async (encryptedName: string) => {
//     const payload = {
//       operation: "fetch-channel-link",
//       data: JSON.stringify({ encrpyted_name: encryptedName })
//     };
//     console.log(payload)
//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       if (result && result.link) {
//         setChannelLink(result.link);
//       }
//       console.log("Channel link fetched:", result);
//     } catch (error) {
//       console.error("Error fetching channel link:", error);
//     }
//   };

//   return (
//     <main className="p-4">
//       {/* Display Start App Parameter */}
//       <h1 className="text-2xl font-bold mb-4">Start App Parameter</h1>
//       <p>{startAppParam ? startAppParam : 'No parameter found'}</p>

//       {/* Display User Details */}
//       <h1 className="text-2xl font-bold mt-6 mb-4">User Data</h1>
//       {userData ? (
//         <ul>
//           <li><strong>ID:</strong> {userData.id}</li>
//           <li><strong>First Name:</strong> {userData.first_name}</li>
//           <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
//           <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
//           <li><strong>Language Code:</strong> {userData.language_code}</li>
//           <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
//         </ul>
//       ) : (
//         <div>Fetching user details...</div>
//       )}

//       {/* Display Channel Link */}
//       <h1 className="text-2xl font-bold mt-6 mb-4">Channel Link</h1>
//       {channelLink ? (
//         <a href={channelLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//           {channelLink}
//         </a>
//       ) : (
//         <div>Fetching channel link...</div>
//       )}
//     </main>
//   )
// }



// Fixes the error
'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

const API_ENDPOINT = 'https://iutqwuscug.execute-api.ap-south-1.amazonaws.com/telegram-bot-handler';

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [startAppParam, setStartAppParam] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [channelLink, setChannelLink] = useState<string | null>(null)

  useEffect(() => {
    try {
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

        // First, store user data, then fetch the channel link
        sendUserData(user).then(() => {
          if (param) fetchChannelLink(param);
        });
      }
    } catch (error) {
      console.error("Error initializing WebApp:", error);
    }
  }, []);

  const sendUserData = async (user: UserData) => {
    const payload = {
      operation: "store-user-data",
      data: JSON.stringify({
        id: user.id.toString(),
        first_name: user.first_name || "None",
        username: user.username || "None",
        last_name: user.last_name || "None"
      })
    };

    try {
      console.log("Sending user data:", payload);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      console.log("Channel link fetched:", result);
        useEffect(() => {
          window.location.href = result
        }, [])
      // Ensure the fetched result.link is a valid string before redirecting
      // if (result && typeof result.link === 'string' && result.link.startsWith("https://t.me/")) {
      //   console.log("Redirecting to:", result.link);
      //   window.location.href = result.link;
      // } else {
      //   console.error("Invalid channel link received:", result);
      // }
    } catch (error) {
      console.error("Error fetching channel link:", error);
    }
};

  return (
    <main className="p-4">
      {/* Display Start App Parameter */}
      <h1 className="text-2xl font-bold mb-4">Start App Parameter</h1>
      <p>{startAppParam ? startAppParam : 'No parameter found'}</p>

      {/* Display User Details */}
      <h1 className="text-2xl font-bold mt-6 mb-4">User Data</h1>
      {userData ? (
        <ul>
          <li><strong>ID:</strong> {userData.id}</li>
          <li><strong>First Name:</strong> {userData.first_name}</li>
          <li><strong>Last Name:</strong> {userData.last_name || 'N/A'}</li>
          <li><strong>Username:</strong> {userData.username || 'N/A'}</li>
          <li><strong>Language Code:</strong> {userData.language_code}</li>
          <li><strong>Is Premium:</strong> {userData.is_premium ? 'Yes' : 'No'}</li>
        </ul>
      ) : (
        <div>Fetching user details...</div>
      )}

      {/* Display Channel Link */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Channel Link</h1>
      {channelLink && typeof channelLink === 'string' ? (
        <a href={channelLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {channelLink}
        </a>
      ) : (
        <div>Fetching channel link...</div>
      )}
    </main>
  )
}



