// Function to load the common header
async function loadCommonHeader() {
    try {
        // Attempt to fetch the header HTML
        const response = await fetch('header.html');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const headerHTML = await response.text();

        // Find all elements with class 'nav-placeholder' and replace them with the header
        const placeholders = document.querySelectorAll('.nav-placeholder');
        if (placeholders.length > 0) {
            placeholders.forEach(placeholder => {
                placeholder.innerHTML = headerHTML;
            });
        } else {
            // If no placeholders found, try to insert header manually
            console.warn('No nav-placeholder elements found on the page.');
        }
    } catch (error) {
        console.error('Error loading common header:', error);

        // Fallback: create the navigation manually if fetch fails
        const placeholders = document.querySelectorAll('.nav-placeholder');
        if (placeholders.length > 0) {
            const fallbackHeader = `
                <div class="nav-bar">
                    <a class="nav-link" href="./index.html">Home</a>
                    <a class="nav-link" href="./heroes.html">Heroes</a>
                    <a class="nav-link" href="./equipment.html">Equipment</a>
                    <a class="nav-link" href="./apc.html">APCs</a>
                    <a class="nav-link" href="./apc-skins.html">APC Skins</a>
                    <a class="nav-link" href="./warmachine.html">War Machines</a>
                    <a class="nav-link" href="./relics.html">Relics</a>
                </div>
            `;
            placeholders.forEach(placeholder => {
                placeholder.innerHTML = fallbackHeader;
            });
        }
    }
}

// Function to highlight the current page in the navigation
function setActiveNavLink() {
    // Get the current page name
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop().toLowerCase() || 'index.html';

    // Find all nav links and add 'active' class to the current page link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        let href = link.getAttribute('href').toLowerCase();

        // Normalize href to compare with current page
        let normalizedHref = href.replace('./', '').toLowerCase();
        let currentNormalized = currentPage.toLowerCase();

        // Check if this link points to the current page
        const isCurrentPage =
            (normalizedHref === currentNormalized) ||
            (currentNormalized === 'relics.html' && normalizedHref.includes('relics.html')) ||
            (currentNormalized === 'index.html' && (normalizedHref.includes('index.html') || normalizedHref === '')) ||
            (currentNormalized === '' && normalizedHref.includes('index.html'));

        if (isCurrentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Enhanced function to add relic buff information to the relics page
function addRelicBuffsToPage() {
    // Only run on the relics page
    if (!window.location.pathname.includes('relics.html') && !window.location.pathname.endsWith('relics')) {
        return;
    }

    // Wait for content to load
    setTimeout(() => {
        if (typeof relicBuffData === 'undefined' || typeof relicBuffData.getRelicBuffByRelicId !== 'function') {
            console.warn('Relic buff data module not available; skipping relic buff annotations.');
            return;
        }

        // Get all relic cards
        const relicCards = document.querySelectorAll('.set-card');

        relicCards.forEach(card => {
            const metaLines = card.querySelectorAll('.set-meta-line');
            if (!metaLines.length) {
                return;
            }

            const idMatch = metaLines[0].textContent.match(/ID:\s*(\d+)/i);
            if (!idMatch) {
                return;
            }

            const relicId = parseInt(idMatch[1], 10);
            if (!Number.isFinite(relicId)) {
                return;
            }

            const buffData = relicBuffData.getRelicBuffByRelicId(relicId);
            if (!buffData) {
                return;
            }

            const buffInfo = document.createElement('div');
            buffInfo.className = 'set-meta-line buff-info';
            buffInfo.style.fontStyle = 'italic';
            buffInfo.style.color = '#4ade80'; // Green color for positive buffs
            buffInfo.style.borderTop = '1px dashed rgba(74, 222, 128, 0.3)';
            buffInfo.style.paddingTop = '4px';
            buffInfo.innerHTML = `<strong>Buff:</strong> ${buffData.description} <small>(Stage: ${buffData.stage})</small>`;

            const existingMetaLines = card.querySelectorAll('.set-meta-line');
            if (existingMetaLines.length > 0) {
                const lastMetaLine = existingMetaLines[existingMetaLines.length - 1];
                lastMetaLine.after(buffInfo);
            } else {
                card.appendChild(buffInfo);
            }
        });
    }, 100); // Small delay to ensure content is loaded
}

// Load the header when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadCommonHeader();
    setActiveNavLink();
    addRelicBuffsToPage(); // Add relic buffs if on the relics page
});