document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    console.log(username)
    fetch('http://localhost:3000/auth/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: username, password: password})
    })
    .then(response => response.json())
    .then(data =>{
        if(data.access_token){
            alert('Zalogowano');
        } else{
            alert(data.message ||'Błąd logowania');
        }
    })
    .catch(err =>{
        console.error("Error: ", err);
    })
})