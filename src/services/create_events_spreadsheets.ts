import { drive, auth } from "@googleapis/drive";
import { get_auth } from "../auth/get_auth";
import { append_rows_to_spreadsheet } from "./append_rows_to_spreadsheet";
import { add_read_permission_to_coordinators } from "../helpers/add_read_permission_to_coordinators";
import "dotenv/config"

export async function create_event_spreadsheet(event: any, folderId: string | undefined)
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
        const promise2 = append_rows_to_spreadsheet([["heading1", "heading2"]], res.data.id ?? "");
        await Promise.all([promise1, promise2]);

        console.log("Created spreadsheet for event", event.eventId, event.eventName);
        return res.data.id;

    } catch (error) {
        console.error(error);
        console.log("Error creating event spreadsheet " + event.eventName);
    }
}

export async function create_events_spreadsheets(events: any[], folderId: string | undefined)
{
    var promises = [];
    for(let event of events) {
        let promise = create_event_spreadsheet(event, folderId);
        promises.push(promise);
    }

    const spreadsheetIds = await Promise.all(promises);
    return spreadsheetIds;
}


async function testing()
{
    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    var coordinator1 = {
        name: "preethi",
        email: "preethiv.is19@bmsce.ac.in"
    };
    var coordinator2 = {
        name: "deven",
        email: "devenparamaj.is19@bmsce.ac.in"
    }
    var coordinator3 = {
        name: "rahul",
        email: "rahulnayak.ec19@bmsce.ac.in"
    }
    var coordinator4 = {
        name: "navaneeth",
        email: "navaneeths.is19@bmsce.ac.in"
    }

    // await add_read_permission_to_coordinators(gdrive, "1O7hUqBjR_DCeuvtbmnrUAdhHH_P1Nk8nYgVAM5tD1n8", [coordinator1, coordinator2]);
    var events = [
        {
            eventId: "15",
            eventName: "one",
            coordinators: [coordinator1, coordinator2, coordinator3, coordinator4]
        },
        {
            eventId: "25",
            eventName: "two",
            coordinators: [coordinator1, coordinator2, coordinator3, coordinator4]
        },
        {
            eventId: "35",
            eventName: "three",
            coordinators: [coordinator1, coordinator2, coordinator3, coordinator4]
        },
        {
            eventId: "45",
            eventName: "four",
            coordinators: [coordinator1, coordinator2, coordinator3, coordinator4]
        }
    ];

    var ids = await create_events_spreadsheets(events, process.env.UTXENV_FOLDER_ID);
    console.log(ids);
}

// testing();