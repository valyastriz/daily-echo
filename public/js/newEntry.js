document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#new-entry-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const mood = document.querySelector('mood').value.trim();
        const content = document.querySelector('#content').value.trim();

        if (title && content) {
            const response = await fetch('/api/entries', {
                method: 'POST',
                body: JSON.stringify({ title, mood, content }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to create new entry. ');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const trashButtons = document.querySelectorAll('.trash-btn');

    trashButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = button.parentElement;
            item.remove();
        });
    });
});