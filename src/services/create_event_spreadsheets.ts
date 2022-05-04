import { get_auth } from "../auth/get_auth";
import { add_read_permission_to_coordinators } from "../helpers/add_read_permission_to_coordinators";
import { append_rows_to_spreadsheet } from "../helpers/append_rows_to_spreadsheet";
import fetch from 'node-fetch';

export async function create_event_spreadsheet(auth: any, drive: any, sheets: any, event: any, folderId: string | undefined)
{
    if(folderId == undefined) {
        throw new Error("Folder Issue");
    }

    const fileMetadata = {
        name: event.eventId + "_" + event.eventName,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: [folderId]
    };

    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    try {

        const res = await gdrive.files.create({
            requestBody: fileMetadata,
            fields: "id"
        });

        const promise1 = add_read_permission_to_coordinators(gdrive, res.data.id, event.coordinators); // putting drive like this so that other func shouldn't be called outside this module
        
        const column_labels = ["Name", "Email", "Usn", "Phone", "Taxn Id"];
        
        const ssid = process.env.MAIN_ALL_EVENTS_SSID;
        const formula = `=filter(IMPORTRANGE("${ssid}", "Sheet1!B:F"), INDEX(IMPORTRANGE("${ssid}", "Sheet1!A:A"), 0, 1)="${event.eventId}")`;
        
        const rows = [column_labels, [formula]];
        const promise2 = append_rows_to_spreadsheet(auth, sheets, rows, res.data.id);

        const promise3 = fetch(`https://script.google.com/macros/s/${process.env.APP_SCRIPT_WEB_APP_ID}/exec?ssId=${res.data.id}&donorId=${process.env.MAIN_ALL_EVENTS_SSID}`);

        await Promise.all([promise1, promise2, promise3]);

        console.log("Created spreadsheet for event", event.eventId, event.eventName);
        return res.data.id;

    } catch (error) {
        console.error(error);
        console.log("Error creating event spreadsheet " + event.eventName);
        throw error;
    }
}

export async function create_event_spreadsheets(auth: any, drive: any, sheets: any, events: any[], folderId: string | undefined)
{
    var promises = [];
    for(let event of events) {
        let promise = create_event_spreadsheet(auth, drive, sheets, event, folderId);
        promises.push(promise);
    }

    const spreadsheetIds = await Promise.all(promises);
    return spreadsheetIds;
}