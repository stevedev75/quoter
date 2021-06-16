
async function likeQuote (event) {
    event.preventDefault();

    const post_id = parseInt(event.target.getAttribute('data-id'));
    console.log(post_id);
    
    if(post_id){
        const res = await fetch('/api/likes/', {
            method: 'POST',
            body: JSON.stringify({post_id}),
            headers: {'Content-type': 'application/json'},
        });

        if (res.ok) {
            document.location.replace('/all');
        }
    }
}

async function unlikeQuote (event) {
    event.preventDefault();

    const post_id = parseInt(event.target.getAttribute('data-id'));
    console.log(post_id);
    
    if(post_id){
        const res = await fetch(`/api/likes/${post_id}`, {
            method: 'DELETE',
        });

        if(res.ok) {
            document.location.replace('/all');
        }else{
            alert('failed to unlike');
        }
    }
}



document.querySelectorAll('.like-btn').forEach((btn) => { btn.addEventListener('click', likeQuote)});

document.querySelectorAll('.unlike-btn').forEach((btn)=> { btn.addEventListener('click', unlikeQuote)});