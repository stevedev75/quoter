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

async function createNewPost (event){
    event.preventDefault();

    const content = document.getElementById('post-content').value.trim();
    console.log(content);

    if (content) {
        const res = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {'content-type' : 'application/json'},
        });

        console.log(res);

        if(res.ok) {
            document.location.replace('/home');
        } else {
            alert('cannot create post');
        }

    } else {
        alert ('please enter content');
    }

}


async function unlikeQuote (event) {

}

document.getElementById('new-post').addEventListener('submit', createNewPost);

document.getElementById('logout-link').addEventListener('click', logout);


