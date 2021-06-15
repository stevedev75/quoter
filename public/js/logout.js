async function logout() {
    const res = await fetch('/api/users/logout', {
        method: "POST",
        header: {'Content-type': 'application/json'},
    });

    if(res.ok) {
        document.location.replace('/login');
    } else {
        alert(res.statusText);
    }
}

document.getElementById('logout-btn').addEventListener('click', logout);