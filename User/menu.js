const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');
const token = localStorage.getItem('token');
console.log(`Bearer ${localStorage.getItem('token')}`);
if (!token) {
  alert("Nie jesteś zalogowany!");
  window.location.href = "index.html"; 
} else {
  fetch(`http://localhost:3000/user_info`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response => {
    if (!response.ok) {
      return response.text().then(text => Promise.reject(text));
    }
    return response.text();
  })
  .then(text => {
    console.log('Treść odpowiedzi:', text);
    return JSON.parse(text); 
  })
  .then(data => {
    document.getElementById('welcom_mess').innerText = `Zalogowano jako ${data.name} ${data.surname} ${data.job_position}`;
    console.log(data.user_ID)
    
    const tileContainer = document.getElementById('tileContainer');
    let tilesHtml = ''
    if(data.job_position === "admin"){
      //menu admin panel
      tilesHtml = `
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
              <a href="admin/admin_workers_list.html">
                <h5 class="card-title">Pracownicy</h5>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
              <a href="admin/admin_new_log.html">
                <h5 class="card-title">Logi</h5>
                </a>
              </div>
            </div>
          </div>
        </div>`;
    }
    else{
      localStorage.setItem('user_id', data.user_ID)
      //menu user
      tilesHtml = `
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
              <a href="user/user_new_log.html">
                <h5 class="card-title">Nowy log</h5>
                  </a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
              <a href="user/user_log.html">
                <h5 class="card-title">Status logów</h5>
                  </a>
              </div>
            </div>
          </div>
        </div>`
    }
    tileContainer.innerHTML = tilesHtml;
  })
  .catch(error => {
    console.error("Błąd podczas pobierania danych użytkownika: " + error);
  });
}
