async function createNewPost (event){
    event.preventDefault();

    const content = document.getElementById('post-content').nodeValue.trim();

    if (content) {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {'content-type' : 'application/json'},
        });

        console.log(res);

        if(res.ok) {
            document.location.replace('/homepage');
        } else {
            alert('cannot create post');
        }

    } else {
        alert ('please enter title');
    }

}

document.getElementById('new-post').addEventListener('submit', createNewPost);