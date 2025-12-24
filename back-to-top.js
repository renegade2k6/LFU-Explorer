// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the back-to-top button (added in HTML)
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Search functionality for warbeast page
    const searchInput = document.getElementById('warbeast-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.set-card');

            cards.forEach(card => {
                const name = card.querySelector('.set-name')?.textContent.toLowerCase();
                if (name && name.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Error tracking
    window.addEventListener('error', function(e) {
        console.error('Global error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno
        });
    });

    window.addEventListener('unhandled rejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
});