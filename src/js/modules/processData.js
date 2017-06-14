export default function(jira, data) {
    
    //check if data contains message
    if (data.message) {
        console.log(data.message);
        return;
    }

    //update jira.data object
    for (let item in data) {
        jira.data[item] = data[item];
    }
    console.log(new Date());
    console.log(jira.data);
}