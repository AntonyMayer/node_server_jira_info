export default function (data) {
    try {
        let dataParsed = JSON.parse(data);
        console.log(dataParsed);
    } catch (e) { 
        console.log(data); 
    }
}