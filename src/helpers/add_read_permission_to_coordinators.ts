async function add_read_permission_to_coordinator(drive: any, fileId: string, coordinator: any)
{
    var permission = {
        type: 'user',
        role: 'reader',
        emailAddress: coordinator.email
    }

    try {
        await drive.permissions.create({
            resource: permission,
            fileId: fileId,
            fields: 'id',
        });
    } catch(error) {
        console.log(error);
        console.log("Error adding permission to coordinator " + coordinator.name);
    }
    
    return "Read Permission given to " + coordinator.name;
}

export async function add_read_permission_to_coordinators(drive: any, fileId: string | null | undefined, coordinators: any[])
{
    if(fileId == undefined || fileId == null) {
        throw new Error("FILE doesn't exist to add read permission");
    }

    var promises = [];
    for(let coordinator of coordinators){
        let promise = add_read_permission_to_coordinator(drive, fileId, coordinator);
        promises.push(promise);
    }

    await Promise.all(promises);

    return "Read Permission added to all Coordinators"
}