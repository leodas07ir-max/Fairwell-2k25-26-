// --- BLOOD CANVAS LOGIC ---
const canvas = document.getElementById('bloodCanvas');
const ctx = canvas.getContext('2d');
let drips = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Drip {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 2 + 0.8;
        this.size = Math.random() * 4 + 2;
    }
    draw() {
        ctx.fillStyle = '#4a0404';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(this.x - this.size/2, 0, this.size, this.y);
    }
    update() { this.y += this.speed; }
}

function animateBlood() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.15) drips.push(new Drip());
    drips.forEach((drip, i) => {
        drip.update(); drip.draw();
        if (drip.y > canvas.height) drips.splice(i, 1);
    });
    requestAnimationFrame(animateBlood);
}

// Start sequence
setTimeout(() => document.getElementById('intro-text').classList.add('blood-visible'), 500);
animateBlood();

document.getElementById('intro-screen').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('main-content').style.opacity = '1';
    }, 1000);
});

// --- NAVIGATION & ANIME LOGIC ---
let selectedPath = '';

function showStreams() {
    document.getElementById('hook').classList.add('hidden');
    document.getElementById('streams').classList.remove('hidden');
}

function selectStream(stream) {
    selectedPath = stream;
    const body = document.body;
    const quote = document.getElementById('streamQuote');
    const animeGif = document.getElementById('anime-gif');
    const loadingText = document.getElementById('loading-text');

    body.style.color = "#FFF4E8";

    if (stream === 'science') {
        body.style.backgroundColor = '#0B1C2D'; // Midnight Navy
        animeGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JnB2PTEmZGw9MQ/UgV8Y7bGUtkuS3ltS8/giphy.gif";
        loadingText.innerText = "Expanding Infinite Void...";
        quote.innerHTML = "PHYSICS: Where we ignore air resistance and our sanity.<br><br>Want to pass? Type YES to assume g=10.";
    } else if (stream === 'commerce') {
        body.style.backgroundColor = '#1C1C1C'; // Charcoal
        animeGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JnB2PTEmZGw9MQ/At8TemfUYbt3G/giphy.gif";
        loadingText.innerText = "Powering up Balance Sheets...";
        quote.innerHTML = "ACCOUNTS: Still finding that 1-rupee difference?<br><br>Type YES to magically tally the Balance Sheet.";
    } else {
        body.style.backgroundColor = '#FFF4E8'; // Ivory
        body.style.color = '#1C1C1C';
        animeGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JnB2PTEmZGw9MQ/3o7TKMGpxxcaOmsXk4/giphy.gif";
        loadingText.innerText = "Writing our own History...";
        quote.innerHTML = "HISTORY: Can't remember if the Revolution happened before or after lunch?<br><br>Type YES to rewrite the past.";
    }

    document.getElementById('streams').classList.add('hidden');
    document.getElementById('prompt').classList.remove('hidden');
}

function checkInput() {
    const val = document.getElementById('userInput').value.toUpperCase();
    if (val === 'YES') {
        document.getElementById('prompt').classList.add('hidden');
        const loader = document.getElementById('loading-screen');
        loader.classList.remove('hidden');

        // Start progress bar
        setTimeout(() => document.getElementById('progress-bar').style.width = '100%', 100);

        // Transition to Final Reveal
        setTimeout(() => {
            document.body.classList.add('glitch-flash');
            setTimeout(() => {
                document.body.classList.remove('glitch-flash');
                loader.classList.add('hidden');
                document.getElementById('reveal').classList.remove('hidden');
                startCountdown();
            }, 300);
        }, 3500);
    }
}

function startCountdown() {
    const target = new Date("Feb 7, 2026 10:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('countdown').innerHTML = `T-MINUS: ${days}d ${hours}h ${mins}m UNTIL FREEDOM`;
    }, 1000);
    }
