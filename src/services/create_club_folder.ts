// import { google } from "googleapis"
import { drive, auth } from "@googleapis/drive"
import { get_auth } from "../auth/get_auth"
import "dotenv/config"

export async function create_club_folder(club: any) // letting auth be in this file itself, coz we don't want caller of this function to provide permission
{
    const fileMetadata = {
        name: club.clubId + "_" + club.clubName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.UTXENV_FOLDER_ID!] // ! implies that is it never undefined
    };

    // const drive = google.drive({ version: 'v3', auth });
    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        console.log('Club folder created Successfully - ' + club.clubName);
        return res.data.id;

    } catch (error) {
        console.error(error);
        console.log("Error creating club" + club.clubName);
    }
}