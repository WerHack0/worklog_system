const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');
const token = localStorage.getItem('token');
if (!token) {
  alert("Nie jesteś zalogowany!");
  window.location.href = "index.html"; 
} else {
  fetch(`http://localhost:3000/auth/user`, {
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
    console.log('Treść odpowiedzi:', text); // Zaloguj tekst odpowiedzi
    return JSON.parse(text); // Przetwórz tekst odpowiedzi jako JSON
  })
  .then(data => {
    document.getElementById('welcom_mess').innerText = `Zalogowano jako ${data.name} ${data.surname}`;
  })
  .catch(error => {
    console.error("Błąd podczas pobierania danych użytkownika: ", error);
  });
}
