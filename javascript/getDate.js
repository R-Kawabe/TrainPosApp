const Endpoint = '/Date.php';

window.addEventListener('load', async () => {
    const res = await fetch(Endpoint);
    const text = await res.text();
    document.getElementById('Date-Time').textContent = `日付/時刻：${text}`;
}, false);
