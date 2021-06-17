async function createNewPost (event){
    event.preventDefault();

    const content = document.getElementById('post-content').value.trim();
    console.log(content);

    if (content) {
        const res = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {'Content-type' : 'application/json'},
        });

        console.log(res);

        if(res.ok) {
            document.location.replace('/homepage');
        } else {
            alert('cannot create post');
        }

    } else {
        alert ('please enter content');
    }

}

document.getElementById('new-post').addEventListener('submit', createNewPost);