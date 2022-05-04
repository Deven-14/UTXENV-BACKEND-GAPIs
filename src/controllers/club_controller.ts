import { ClubCoordinator } from "../models/clubCoordinator/clubCoordinator"
import { ICoordinator } from "../models/types/coordinator"
import { create_club_folder } from "../services/create_club_folder";
import { auth, drive } from "@googleapis/drive"
import { sheets } from "@googleapis/sheets"
import { create_event_spreadsheet } from "../services/create_event_spreadsheets";
import { EventCoordinator } from "../models/eventCoordinator/eventCoordinator";
import { create_main_spreadsheet } from "../services/create_main_spreadsheet";
import { append_regitrations } from "../services/append_registrations";
import { Registration } from "../models/Registration/registration";

var coordinator1 : ICoordinator = {
    name: "preethi",
    email: "preethiv.is19@bmsce.ac.in",
    phone: "1234567890",
    image: "ab"
};
var coordinator2 = {
    name: "deven",
    email: "devenparamaj.is19@bmsce.ac.in",
    phone: "1234567890",
    image: "ab"
};
var coordinator3 = {
    name: "rahul",
    email: "rahulnayak.ec19@bmsce.ac.in",
    phone: "1234567890",
    image: "ab"
};
var coordinator4 = {
    name: "navaneeth",
    email: "navaneeths.is19@bmsce.ac.in",
    phone: "1234567890",
    image: "ab"
};
var coordinators = [coordinator1, coordinator2, coordinator3, coordinator4];

var club = new ClubCoordinator();
club.clubId = "Draw"
club.clubName = "drawing club"
club.description = "abc"
club.logo = "alkfdj"
club.sponserLink = "dalfj"
club.socials = ["a", "b"]
club.coordinators = coordinators;

var event = new EventCoordinator();
event.eventId = "ABC"
event.eventName = "abcdefgh"
event.description = "bababa"
event.club = "drawing club"
event.regFee = 500
event.lastRegDate = new Date();
event.participationNo = "abc"
event.posterLink = "abcd"
event.rules = ["abc"]
event.prize = [1] // TODO: FIX THIS
event.coordinators = coordinators;

var registration = new Registration();
registration.name = 'deven'
registration.eventId = "ABC"
registration.email = "devenparamaj.is19@bmsce.ac.in"
registration.usn = "1BM19IS048"
registration.phone = "1234567890"
registration.taxnId = "dkjfa0293u4"

var registrations = [registration];

export async function createClub(req: any, res: any)
{
    try {
        await create_club_folder(auth, drive, club);
        res.status(200).json({error: false});
    } catch(error) {
        res.status(404).json({error: true});
    }
}


export async function createEvent(req: any, res: any)
{
    try {
        await create_event_spreadsheet(auth, drive, sheets, event, "1JifQC4nUJmx78ZJFj7cS5x4Uu9Fat3iI");
        res.status(200).json({error: false});
    } catch(error) {
        res.status(404).json({error: true});
    }
}


export async function createMainSpreadsheet(req: any, res: any)
{
    try {
        
        await create_main_spreadsheet(auth, drive, sheets, coordinators);
        res.status(200).json({error: false});
    } catch(error) {
        res.status(404).json({error: true});
    }
}

// async function abc() {
    
// }

// async function def() {
//     for (let i = 0; i < 40; ++i) {
//         const delay = (ms: number) => new Promise(() => setTimeout(abc, ms))
//         await delay(1000);   
//     }
// }

export async function addRegistration(req: any, res: any)
{
    try {
        await append_regitrations(auth, sheets, registrations);
        res.status(200).json({error: false});
    } catch(error) {
        res.status(404).json({error: true});
    }
}