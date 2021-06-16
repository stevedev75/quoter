async function editPost (event){
    event.preventDefault();

    const content = document.getElementById('edit-content').value.trim();

    if (content) {
        const res = await fetch('/api/posts', {
            method: 'PUT',
            body: JSON.stringify({content}),
            headers: {'content-type' : 'application/json'},
        });
        
        if(res.ok) {
            document.location.replace('/homepage');
        } else {
            alert('cannot create Quote');
        }

    } else {
        alert ('Quote cannot be empty');
    }

}

document.getElementById('edit-post').addEventListener('submit', createNewPost);