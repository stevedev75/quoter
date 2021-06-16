async function editPost(event) {
    event.preventDefault();

    const id = parseInt(document.querySelector('.edit-post').getAttribute('data-id'));
    const content = document.querySelector('#post-content').value.trim();    

    if(content && id){
        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: {'Content-type': 'application/json'},
        });

        if (res.ok) {
            document.location.replace('/homepage');
        }
        else {
            alert('Cannot update Quote');
        }

    }else {
        alert('Quote can not be empty');
    }
}

async function deletePost() {

    const id = document.querySelector('#btndelete').getAttribute('data-id');

    if (id) {
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if(res.ok) {
            document.location.replace('/homepage');
        }else {
            alert(`unable to delete post ${id}`);
        }
    }

}


document.querySelector('.edit-post').addEventListener('submit', editPost);
document.querySelector("#btndelete").addEventListener('click', deletePost);