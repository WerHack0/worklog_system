const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesieni", "Październik", "Listopad", "Grudzień"
  ];
  function loadNewLogs() {
    fetch('http://localhost:3000/admin/newLogs')
    .then(response => response.json())
    .then(logs => {
        const groupedLogs = groupLogsByMonthAndUser(logs);
        displayGroupedLogs(groupedLogs);
    });
}

function viewLogDetails(userId, month) {
    fetch(`http://localhost:3000/tasks?userId=${userId}&month=${month}`)
    .then(response => response.json())
    .then(tasks => {

        const detailTableBody = document.querySelector('#logDetail table tbody');
        detailTableBody.innerHTML = '';

        tasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.day}</td>
                <td>${task.work_hours}</td>
                <td>${task.task}</td>
            `;
            detailTableBody.appendChild(row);
        });

        document.getElementById('logDetail').style.display = 'block';
    });
}
function displayGroupedLogs(groupedLogs) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    groupedLogs.forEach(entry => {
        const allLogIds = entry.logIds.join(',');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.user_id}</td>
            <td>${months[entry.month - 1]}</td>
            <td><button class="btn btn-info" onclick="viewLogDetails(${entry.user_id}, ${entry.month})">Podgląd</button></td>
            <td>
                <button class="btn btn-info" onclick="approveLog('${allLogIds}')">Zatwierdź</button>
                <button class="btn btn-danger" onclick="rejectLog('${allLogIds}')">Odrzuć</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function groupLogsByMonthAndUser(logs) {
    const grouped = {};

    logs.forEach(log => {
        const key = `${log.user_id}-${log.month}`;
        if (!grouped[key]) {
            grouped[key] = {
                logIds: [],
                user_id: log.user_id,
                first_name: log.first_name,
                last_name: log.last_name,
                month: log.month,
                logs: []
            };
        }
        grouped[key].logIds.push(log.id);
        grouped[key].logs.push(log);
    });

    return Object.values(grouped);
}

function approveLog(logIdsString) {
    const logIds = logIdsString.split(',').map(id => parseInt(id));
    fetch(`http://localhost:3000/admin/approveLogs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ logIds })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadNewLogs();
        } else {
            alert("Błąd podczas zatwierdzania logów.");
        }
    });
}

function rejectLog(logIdsString) {
    const logIds = logIdsString.split(',').map(id => parseInt(id)); 
    fetch(`http://localhost:3000/admin/rejectLogs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ logIds })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadNewLogs();
        } else {
            alert("Błąd podczas odrzucania logów.");
        }
    });
}

window.onload = loadNewLogs;
