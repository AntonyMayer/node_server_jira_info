export default function(obj, data) {
    // obj.dataplate = [{
    //     assignees: [
    //         null
    //     ],
    //     blocked: 0,
    //     closed: 0,
    //     devComplete: 0,
    //     devTest: 0,
    //     inProgress: 0,
    //     name: null,
    //     opened: 0,
    //     project: null,
    //     readyForTest: 0,
    //     tridion: 0,
    // }];

    console.log(data);
    
    //check if data is an array
    if (!Array.isArray(data)) {
        console.log(data.message || data);
        return;
    }

    for (let item of data) {
        console.log(item);
        obj.data[item.project] = item;
    }

    console.log(obj);
}