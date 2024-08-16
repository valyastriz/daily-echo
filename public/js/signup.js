document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded and ready");

    document.querySelector('#signup-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        const confirmPassword = document.querySelector('#confirm_password').value.trim();

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        if (name && email && password) {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json'}
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to sign up.');
            }
        }
    });
});

