document.addEventListener('DOMContentLoaded', () => {
    const logoutForm = document.querySelector('#logout-btn');

    if (logoutForm) {
        logoutForm.addEventListener('click', async (event) => {
            event.preventDefault();

            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to log out.');
            }
        });
    }
});
