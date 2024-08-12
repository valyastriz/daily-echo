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

        // Handle form submission
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

            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <header class="entry-header">
                    <h1>${entry.title}</h1>
                    <div class="entry-meta">
                        <span class="entry-mood">${entry.mood}</span>
                        <span class="entry-date">${new Date(entry.created_at).toLocaleDateString()}</span>
                    </div>
                </header>
                <div class="entry-content">
                    <p>${entry.content}</p>
                </div>
                <div class="entry-actions">
                    <button class="edit-entry-btn">Edit</button>
                    <button class="delete-entry-btn">Delete</button>
                </div>
            `;
        });
    });

    function addEntryToSidebar(entry) {
        const entryList = document.querySelector('.entry-list');
        const newEntryItem = document.createElement('li');
        newEntryItem.classList.add('entry-item');
        newEntryItem.setAttribute('data-id', entry.id);
        newEntryItem.innerHTML = `
            <span class="entry-title">${entry.title}</span>
            <span class="entry-date">${new Date(entry.created_at).toLocaleDateString()}</span>
            <span class="entry-tags">${entry.tags}</span>
        `;
        entryList.appendChild(newEntryItem);

        // Reattach the click event to the new item
        newEntryItem.addEventListener('click', async (event) => {
            const entryId = newEntryItem.getAttribute('data-id');
            const response = await fetch(`/api/entries/${entryId}`);
            const entry = await response.json();

            const entryDetails = document.querySelector('#entry-details');
            entryDetails.innerHTML = `
                <header class="entry-header">
                    <h1>${entry.title}</h1>
                    <div class="entry-meta">
                        <span class="entry-mood">${entry.mood}</span>
                        <span class="entry-date">${new Date(entry.created_at).toLocaleDateString()}</span>
                    </div>
                </header>
                <div class="entry-content">
                    <p>${entry.content}</p>
                </div>
                <div class="entry-actions">
                    <button class="edit-entry-btn">Edit</button>
                    <button class="delete-entry-btn">Delete</button>
                </div>
            `;
        });
    }
});
