import { append_rows_to_spreadsheet } from "../helpers/append_rows_to_spreadsheet";

export async function append_regitration(auth: any, sheets: any, registration: any)
{
    var rows = [];
    rows.push([registration.eventId, registration.name, registration.email, registration.usn, registration.phone, registration.taxnId]);
    try {
        await append_rows_to_spreadsheet(auth, sheets, rows, process.env.MAIN_ALL_EVENTS_SSID);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export async function append_regitrations(auth: any, sheets: any, registrations: any[])
{
    var rows = [];
    for(let registration of registrations) {
        rows.push([registration.eventId, registration.name, registration.email, registration.usn, registration.phone, registration.taxnId]);
    }
    try {
        await append_rows_to_spreadsheet(auth, sheets, rows, process.env.MAIN_ALL_EVENTS_SSID);
    } catch(error) {
        console.log(error);
        throw error;
    }
}