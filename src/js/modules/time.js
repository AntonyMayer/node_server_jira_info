export default function(jira = {}) {
    let container = document.getElementById(jira.widgets.time.container),
        header = document.createElement('h2'),
        time = new Date(),
        hours = time.getHours() > 12 ? (time.getHours() - 1) : time.getHours(),
        minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

    container.textContent = '';
    header.className = jira.widgets.time.class;
    header.textContent = `Last update ${hours} : ${minutes}`;
    container.appendChild(header);
}