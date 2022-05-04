import { drive, auth } from "@googleapis/drive"
import { get_auth } from "../auth/get_auth";
import fs from "fs";

async function get_image_ids_from_folder(gdrive: any, folder_id: string | undefined)
{
    if(folder_id == undefined) {
        throw new Error("Folder Id Undefined");
    }

    var pageToken: any = null;
    
    var folder_ids: string[] = [];
    var image_files: any[] = [];

    // Using the NPM module 'async'
    do {

        try {

            const res = await gdrive.files.list({
                q: `(mimeType contains 'image/' or mimeType = 'application/vnd.google-apps.folder') and '${folder_id}' in parents`,
                fields: 'nextPageToken, files(id, name, mimeType)',
                spaces: 'drive',
                pageSize: 1000,
                pageToken: pageToken
            });
            
            if (res.data.files != undefined) {
                res.data.files.forEach(function (file: any) {
                    // console.log('Found file: ', file.name, file.id);
                    if(file.mimeType == "application/vnd.google-apps.folder"){
                        folder_ids.push(file.id);
                    } else {
                        image_files.push(file);
                    }
                });
            }

            pageToken = res.data.nextPageToken;

        } catch(err: any) {
            console.error(err);
            throw err;
        }

    }while(!!pageToken);
    
    return {folder_ids, image_files};
}

async function get_all_image_files(gdrive: any, main_folder_id: string)
{
    var queue_folder_ids: string[] = [main_folder_id];
    var image_files: any[] = [];

    do{
        const res = await get_image_ids_from_folder(gdrive, queue_folder_ids.shift());
        image_files.push(...res.image_files);
        queue_folder_ids.push(...res.folder_ids);
    }while(queue_folder_ids.length > 0);
    
    return image_files;
}

async function downlaod_image_file(gdrive: any, image_file: any, destination_folder_path: string)
{
    var dest = fs.createWriteStream(`${destination_folder_path}/${Date.now()}-${image_file.name}`);
    const res = await gdrive.files.get({
        fileId: image_file.id,
        alt: 'media'
    }, {responseType: 'stream'});

    res.data.on('end', function () {
        console.log('Done');
    }).on('error', function (err: any) {
        console.log('Error during download', err);
        throw err;
    }).pipe(dest);
}

async function download_all_image_files(gdrive: any, image_files: any[], destination_folder_path: string)
{
    for(let image_file of image_files) {
        await downlaod_image_file(gdrive, image_file, destination_folder_path);
    }
}

async function download_images(drive_folder_id: string, destination_folder_path: string)
{
    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive"]);
    const gdrive = drive({version: 'v3', auth: gauth});

    const image_files = await get_all_image_files(gdrive, drive_folder_id);
    console.log(image_files);
    await download_all_image_files(gdrive, image_files, destination_folder_path);
    // if downloading or using somewhere, after use, delete the file using fs.unlink
}

download_images("1zCHX5ohvbJBbo2PbvNhavsdjAl9Q7ykG", "E:/Projects/College Projects/UTXENV-backend-gAPIs/tmp");