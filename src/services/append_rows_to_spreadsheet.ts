// import { google } from "googleapis";
import { sheets, auth } from "@googleapis/sheets";
import { get_auth } from "../auth/get_auth";

export async function append_rows_to_spreadsheet(rows: string[][], spreadsheetId: string | undefined)
{
    if(spreadsheetId == undefined) {
        throw new Error("Spreadsheet Error");
    }

    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/spreadsheets"]);
    const gsheets = sheets('v4');

    const range = "Sheet1!A:C"
    const resource = {
        range: range,
        majorDimension: "ROWS",
        values: rows
    }

    const request = {
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: resource,
        auth: gauth,
    };
    
    try {
        const response = await gsheets.spreadsheets.values.append(request);
        console.log("Data added successfully to " + spreadsheetId);
    } catch (err) {
        console.error(err);
    }

    return "Success"
}