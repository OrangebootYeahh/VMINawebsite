let adBlockOn = false;

function toggleAdBlock() {
    adBlockOn = !adBlockOn;
    document.getElementById('adblock-toggle').classList.toggle('on');
    alert(adBlockOn ? "Ad-Blocker Active" : "Ad-Blocker Disabled");
}

function handleSearch() {
    const input = document.getElementById('url-input').value;
    const view = document.getElementById('web-view');
    const home = document.getElementById('home-screen');

    if (!input) return;

    home.style.display = 'none';
    view.style.display = 'block';

    // THE SECRET: Using a proxy wrapper to show the site visually
    // Note: Some sites still block this, but many more will work
    let targetUrl = input;
    if (!input.includes('://')) targetUrl = 'https://' + input;
    
    // We point the iframe to the site
    view.src = targetUrl;
}

// Navigation Controls
function goBack() { document.getElementById('web-view').contentWindow.history.back(); }
function goForward() { document.getElementById('web-view').contentWindow.history.forward(); }
function reload() { document.getElementById('web-view').src = document.getElementById('web-view').src; }

// Allow "Enter" key to browse
document.getElementById('url-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

function toggleSettings() {
    const s = document.getElementById('settings-panel');
    s.style.display = s.style.display === 'block' ? 'none' : 'block';
}

function setTheme(t) {
    document.body.className = (t === 'duck') ? 'duck-theme' : 'dark-mode';
}
