const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
"Lipiec", "Sierpień", "Wrzesieni", "Październik", "Listopad", "Grudzień"];

function getStatus(seend, check){
    if (!seend && !check) return "W toku";
    if (seend && !check) return "Wysłano";
    if (seend && check) return "Zaakceptowano";
    if (!seend && check) return "Odrzucono";
}

function displayLogs(logs){
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    const groupedLogs = logs.reduce((acc, log) => {
        if (!acc[log.month]) {
            acc[log.month] = [];
        }
        acc[log.month].push(log);
        return acc;
    }, {});

    Object.keys(groupedLogs).forEach(monthIndex => {
        const logGroup = groupedLogs[monthIndex];
        let status = "W toku"; // Default status

        if (logGroup.some(log => log.seend && log.check)) {
            status = "Zaakceptowano";
        } else if (logGroup.some(log => !log.seend && log.check)) {
            status = "Odrzucono";
        } else if (logGroup.some(log => log.seend && !log.check)) {
            status = "Wysłano";
        }

        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        const statusCell = document.createElement('td');

        monthCell.textContent = months[monthIndex - 1];
        statusCell.textContent = status;

        row.appendChild(monthCell);
        row.appendChild(statusCell);
        tableBody.appendChild(row);
    });
}
function loadLogs() {
    const userId = localStorage.getItem('user_id');
    fetch(`http://localhost:3000/logsStatus?userId=${userId}`)
        .then(response => response.json())
        .then(logs => {
            displayLogs(logs);
        })
        .catch(error => {
            console.error("Błąd :", error);
        });
}

window.onload = loadLogs;