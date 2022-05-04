import { get_auth } from "../auth/get_auth"
import { add_read_permission_to_coordinators } from "../helpers/add_read_permission_to_coordinators";
import { IClubCoordinator } from "../models/clubCoordinator/clubCoordinator";

export async function create_club_folder(auth: any, drive: any, club: IClubCoordinator) // adding auth, drive, so that we don't import drive, auth everywhere, it takes a lot of time
{
    const fileMetadata = {
        name: club.clubId + "_" + club.clubName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.UTXENV_FOLDER_ID!] // ! implies that is it never undefined
    };

    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const res = await gdrive.files.create({
            auth: gauth,
            requestBody: fileMetadata,
            fields: "id"
        });
        await add_read_permission_to_coordinators(gdrive, res.data.id, club.coordinators);

        console.log('Club folder created Successfully - ' + club.clubName);
        return res.data.id;

    } catch (error) {
        console.error(error);
        console.log("Error creating club" + club.clubName);
        throw error;
    }
}