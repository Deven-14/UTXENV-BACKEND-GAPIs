import { create_event_spreadsheet } from "./create_events_spreadsheets"
import 'dotenv/config'

export async function create_main_spreadsheet(coordinators: any[])
{
    const event = {
        eventId: "MAIN",
        eventName: "ALL EVENTS",
        coordinators: coordinators
    }

    const spreadsheetId = await create_event_spreadsheet(event, process.env.UTXENV_FOLDER_ID); // TODO: CHANGE TO process.env.UTXENVFOLDERID
    return spreadsheetId;
}