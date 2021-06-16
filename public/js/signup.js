async function signup (event) {
    event.preventDefault();

    const userName = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();


    if(userName && email && password) {
        const res = await fetch('api/users/', {
            method: "POST",
            body: JSON.stringify( {userName, email, password}),
            headers:{ 'content-Type' : 'application/json'},
        });

        if(res.ok) {
            document.location.replace('/homepage');
        }else{
            alert(res.statusText);
        }
    }
}

document.getElementById('signupform').addEventListener('submit', signup);