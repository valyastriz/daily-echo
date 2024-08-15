document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded and ready");

    const loginForm = document.querySelector('#login-form');

    if (loginForm) { // checking if login-form exists
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const name = document.querySelector('#name').value.trim();
            const password = document.querySelector('#password').value.trim();
    
            if (name && password) {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ name, password }),
                    headers: { 'Content-Type': 'application/json'}
                });
    
                if (response.ok) {
                    document.location.replace('/'); //redirects to home page
                } else {
                    alert('Failed to log in.');
                }
            }
        });
    }
});