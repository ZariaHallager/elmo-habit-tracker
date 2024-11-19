document.querySelectorAll('.day-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (confirm('Do you like complete this habit today? Cancel if yes, OK if no.')) {
            const formData = new FormData(form);
            formData.append('action', 'like');
            fetch(form.action, {
                method: 'POST',
                body: formData,
            }).then(() => window.location.reload());
        } else {
            form.submit();
        }
    });
});

document.querySelectorAll('.habit').forEach(habit => {
    const pinButton = habit.querySelector('form button[type="submit"]'); // Pin button within each habit card
    pinButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Toggle the 'pinned' class when clicking the pin button
        habit.classList.toggle('pinned');

        // Move the pinned habit to the top
        reorderHabits();

        // Submit the pin action (toggle the pinned status in your backend)
        habit.querySelector('form').submit();
    });
});

// Function to reorder the habits in the DOM
function reorderHabits() {
    const habitList = document.querySelector('.habits-list'); // The container holding the habit items
    const pinnedHabits = Array.from(habitList.querySelectorAll('.habit.pinned'));
    const unpinnedHabits = Array.from(habitList.querySelectorAll('.habit:not(.pinned)'));

    // Clear the list and append pinned habits first
    habitList.innerHTML = '';

    // Append pinned habits first
    pinnedHabits.forEach(habit => habitList.appendChild(habit));

    // Append unpinned habits after
    unpinnedHabits.forEach(habit => habitList.appendChild(habit));
}
