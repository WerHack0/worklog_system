const monthSelect = document.getElementById('monthSelect');
const tableBody = document.querySelector('table tbody');
const submitAllButton = document.getElementById('submitAll');
const addRowButton = document.getElementById('addRowButton');
const userId = localStorage.getItem('user_id');
const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesieni", "Październik", "Listopad", "Grudzień"
  ];
  function clearTable(){
    while(tableBody.firstChild){
      tableBody.removeChild(tableBody.firstChild);
    }
  }
  //sprawdzanie czy istnieje już jakiś task w danym dniu
  const monthStatusElement = document.getElementById('monthStatus');

  function setMonthStatus(logs) {
      if (logs.length === 0) {
          monthStatusElement.textContent = "Brak danych";
          return;
      }
  
      const logGroup = logs.reduce((acc, log) => {
          if (!acc[log.seend]) {
              acc[log.seend] = [];
          }
          acc[log.seend].push(log.check);
          return acc;
      }, {});
  
      if (logGroup.true && logGroup.true.includes(true)) {
          monthStatusElement.textContent = "Zaakceptowano";
      } else if (logGroup.false && logGroup.false.includes(true)) {
          monthStatusElement.textContent = "Odrzucono";
      } else if (logGroup.true) {
          monthStatusElement.textContent = "Wysłano";
      } else {
          monthStatusElement.textContent = "W toku";
      }
  }
  function populateMonths() {
    const currentMonth = new Date().getMonth();
  
    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index + 1;  
      option.textContent = month;
  
      if (index === currentMonth) {
        option.selected = true;
      }
      monthSelect.appendChild(option);
    });
  }
  
  populateMonths();
  function loadTask(){
    const month = monthSelect.value;
    fetch(`http://localhost:3000/tasks?userId=${userId}&month=${month}`)
    .then(response => response.json())
    .then(tasks =>{
      tasks.forEach(task =>{
        addLogRow(task.day, task.work_hours, task.task);
    
      });
      setMonthStatus(tasks);
    });
  }
  window.onload = loadTask;
  // tworzenie nowego wiersza tabeli
function createNewRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="number" class="form-control" min="1" max="31"></td>
    <td><input type="number" class="form-control" min="0" max="24"></td>
    <td><input type="text" class="form-control"></td>
    <td><button class="btn btn-success" onclick="saveRow(this)">Save</button></td>
  `;

  tableBody.appendChild(row);
}

addRowButton.addEventListener('click', createNewRow);

//tworzenie nowego zadania
function addLogRow(day, hours, task) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${day}</td>
    <td>${hours}</td>
    <td>${task}</td>
    <td><button class="btn btn-success" onclick="saveRow(this)">Save</button></td>
  `;

  tableBody.appendChild(row);
}
//zapisanie zadania 
function saveRow(buttonElement) {
  
  const row = buttonElement.parentElement.parentElement;
  const day = row.children[0].querySelector('input').value;
  const hours = row.children[1].querySelector('input').value;
  const task = row.children[2].querySelector('input').value;
  console.log(day, task)
  const log = {
    user_id: userId,
    day: parseInt(day),
    month: monthSelect.value,
    work_hours: hours,
    task: task
  };
  console.log(log)
  
  fetch('http://localhost:3000/createLog', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(log)
}).then(response => response.json())
.then(data => {
  console.log(data); 
});

}
//wysłanie do sprawdzenia
submitAllButton.addEventListener('click', () => {
  const month = monthSelect.value;
  fetch('http://localhost:3000/seedTask',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId, month})
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data);
  })
});

monthSelect.addEventListener('change', ()=>{
  clearTable();
  loadTask();
})