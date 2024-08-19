document.addEventListener('DOMContentLoaded', () => {
    // Handle the "New Entry" button click
    document.querySelector('#new-entry-btn').addEventListener('click', () => {
        const entryDetails = document.querySelector('#entry-details');
        entryDetails.innerHTML = `
            <form id="new-entry-form">
                <div class="form-group label">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group label">
                    <label for="mood">Mood</label>
                    <input type="text" id="mood" name="mood">
                </div>
                <div class="form-group label">
                    <label for="content">Content</label>
                    <textarea id="content" name="content" rows="20" required></textarea>
                </div>
                <button type="submit" class="save-entry-btn">Save Entry</button>
            </form>
        `;

        // Handle form submission for new entry
        document.querySelector('#new-entry-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.querySelector('#title').value.trim();
            const mood = document.querySelector('#mood').value.trim();
            const content = document.querySelector('#content').value.trim();

            if (title && content) {
                const response = await fetch('/api/entries', {
                    method: 'POST',
                    body: JSON.stringify({ title, mood, content }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    reloadSidebar();  // Reload sidebar to get the new entry displayed properly
                    document.querySelector('#entry-details').innerHTML = '<p>Entry saved successfully! Select an entry to view details, or add another new entry.</p>';
                } else {
                    alert('Failed to save entry.');
                }
            }
        });
    });

    // Handle existing entry clicks
    attachEntryClickListeners();

    function attachEntryClickListeners() {
        document.querySelectorAll('.entry-item').forEach(item => {
            item.addEventListener('click', async (event) => {
                const entryId = item.getAttribute('data-id');
                const response = await fetch(`/api/entries/${entryId}`);
                const entry = await response.json();
    
                // Convert newlines to <br> or wrap in <p> tags for proper rendering
                const formattedContent = entry.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');
    
                const entryDetails = document.querySelector('#entry-details');
                entryDetails.innerHTML = `
                    <header class="entry-header">
                        <h1 id="entry-title">${entry.title || 'No Title'}</h1>
                        <div class="entry-meta">
                            <span class="entry-mood">${entry.mood || 'No Mood'}</span>
                            <span class="entry-date">${new Date(entry.created_at).toLocaleDateString() || 'No Date'}</span>
                        </div>
                    </header>
                    <div>
                        <div id="entry-content">${formattedContent || 'No Content'}</div>
                    </div>
                    <div class="entry-actions">
                        <button class="edit-entry-btn entry-btn-class" data-id="${entry.id}">Edit</button>
                        <button class="delete-entry-btn entry-btn-class" data-id="${entry.id}">Delete</button>
                        <button class="cheerMeUpBtn entry-btn-class" data-id="${entry.id}">Cheer Me Up</button>
                    </div>
                `;
    
                attachEditButtonListener(entry.id);
                attachDeleteButtonListener(entry.id);
                attachCheerMeUpListener(entry.id);
            });
        });
    }

    function attachEditButtonListener(entryId) {
        document.querySelector('.edit-entry-btn').addEventListener('click', async () => {
            const response = await fetch(`/api/entries/${entryId}`);
            const entry = await response.json();

            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <form id="edit-entry-form" data-id="${entry.id}">
                    <div class="form-group">
                        <label for="edit-title">Title</label>
                        <input type="text" id="edit-title" name="title" value="${entry.title || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-mood">Mood</label>
                        <input type="text" id="edit-mood" name="mood" value="${entry.mood || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-content">Content</label>
                        <textarea class="content-text" id="edit-content" name="content" rows="10" required>${entry.content || ''}</textarea>
                    </div>
                    <button type="submit" class="save-edit-btn">Save Changes</button>
                </form>
            `;

            // Handle form submission for editing entry
            document.querySelector('#edit-entry-form').addEventListener('submit', async (event) => {
                event.preventDefault();

                const editId = event.target.getAttribute('data-id');
                const title = document.querySelector('#edit-title').value.trim();
                const mood = document.querySelector('#edit-mood').value.trim();
                const content = document.querySelector('#edit-content').value.trim();

                if (title && content) {
                    const response = await fetch(`/api/entries/${editId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ title, mood, content }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        reloadSidebar();  // Reload sidebar to reflect the updated entry
                        document.querySelector('#entry-details').innerHTML = '<p>Entry updated successfully!</p>';
                    } else {
                        alert('Failed to update entry.');
                    }
                }
            });
        });
    }

    function attachDeleteButtonListener(entryId) {
        document.querySelector('.delete-entry-btn').addEventListener('click', async () => {
            const response = await fetch(`/api/entries/${entryId}`, { method: 'DELETE' });

            if (response.ok) {
                reloadSidebar();  // Reload sidebar to remove the deleted entry
                document.querySelector('#entry-details').innerHTML = '<p>Entry deleted successfully!</p>';
            } else {
                alert('Failed to delete entry.');
            }
        });
    }

    async function attachCheerMeUpListener() {
        document.querySelectorAll('.cheerMeUpBtn').forEach(button => {
            button.addEventListener('click', async () => {
                try {
                    const response = await fetch('/api/entries/random-funny');
                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message); // Show the funny message in a pop-up
                    } else {
                        alert('Could not fetch a funny message. Please try again.');
                    }
                } catch (error) {
                    console.error('Error fetching funny message:', error);
                    alert('Could not fetch a funny message. Please try again.');
                }
            });
        });
    }

    function reloadSidebar() {
        fetch('/sidebar')
            .then(response => response.text())
            .then(html => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.innerHTML = html;

                // Reattach event listeners
                attachEntryClickListeners();
                attachNewEntryListener();
            })
            .catch(err => console.error('Failed to load sidebar:', err));
    }

    function attachNewEntryListener() {
        document.querySelector('#new-entry-btn').addEventListener('click', () => {
            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <form id="new-entry-form">
                    <div class="form-group label">
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group label">
                        <label for="mood">Mood</label>
                        <input type="text" id="mood" name="mood">
                    </div>
                    <div class="form-group label">
                        <label for="content">Content</label>
                        <textarea id="content" name="content" rows="20" required></textarea>
                    </div>
                    <button type="submit" class="save-entry-btn">Save Entry</button>
                </form>
            `;

            // Handle form submission for new entry
            document.querySelector('#new-entry-form').addEventListener('submit', async (event) => {
                event.preventDefault();

                const title = document.querySelector('#title').value.trim();
                const mood = document.querySelector('#mood').value.trim();
                const content = document.querySelector('#content').value.trim();

                if (title && content) {
                    const response = await fetch('/api/entries', {
                        method: 'POST',
                        body: JSON.stringify({ title, mood, content }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        reloadSidebar();  // Reload sidebar to get the new entry displayed properly
                        document.querySelector('#entry-details').innerHTML = '<p>Entry saved successfully! Select an entry to view details, or add another new entry.</p>';
                    } else {
                        alert('Failed to save entry.');
                    }
                }
            });
        });
    }
});