document.addEventListener('DOMContentLoaded', () => {
    // Handle the "New Entry" button click
    document.querySelector('#new-entry-btn').addEventListener('click', () => {
        const entryDetails = document.querySelector('#entry-details');
        entryDetails.innerHTML = `
            <form id="new-entry-form">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="mood">Mood</label>
                    <input type="text" id="mood" name="mood">
                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea id="content" name="content" rows="10" required></textarea>
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
                    const newEntry = await response.json();
                    addEntryToSidebar(newEntry);
                    document.querySelector('#entry-details').innerHTML = '<p>Entry saved successfully! Select an entry to view details, or add another new entry.</p>';
                } else {
                    alert('Failed to save entry.');
                }
            }
        });
    });

    // Handle existing entry clicks
    document.querySelectorAll('.entry-item').forEach(item => {
        item.addEventListener('click', async (event) => {
            const entryId = item.getAttribute('data-id');
            const response = await fetch(`/api/entries/${entryId}`);
            const entry = await response.json();

            
            console.log(entry);

            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <header class="entry-header">
                    <h1>${entry.title || 'No Title'}</h1>
                    <div class="entry-meta">
                        <span class="entry-mood">${entry.mood || 'No Mood'}</span>
                        <span class="entry-date">${new Date(entry.created_at).toLocaleDateString() || 'No Date'}</span>
                    </div>
                </header>
                <div class="entry-content">
                    <p>${entry.content || 'No Content'}</p>
                </div>
                <div class="entry-actions">
                    <button class="edit-entry-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-entry-btn" data-id="${entry.id}">Delete</button>
                    <button class="email-entry-btn" data-id="${entry.id}">Send to Email</button>
                </div>
            `;

            
            attachEditButtonListener(entry.id);
            attachDeleteButtonListener(entry.id);
        });
    });

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
                        <textarea id="edit-content" name="content" rows="10" required>${entry.content || ''}</textarea>
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
                        const updatedEntry = await response.json();
                        const entryItem = document.querySelector(`[data-id="${updatedEntry.id}"]`);
                        if (entryItem) {
                            entryItem.querySelector('.entry-title').textContent = updatedEntry.title;
                            entryItem.querySelector('.entry-date').textContent = new Date(updatedEntry.created_at).toLocaleDateString();
                        }
                        entryDetails.innerHTML = '<p>Entry updated successfully!</p>';
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
                const entryItem = document.querySelector(`[data-id="${entryId}"]`);
                if (entryItem) {
                    entryItem.remove();
                }
                document.querySelector('#entry-details').innerHTML = '<p>Entry deleted successfully!</p>';
            } else {
                alert('Failed to delete entry.');
            }
        });
    }

    function addEntryToSidebar(entry) {
        const entryList = document.querySelector('.entry-list');
        const newEntryItem = document.createElement('li');
        newEntryItem.classList.add('entry-item');
        newEntryItem.setAttribute('data-id', entry.id);
        newEntryItem.innerHTML = `
            <span class="entry-title">${entry.title || 'No Title'}</span>
            <span class="entry-date">${new Date(entry.created_at).toLocaleDateString() || 'No Date'}</span>
            <span class="entry-tags">${entry.tags || 'No Tags'}</span>
        `;
        entryList.appendChild(newEntryItem);

        // Reattach the click event to the new item
        newEntryItem.addEventListener('click', async () => {
            const entryId = newEntryItem.getAttribute('data-id');
            const response = await fetch(`/api/entries/${entryId}`);
            const entry = await response.json();

           
            console.log(entry);

            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <header class="entry-header">
                    <h1>${entry.title || 'No Title'}</h1>
                    <div class="entry-meta">
                        <span class="entry-mood">${entry.mood || 'No Mood'}</span>
                        <span class="entry-date">${new Date(entry.created_at).toLocaleDateString() || 'No Date'}</span>
                    </div>
                </header>
                <div class="entry-content">
                    <p>${entry.content || 'No Content'}</p>
                </div>
                <div class="entry-actions">
                    <button class="edit-entry-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-entry-btn" data-id="${entry.id}">Delete</button>
                </div>
            `;

           
            attachEditButtonListener(entry.id);
            attachDeleteButtonListener(entry.id);
        });
    }
});
