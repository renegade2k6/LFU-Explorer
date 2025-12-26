/**
 * LFU Explorer - Centralized Navigation Bar
 * Dynamically loads the navigation bar on all pages
 * This ensures consistent navigation across the entire site with a single source of truth
 */

(function() {
    'use strict';

    /**
     * Determines the correct path prefix based on current page location
     * @returns {string} Path prefix for navigation links
     */
    function getPathPrefix() {
        const path = window.location.pathname;

        // Check if we're in a subdirectory (e.g., guides/, equipment/)
        if (path.includes('/guides/') || path.includes('/equipment/') || path.includes('/TODO/')) {
            return '../';
        }

        return '';
    }

    /**
     * Generates the complete navigation bar HTML
     * Order: Header (top) -> Navbar (middle) -> Patreon CTA (bottom)
     * @returns {string} Navigation bar HTML
     */
    function generateNavbar() {
        const prefix = getPathPrefix();

        return `
        <header class="app-header">
            <div class="header-content">
                <div>
                    <h1>LFU Explorer</h1>
                    <p class="subtitle">Your reference for most things 'Last Fortress Underground'</p>
                </div>
            </div>
        </header>

        <nav class="nav-bar" aria-label="Main">
            <a class="nav-link" href="${prefix}index.html">Home</a>
            <a class="nav-link" href="${prefix}heroes.html">Heroes</a>
            <a class="nav-link" href="${prefix}equipment.html">Equipment</a>
            <a class="nav-link" href="${prefix}apc.html">APCs</a>
            <a class="nav-link" href="${prefix}warmachine.html">War Machines</a>
            <a class="nav-link" href="${prefix}decors.html">Decors</a>
            <a class="nav-link" href="${prefix}relics.html">Relics</a>
            <div class="nav-dropdown">
                <button class="nav-dropdown-toggle nav-link">
                    Guides
                    <span class="nav-dropdown-arrow">▼</span>
                </button>
                <div class="nav-dropdown-content">
                    <a href="${prefix}guides/manor.html" class="nav-dropdown-item">
                        <span class="nav-dropdown-item-icon">🏰</span>
                        Manor System
                    </a>
                    <a href="${prefix}guides/landscape.html" class="nav-dropdown-item">
                        <span class="nav-dropdown-item-icon">🌳</span>
                        Landscape System
                    </a>
                    <a href="${prefix}guides/war-room.html" class="nav-dropdown-item">
                        <span class="nav-dropdown-item-icon">⚔️</span>
                        War Room / Spiritual Link
                    </a>
                    <a href="${prefix}guides/apc-guide.html" class="nav-dropdown-item">
                        <span class="nav-dropdown-item-icon">🚗</span>
                        APC System
                    </a>
                </div>
            </div>
        </nav>

        <div style="max-width: 1200px; margin: 12px auto 20px; padding: 14px 24px; background: linear-gradient(135deg, rgba(255, 66, 77, 0.15) 0%, rgba(249, 104, 84, 0.15) 100%); border: 2px solid rgba(255, 66, 77, 0.4); border-radius: 12px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
                <div style="color: #ff424d; font-weight: 700; font-size: 18px; margin-bottom: 6px; font-family: 'Orbitron', sans-serif;">💖 Support This Project</div>
                <p style="color: #e0e0ff; margin: 0; font-size: 14px; line-height: 1.4;">Help keep LFU Explorer free and up-to-date! Your support enables continuous improvements and new features.</p>
            </div>
            <a href="https://www.patreon.com/renegade2k6UK" target="_blank" rel="noopener noreferrer"
               style="background: linear-gradient(135deg, #ff424d 0%, #f96854 100%); color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.3s ease; white-space: nowrap; box-shadow: 0 4px 12px rgba(255, 66, 77, 0.3); font-family: 'Rajdhani', sans-serif;"
               onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(255, 66, 77, 0.5)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(255, 66, 77, 0.3)'">
                Become a Patron
            </a>
        </div>
        `;
    }

    /**
     * Injects the navigation bar into the page
     * Looks for element with id="navbar-container" or markdown-body, otherwise inserts at beginning of body
     */
    function injectNavbar() {
        const navbarHTML = generateNavbar();
        const container = document.getElementById('navbar-container');

        if (container) {
            // If there's a designated container, use it
            container.innerHTML = navbarHTML;
        } else {
            // Try to insert inside markdown-body first, otherwise at beginning of body
            const markdownBody = document.querySelector('.markdown-body');
            const targetElement = markdownBody || document.body;

            // Get reference to first existing child (to insert before it)
            const firstChild = targetElement.firstChild;

            // Create temporary container
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navbarHTML;

            // Use DocumentFragment to preserve DOM order
            const fragment = document.createDocumentFragment();
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }

            // Insert fragment (preserves order: Header -> Navbar -> Patreon)
            targetElement.insertBefore(fragment, firstChild);
        }

        // Initialize dropdown functionality
        initializeDropdown();
    }

    /**
     * Initializes dropdown menu interactivity
     */
    function initializeDropdown() {
        const dropdown = document.querySelector('.nav-dropdown');
        const toggle = document.querySelector('.nav-dropdown-toggle');

        if (!dropdown || !toggle) return;

        // Toggle dropdown on click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });
    }

    // Inject navbar when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNavbar);
    } else {
        injectNavbar();
    }
})();
