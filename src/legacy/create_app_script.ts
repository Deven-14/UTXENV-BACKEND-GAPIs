// import { get_auth } from "../auth/get_auth"
// import {auth, drive} from "@googleapis/drive"
// import "dotenv/config"

// export async function create_app_script() // adding auth, drive, so that we don't import drive, auth everywhere, it takes a lot of time
// {
//     const fileMetadata = {
//         name: "utsav2",
//         mimeType: 'application/vnd.google-apps.script',
//         parents: ["17zKmeab24OI48-1M2gY1ru0g2TlwN6ey"] // ! implies that is it never undefined
//     };

//     const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
//     const gdrive = drive({version: 'v3', auth: gauth});

//     try {

//         const res = await gdrive.files.create({
//             auth: gauth,
//             requestBody: fileMetadata,
//             fields: "id"
//         });

//         console.log('apps script successfully created');
//         return res.data.id;

//     } catch (error) {
//         console.error(error);
//         console.log("Error creating apps script");
//     }
// }

// create_app_script();