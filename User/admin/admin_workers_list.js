// Odświeżanie listy pracowników 
function refreshWorkersList(){
fetch('http://localhost:3000/list')
      .then(response => response.json())
      .then(data => {
        const workersList = document.getElementById('workers-list');
        data.forEach(worker => {
          const row = `<tr>
            <td>${worker.name}</td>
            <td>${worker.surname}</td>
            <td>${worker.job_position}</td>
            <td>
            <button class="btn btn-info" onclick="showEditModal('${worker.ID}')">Edytuj Pracownika</button>
              <button class="btn btn-secondary">Zobacz Logi</button>
              <button class="btn btn-danger">Dezaktywuj Konto</button>
            </td>
          </tr>`;
          workersList.innerHTML += row;
        });
      });
    }
    fetch('http://localhost:3000/list')
      .then(response => response.json())
      .then(data => {
        const workersList = document.getElementById('workers-list');
        data.forEach(worker => {
          const row = `<tr>
            <td>${worker.name}</td>
            <td>${worker.surname}</td>
            <td>${worker.job_position}</td>
            <td>
            <button class="btn btn-info" onclick="showEditModal('${worker.ID}')">Edytuj Pracownika</button>
              <button class="btn btn-secondary">Zobacz Logi</button>
              <button class="btn btn-danger">Dezaktywuj Konto</button>
            </td>
          </tr>`;
          workersList.innerHTML += row;
        });
      });
    //refreshWorkersList();
    const modal = document.getElementById('addWorkerModal');
    const closeModalButtons = modal.querySelectorAll('[data-dismiss="modal"]');
    const showModalButton = document.getElementById('add-worker');
    const editModal = document.getElementById('editWorkerModal');
    const closeEditModalButtons = editModal.querySelectorAll('[data-dismiss="modal"]');

    showModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
        modal.classList.add('show');
    });


    closeEditModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            editModal.style.display = 'none';
            editModal.classList.remove('show');
        });
    });

window.addEventListener('click', (event) => {
    if (event.target === editModal) {
        editModal.style.display = 'none';
        editModal.classList.remove('show');
    }
});
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
});
const form = document.getElementById('add-worker-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const formData = {
      name: form.querySelector('#name').value,
      surname: form.querySelector('#surname').value,
      job_position: form.querySelector('#job_position').value,
      email: form.querySelector('#email').value,
      password: form.querySelector('#password').value
    };
  
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Użytkownik dodany pomyślnie!');
        refreshWorkersList(); 
      } else {
        alert('Wystąpił błąd podczas dodawania użytkownika.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas dodawania użytkownika.');
    });
  });

  function showEditModal(workerId) {

    fetch(`http://localhost:3000/user/${workerId}`)
    .then(response => response.json())
    .then(worker => {
        console.log(worker)
        const modal = document.getElementById('editWorkerModal');
        modal.querySelector('#name').value = worker.userInfo.name;
        modal.querySelector('#surname').value = worker.userInfo.surname;
        modal.querySelector('#job_position').value = worker.userInfo.job_position;
        modal.querySelector('#email').value = worker.email;
        modal.querySelector('#password').value = '';
        console.log(modal);
        modal.style.display = 'block';
        modal.classList.add('show');
    });
}

function updateWorker(id) {
    const formData = {
      username: document.querySelector('#editWorkerModal #name').value,
      surname: document.querySelector('#editWorkerModal #surname').value,
      job_position: document.querySelector('#editWorkerModal #job_position').value,
      email: document.querySelector('#editWorkerModal #email').value,
      password: document.querySelector('#editWorkerModal #password').value
    };

    fetch(`http://localhost:3000/user/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Użytkownik zaktualizowany pomyślnie!');
        //refreshWorkersList();
      } else {
        alert('Wystąpił błąd podczas aktualizacji użytkownika.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas aktualizacji użytkownika.');
    });
}
