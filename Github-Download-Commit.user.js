// ==UserScript==
// @name         GitHub commit snapshot download button
// @author       LjeDamos
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Add a Download ZIP button for each commit snapshot on GitHub commit list pages
// @match        https://github.com/*/*/commits*
// @match        https://github.com/*/*/commit/*
// @updateURL    https://github.com/LjeDamos/Github-Download-Commit/raw/main/Github-Download-Commit.user.js
// @downloadURL  https://github.com/LjeDamos/Github-Download-Commit/raw/main/Github-Download-Commit.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const zipSvg = `<svg style="pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 10H12V12H10V10ZM12 12H14V14H12V12ZM10 14H12V16H10V14ZM10 16H14V19H10V16Z" fill="currentColor"/>
    </svg>`;

    function addZipButtons() {
        document.querySelectorAll('a[href*="/tree/"]:not([data-zip-added])').forEach(link => {

            const match = link.href.match(/\/([^\/]+)\/([^\/]+)\/tree\/([0-9a-f]{40})$/i);
            if (!match) return;

            link.dataset.zipAdded = '1';
            const [, owner, repo, sha] = match;

            const btnId = `zip-btn-${sha}`;
            const tooltipId = `zip-tooltip-${sha}`;

            // 1. Create the native button
            const btn = document.createElement('a');
            btn.href = `https://github.com/${owner}/${repo}/archive/${sha}.zip`;
            btn.className = link.className;
            btn.id = btnId;
            btn.target = '_blank';
            btn.innerHTML = zipSvg;
            btn.style.marginLeft = '8px';
            btn.setAttribute('aria-labelledby', tooltipId); // Links accessibility to the tooltip

            // 2. Create the EXACT DOM structure GitHub requires for tooltips in 2024/2025
            const tooltip = document.createElement('tool-tip');
            tooltip.id = tooltipId;
            tooltip.setAttribute('for', btnId);
            tooltip.setAttribute('data-direction', 'sw');
            tooltip.setAttribute('data-type', 'label');
            tooltip.setAttribute('data-view-component', 'true');
            tooltip.setAttribute('popover', 'manual');
            tooltip.className = 'sr-only position-absolute';
            tooltip.textContent = 'Download ZIP';

            // 3. Insert them immediately after the wrapper
            const wrapper = link.parentElement;
            wrapper.insertAdjacentElement('afterend', btn);
            btn.insertAdjacentElement('afterend', tooltip);
        });
    }

    addZipButtons();

    let timeout;
    new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(addZipButtons, 100);
    }).observe(document.body, { childList: true, subtree: true });
})();
