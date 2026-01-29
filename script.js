let selectedPath = '';
const canvas = document.getElementById('bloodCanvas');
const ctx = canvas.getContext('2d');
let drips = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();

class Drip {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 3 + 2;
    }
    draw() {
        ctx.fillStyle = '#4a0404';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(this.x - this.size/2, 0, this.size, this.y);
    }
    update() { this.y += this.speed; }
}

function animateBlood() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.1) drips.push(new Drip());
    drips.forEach((d, i) => { d.update(); d.draw(); if (d.y > canvas.height) drips.splice(i, 1); });
    this.animationId = requestAnimationFrame(animateBlood);
}

setTimeout(() => document.getElementById('intro-text').classList.add('blood-visible'), 500);
animateBlood();

document.getElementById('intro-screen').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => { this.style.display = 'none'; document.getElementById('main-content').style.opacity = '1'; }, 1000);
});

function showStreams() {
    document.getElementById('hook').classList.add('hidden');
    document.getElementById('streams').classList.remove('hidden');
}

function selectStream(stream) {
    selectedPath = stream;
    const body = document.body;
    const animeGif = document.getElementById('anime-gif');
    const quote = document.getElementById('streamQuote');
    const loaderText = document.getElementById('loading-text');

    if (stream === 'science') {
        body.style.backgroundColor = '#0B1C2D';
        animeGif.src = "https://media.giphy.com/media/UgV8Y7bGUtkuS3ltS8/giphy.gif"; 
        quote.innerHTML = "PHYSICS: Type YES to ignore air resistance and graduate.";
        loaderText.innerText = "Expanding Infinite Void...";
    } else if (stream === 'commerce') {
        body.style.backgroundColor = '#1C1C1C';
        animeGif.src = "https://media.giphy.com/media/At8TemfUYbt3G/giphy.gif";
        quote.innerHTML = "ACCOUNTS: Type YES to magically tally your Balance Sheet.";
        loaderText.innerText = "Powering up Assets...";
    } else {
        body.style.backgroundColor = '#FFF4E8'; body.style.color = '#1C1C1C';
        animeGif.src = "https://media.giphy.com/media/3o7TKMGpxxcaOmsXk4/giphy.gif";
        quote.innerHTML = "HISTORY: Type YES to rewrite your own timeline.";
        loaderText.innerText = "Archiving Memories...";
    }

    document.getElementById('streams').classList.add('hidden');
    document.getElementById('prompt').classList.remove('hidden');
}

function checkInput() {
    if (document.getElementById('userInput').value.toUpperCase() === 'YES') {
        document.getElementById('prompt').classList.add('hidden');
        document.getElementById('loading-screen').classList.remove('hidden');
        setTimeout(() => document.getElementById('progress-bar').style.width = '100%', 100);

        setTimeout(() => {
            document.body.classList.add('glitch-flash');
            setTimeout(() => {
                document.body.classList.remove('glitch-flash');
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('reveal').classList.remove('hidden');
                startSprinkler(selectedPath);
                startCountdown();
            }, 400);
        }, 3500);
    }
}

function startSprinkler(stream) {
    const container = document.getElementById('particle-container');
    const items = { 'science': ['🧪', '🧬', '🔥', '✨'], 'commerce': ['💵', '💰', '📈', '🪙'], 'humanities': ['📜', '🖋️', '📖', '⚔️'] };
    setInterval(() => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerHTML = items[stream][Math.floor(Math.random() * items[stream].length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = Math.random() * 20 + 20 + 'px';
        p.style.animationDuration = Math.random() * 2 + 2 + 's';
        container.appendChild(p);
        setTimeout(() => p.remove(), 4000);
    }, 150);
}

function startCountdown() {
    const target = new Date("Feb 7, 2026 10:00:00").getTime();
    setInterval(() => {
        const diff = target - new Date().getTime();
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('countdown').innerHTML = `${d}D : ${h}H REMAINING`;
    }, 1000);
}

function rewatchIntro() { location.reload(); }
