const monthSelect = document.getElementById('monthSelect');
const tableBody = document.querySelector('table tbody');
const submitAllButton = document.getElementById('submitAll');

const addRowButton = document.getElementById('addRowButton');
const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesieni", "Październik", "Listopad", "Grudzień"
  ];
  
  function populateMonths() {
    const currentMonth = new Date().getMonth();
  
    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index + 1;  // Store the month number as the value (1-based)
      option.textContent = month;
  
      if (index === currentMonth) {
        option.selected = true;
      }
  
      monthSelect.appendChild(option);
    });
  }
  
  populateMonths();
  
function createNewRow() {
    console.log("Add Row button clicked!");
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td><input type="number" class="form-control" min="1" max="31"></td>
    <td><input type="number" class="form-control" min="0"></td>
    <td><input type="text" class="form-control"></td>
    <td><button class="btn btn-success" onclick="saveRow(this)">Save</button></td>
  `;

  tableBody.appendChild(row);
}

addRowButton.addEventListener('click', createNewRow);


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

function saveRow(buttonElement) {
  const row = buttonElement.parentElement.parentElement;
  const day = row.children[0].textContent;
  const hours = row.children[1].textContent;
  const task = row.children[2].textContent;

  const log = {
    user_id: YOUR_USER_ID, 
    day: day,
    month: monthSelect.value,
    work_hours: hours,
    task: task
  };

  
  fetch('/log', {
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

submitAllButton.addEventListener('click', () => {
 
});