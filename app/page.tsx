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
'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    // Get startapp parameter
    if (WebApp.initDataUnsafe.start_param) {
      setStartAppParam(WebApp.initDataUnsafe.start_param)
    }

    // Get user details
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])

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
    </main>
  )
}
