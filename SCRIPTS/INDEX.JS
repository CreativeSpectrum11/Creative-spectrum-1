document.addEventListener('DOMContentLoaded', (event) => {
    const humburgar = document.getElementById('btn');
    const nav = document.getElementById('nav');

    humburgar.addEventListener('click', () => {
        nav.classList.toggle('active');
        humburgar.classList.toggle('act');
    });

    loadComments();

    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get the input values
        const name = document.getElementById('commentName').value;
        const text = document.getElementById('commentText').value;
        const timestamp = new Date().toLocaleString();

        // Create a new comment object
        const comment = {
            id: Date.now(),
            name: name,
            text: text,
            timestamp: timestamp
        };

        // Save the comment to local storage
        saveComment(comment);

        // Add the new comment to the comments list
        addCommentToList(comment);

        // Clear the form
        document.getElementById('commentForm').reset();
    });

    function saveComment(comment) {
        const comments = getCommentsFromLocalStorage();
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function getCommentsFromLocalStorage() {
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : [];
    }

    function loadComments() {
        const comments = getCommentsFromLocalStorage();
        comments.forEach(comment => {
            addCommentToList(comment);
        });
    }

    function addCommentToList(comment) {
        const commentsList = document.getElementById('commentsList');
        const newComment = document.createElement('li');
        newComment.classList.add('comment-item');
        newComment.setAttribute('data-id', comment.id);
        newComment.innerHTML = `
            <div class="comment-avatar">
                <img src="https://via.placeholder.com/50" alt="Avatar">
            </div>
            <div class="comment-content">
                <h3>${comment.name}</h3>
                <p>${comment.text}</p>
                <div class="comment-timestamp">${comment.timestamp}</div>
            </div>
            <button class="delete-button" onclick="deleteComment(${comment.id})">Delete</button>
        `;
        commentsList.appendChild(newComment);
    }

    window.deleteComment = function(id) {
        let comments = getCommentsFromLocalStorage();
        comments = comments.filter(comment => comment.id !== id);
        localStorage.setItem('comments', JSON.stringify(comments));

        // Remove comment from DOM
        const commentItem = document.querySelector(`.comment-item[data-id="${id}"]`);
        if (commentItem) {
            commentItem.remove();
        }
    }

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        if (name === '' || email === '' || message === '') {
            alert('All fields marked with * are required!');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address!');
            return;
        }
        
        // Handle form submission, such as sending the data to a server
        alert('Thank you for your message!');
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});


const formBtn = document.querySelectorAll('button');
const formInput = document.querySelectorAll('input').value;

formBtn.addEventListener('click', ()=>{
    formInput = '';
})
