// import { Auth } from 'googleapis';
// const { google } = require("googleapis");
// require('dotenv').config();
// import { auth } from "@googleapis/drive"
// import 'dotenv/config'

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/script.external_request'];

export async function get_auth(auth: any, scopes: string[]) 
{
    // service account key file from Google Cloud console.
    // const KEYFILEPATH = '../auth/service_account_credentials.json';
    const KEYFILEPATH = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
    // const KEYFILEPATH = '../../config/service_account_credentials.json';

    const gAuth = await new auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: scopes
    });

    return gAuth;
}

// export default auth;
// module.exports = auth;