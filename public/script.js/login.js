const login = async (event) =>{
    event.preventDefault();

    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassowrd').value.trim();
    //console.log(userName+ " "+ password);
    //console.log(JSON.stringify({ userName, password }));    

    if(email && password) {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(res.ok) {
            document.location.replace('/dashboard');
        }else{
            alert(res.statusText);
        }
    }

};


document.querySelector('.login').addEventListener('submit', login);