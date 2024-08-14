// // emailEntry.js
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.email-entry-btn').forEach(button => {
//         button.addEventListener('click', async (event) => {
//             const entryId = event.target.getAttribute('data-id');
//             console.log(`Email button clicked for entry ID: ${entryId}`);

//             const response = await fetch(`/api/email-entry/${entryId}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             if (response.ok) {
//                 alert('Email sent successfully!');
//             } else {
//                 alert('Failed to send email.');
//             }
//         });
//     });
// });
