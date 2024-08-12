// this file will hold other utility functions (e.g., date formatting)
module.exports = {
    format_date: (date) => {
        if (!date) return 'No date available';
        return new Date(date).toLocaleDateString();
    },

};
