import { script, auth } from "@googleapis/script"
import { get_auth } from "../auth/get_auth";

async function callAppsScript() { 
    const scriptId = 'AKfycbzfAfOzTkMkfkQ1bxwfQOUQdgEzLq-MC4kTkQJVhxciSJXBH0O1m-Q5QmZDxhMQaGzi';
    // const script = google.script('v1');
    const gauth = await get_auth(auth, ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/script.external_request", "https://www.googleapis.com/auth/spreadsheets"]);
    const gscript = script('v1');
  
    // try {

        // const resp = await 
        gscript.scripts.run({
            auth: gauth,
            requestBody: {
              function: 'addImportrangePermission',
              parameters: ["15xW2bPVfwMrA3XKtDdoiWz3aDbK-Ppqq_u2fKe9BYD4", "1cd_YYyuLiqRk74Wc8r3eR-aTwQEYi_AWxMGQZIprw00"] // TODO: ADD ssid and donorId
            },
            scriptId: scriptId,
        }, function(err: any, resp: any) {
            if (err) {
              // The API encountered a problem before the script started executing.
              console.log('The API returned an error: ' + err);
              return;
            }
            if (resp.error) {
              // The API executed, but the script returned an error.
        
              // Extract the first (and only) set of error details. The values of this
              // object are the script's 'errorMessage' and 'errorType', and an array
              // of stack trace elements.
              const error = resp.error.details[0];
              console.log('Script error message: ' + error.errorMessage);
              console.log('Script error stacktrace:');
        
              if (error.scriptStackTraceElements) {
                // There may not be a stacktrace if the script didn't start executing.
                for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
                  const trace = error.scriptStackTraceElements[i];
                  console.log('\t%s: %s', trace.function, trace.lineNumber);
                }
              }
            } else {
              // The structure of the result will depend upon what the Apps Script
              // function returns. Here, the function returns an Apps Script Object
              // with String keys and values, and so the result is treated as a
              // Node.js object (folderSet).
              const folderSet = resp.response.result;
              if (Object.keys(folderSet).length == 0) {
                console.log('No folders returned!');
              } else {
                console.log('Folders under your root folder:');
                Object.keys(folderSet).forEach(function(id) {
                  console.log('\t%s (%s)', folderSet[id], id);
                });
              }
            }
          });

        // console.log(resp);

        // if (resp.error) {
        //     // The API executed, but the script returned an error.
      
        //     // Extract the first (and only) set of error details. The values of this
        //     // object are the script's 'errorMessage' and 'errorType', and an array
        //     // of stack trace elements.
        //     const error = resp.error.details[0];
        //     console.log('Script error message: ' + error.errorMessage);
        //     console.log('Script error stacktrace:');
      
        //     if (error.scriptStackTraceElements) {
        //         // There may not be a stacktrace if the script didn't start executing.
        //         for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
        //             const trace = error.scriptStackTraceElements[i];
        //             console.log('\t%s: %s', trace.function, trace.lineNumber);
        //         }
        //     }
        // } else {
        //     // The structure of the result will depend upon what the Apps Script
        //     // function returns. Here, the function returns an Apps Script Object
        //     // with String keys and values, and so the result is treated as a
        //     // Node.js object (folderSet).
        //     const folderSet = resp.response.result;
        //     if (Object.keys(folderSet).length == 0) {
        //         console.log('No folders returned!');
        //     } else {
        //         console.log('Folders under your root folder:');
        //         Object.keys(folderSet).forEach(function(id) {
        //             console.log('\t%s (%s)', folderSet[id], id);
        //         });
        //     }
        // }

    // } catch(err) {
    //     console.log('The API returned an error: ' + err);
    // }
    
}

callAppsScript();

