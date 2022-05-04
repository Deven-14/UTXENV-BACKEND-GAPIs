import { get_auth } from "../auth/get_auth";
import { ICoordinator } from "../models/types/coordinator";
import { add_read_permission_to_coordinators } from "../helpers/add_read_permission_to_coordinators";
import { append_rows_to_spreadsheet } from "../helpers/append_rows_to_spreadsheet";

export async function create_main_spreadsheet(auth: any, drive: any, sheets: any, coordinators: ICoordinator[])
{
    const fileMetadata = {
        name: "MAIN" + "_" + "ALL EVENTS",
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: [process.env.UTXENV_FOLDER_ID]
    };

    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        const promise1 = add_read_permission_to_coordinators(gdrive, res.data.id, coordinators); // putting drive like this so that other func shouldn't be called outside this module
        const column_labels = ["Event Id", "Name", "Email", "Usn", "Phone", "Taxn Id"];
        const rows = [column_labels];
        const promise2 = append_rows_to_spreadsheet(auth, sheets, rows, res.data.id);
        await Promise.all([promise1, promise2]);

        console.log("Created MAIN spreadsheet for ALL Events");
        console.log("ADD THE console.loged SpreadsheetID", res.data.id, "TO .env FILE WITH NAME 'MAIN_ALL_EVENTS_SSID'")

        return res.data.id;

    } catch (error) {
        console.error(error);
        console.log("Error creating MAIN spreadsheet for ALL Events");
        throw error;
    }
}