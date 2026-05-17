// Initialization
let adBlockEnabled = false;
let usedSites = JSON.parse(localStorage.getItem('vmin_history') || '[]');

window.onload = () => {
    renderGrid();
    // Load saved theme/font
    const savedTheme = localStorage.getItem('vmin_theme');
    if (savedTheme) setTheme(savedTheme);
};

// Ad Blocker Logic
function toggleAdBlock() {
    adBlockEnabled = !adBlockEnabled;
    const container = document.getElementById('adblock-container');
    const statusText = document.getElementById('adblock-status');
    
    if (adBlockEnabled) {
        container.className = 'adblock-on';
        statusText.innerText = 'Enabled';
        alert("VMIN Ad-Blocker: Active 🛡️");
    } else {
        container.className = 'adblock-off';
        statusText.innerText = 'Off';
    }
}

// Search & Tracking Logic
function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) return;

    if (query.includes('.') && !query.includes(' ')) {
        const url = query.startsWith('http') ? query : 'https://' + query;
        trackSite(query);
        window.open(url, '_blank');
    } else {
        window.open('https://duckduckgo.com/?q=' + encodeURIComponent(query), '_blank');
    }
}

// "Real Used" Site Tracking
function trackSite(name) {
    if (!usedSites.includes(name)) {
        usedSites.unshift(name);
        if (usedSites.length > 8) usedSites.pop(); // Keep only top 8
        localStorage.setItem('vmin_history', JSON.stringify(usedSites));
        renderGrid();
    }
}

function renderGrid() {
    const grid = document.getElementById('user-grid');
    grid.innerHTML = usedSites.map(site => `
        <div class="site-item" onclick="window.open('https://${site}', '_blank')">
            <div class="icon-box">${site[0].toUpperCase()}</div>
            <span>${site.split('.')[0]}</span>
        </div>
    `).join('');
}

// Settings Controls
function openSettings() { document.getElementById('settings-modal').style.display = 'block'; }
function closeSettings() { document.getElementById('settings-modal').style.display = 'none'; }

function setTheme(t) {
    document.body.className = (t === 'duck') ? 'duck-theme' : '';
    localStorage.setItem('vmin_theme', t);
}

function setFont(f) { document.body.style.fontFamily = f; }

function toggleGrid() {
    const g = document.getElementById('user-grid');
    g.style.display = g.style.display === 'none' ? 'grid' : 'none';
}

function createNewFile() {
    const name = prompt("Name your new virtual file:");
    if(name) alert(name + " saved to VMIN Virtual System.");
}
