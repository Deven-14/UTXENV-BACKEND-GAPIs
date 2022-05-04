import "dotenv/config"
import { create_main_spreadsheet } from "./src/services/create_main_spreadsheet"
import { auth, drive } from "@googleapis/drive"
import { sheets } from "@googleapis/sheets"
import { create_club_folder } from "./src/services/create_club_folder";
import { create_event_spreadsheets } from "./src/services/create_event_spreadsheets";

async function execute_create_main_spreasheet_1() {

    var coordinators: any[] = []; // TODO: get coordinators from database, those who have access to registrations of all events
    await create_main_spreadsheet(auth, drive, sheets, coordinators);
    // TODO: after execution, copy the spreadsheet id and place it in the .env file
}

async function execute_create_club_folders_2() {
    var clubs: any[] = []; // TODO: get all the club data from the database
    for(let club of clubs) {
        const folderId = await create_club_folder(auth, drive, club);
        // TODO: put this folderId to this club and update it in database
    }
}

async function execute_create_event_spreadsheets_3() {

    var clubs: any[] = []; // TODO: get all the club data from the database
    for(let club of clubs) {
        const events: any[] = []; // TODO: query the events related to this club
        const spreadsheetIds = await create_event_spreadsheets(auth, drive, sheets, events, club.folderId);
        // TODO: put the spreadsheetIds to the corresponding events, ssId[0] = event[0],... , and update it in database
    }

}

async function main()
{
    // TODO: call the above functions here one by one
}

main();

// TODO:  1) DON'T PUT THE COLUMN LABELS,
//          2) TELL SRAVAN TO CHANGE THE WAY REGISTRATION IS SENT {} TO []
//          3) TELL SRAVAN TO WRITE CODE FOR DATABASE QUERIES
//          4) AFTER THIS CODE IS WRITTEN, FIRST SET UP THE GOOGLE apps script IN UTSAV mail account AND THEN ONLY RUN THE CODE