// ============================================
// SPLASH SCREEN
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splashScreen').classList.add('hide');
        document.getElementById('mainApp').style.display = 'block';
        updateTime();
        setInterval(updateTime, 1000);
    }, 2800);
});

function updateTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent =
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');
}

// ============================================
// SOUND SYSTEM
// ============================================
function playSound(type) {
    try {
        let audio;
        if (type === 'click') audio = document.getElementById('clickSound');
        else if (type === 'result') audio = document.getElementById('resultSound');
        else if (type === 'love') audio = document.getElementById('loveSound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }
    } catch (e) {}
}

// ============================================
// NAVIGATION
// ============================================
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound('click');
        const screen = btn.dataset.screen;
        navigateTo(screen);
    });
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound('click');
        const target = btn.dataset.back;
        navigateTo(target);
    });
});

function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    if (screenId === 'home') {
        document.getElementById('homeScreen').classList.add('active');
    } else {
        const target = document.getElementById('screen-' + screenId);
        if (target) target.classList.add('active');
    }
}

// ============================================
// HEART RAIN EFFECT
// ============================================
function startHeartRain(count = 30) {
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '✨'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-rain';
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (16 + Math.random() * 24) + 'px';
            heart.style.animationDuration = (3 + Math.random() * 4) + 's';
            heart.style.opacity = 0.6 + Math.random() * 0.4;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, i * 80);
    }
}

// ============================================
// LOVE MESSAGES DATABASE
// ============================================
const loveMessages = {
    high: [
        '🔥 Incredible Love! You are soulmates!',
        '💖 Perfect Match! Made for each other!',
        '🌟 True Love! A match made in heaven!',
        '💕 Eternal Love! Together forever!',
        '✨ Magical Connection! Destiny brought you together!'
    ],
    mid: [
        '💗 Great Compatibility! Love is growing!',
        '🌹 Beautiful Bond! Keep nurturing it!',
        '💞 Strong Connection! You two are special!',
        '🌸 Lovely Pair! Love is blossoming!',
        '🌺 Wonderful Chemistry! You complement each other!'
    ],
    low: [
        '💫 Interesting Match! Opposites attract!',
        '🌈 Give it time! Love can grow!',
        '🌙 Mysterious Connection! Explore it!',
        '⭐ Potential is there! Nurture it!',
        '🍀 Lucky to have found each other!'
    ]
};

function getLoveMessage(percent) {
    let list;
    if (percent >= 70) list = loveMessages.high;
    else if (percent >= 40) list = loveMessages.mid;
    else list = loveMessages.low;
    return list[Math.floor(Math.random() * list.length)];
}

function getSubMessage(percent, type) {
    const subs = {
        name: ['💕 Love is in the air...', '💑 Perfect match!', '❤️ Heartbeats sync!'],
        dob: ['🌟 Destiny aligned!', '🎂 Stars match!', '💫 Written in the stars!'],
        friendship: ['🤗 Besties forever!', '🤝 Friends like family!', '💪 Unbreakable bond!'],
        marriage: ['💍 Happily ever after!', '👰🤵 Perfect wedding!', '💞 Soulmates forever!'],
        mobile: ['📱 Digital destiny!', '💖 Connected hearts!', '✨ Cosmic connection!']
    };
    const list = subs[type] || subs.name;
    return list[Math.floor(Math.random() * list.length)];
}

// ============================================
// CALCULATOR FUNCTIONS
// ============================================

function generatePercent(input1, input2) {
    if (!input1 || !input2) return 0;
    const combined = (input1 + input2).toUpperCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) % 1000;
    }
    let percent = (hash % 60) + 25;

    // Bonus for matching characters
    const common = [...input1.toUpperCase()].filter(ch => input2.toUpperCase().includes(ch)).length;
    percent = Math.min(percent + Math.min(common * 2, 15), 99);

    return percent;
}

function showResult(resultId, percent, message, subMessage) {
    const box = document.getElementById(resultId);
    if (!box) return;

    // Animate result
    box.classList.remove('pop');
    setTimeout(() => {
        box.innerHTML = `
            <div class="result-percent">${percent}%</div>
            <div class="result-message">${message}</div>
            <div class="result-sub">${subMessage}</div>
        `;
        box.classList.add('pop');
    }, 100);

    // Play sounds
    playSound('result');
    if (percent >= 70) {
        setTimeout(() => playSound('love'), 300);
        startHeartRain(40);
    } else if (percent >= 40) {
        startHeartRain(20);
    }
}

// ----- 1. LOVE BY NAME -----
function calculateByName() {
    const n1 = document.getElementById('name1').value.trim();
    const n2 = document.getElementById('name2').value.trim();

    if (!n1 || !n2) {
        showResult('resultName', 0, '⚠️ Please enter both names!', '💕 Love needs two hearts 💕');
        return;
    }

    const percent = generatePercent(n1, n2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'name');
    showResult('resultName', percent, message, sub);
}

// ----- 2. LOVE BY DOB -----
function calculateByDOB() {
    const d1 = document.getElementById('dob1').value;
    const d2 = document.getElementById('dob2').value;

    if (!d1 || !d2) {
        showResult('resultDob', 0, '⚠️ Please select both dates!', '🎂 Choose your birth dates');
        return;
    }

    const date1 = new Date(d1);
    const date2 = new Date(d2);

    // Calculate difference in days
    const diff = Math.abs(date2 - date1);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    // Percent based on day difference (lower difference = higher love)
    let percent;
    if (days < 365) percent = 85 + Math.floor(Math.random() * 14);
    else if (days < 1095) percent = 65 + Math.floor(Math.random() * 20);
    else if (days < 3650) percent = 45 + Math.floor(Math.random() * 20);
    else percent = 25 + Math.floor(Math.random() * 25);

    percent = Math.min(percent, 99);

    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'dob');
    showResult('resultDob', percent, message, sub);
}

// ----- 3. FRIENDSHIP -----
function calculateFriendship() {
    const f1 = document.getElementById('friend1').value.trim();
    const f2 = document.getElementById('friend2').value.trim();

    if (!f1 || !f2) {
        showResult('resultFriendship', 0, '⚠️ Enter both names!', '🤝 Friendship needs two!');
        return;
    }

    const percent = generatePercent(f1, f2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'friendship');
    showResult('resultFriendship', percent, message, sub);
}

// ----- 4. MARRIAGE -----
function calculateMarriage() {
    const m1 = document.getElementById('marry1').value.trim();
    const m2 = document.getElementById('marry2').value.trim();

    if (!m1 || !m2) {
        showResult('resultMarriage', 0, '⚠️ Enter both names!', '💍 Marriage needs two souls!');
        return;
    }

    const percent = generatePercent(m1, m2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'marriage');
    showResult('resultMarriage', percent, message, sub);
}

// ----- 5. LOVE BY MOBILE -----
function calculateByMobile() {
    const m1 = document.getElementById('mobile1').value.trim();
    const m2 = document.getElementById('mobile2').value.trim();

    if (!m1 || !m2) {
        showResult('resultMobile', 0, '⚠️ Enter both numbers!', '📱 Mobile love needs digits!');
        return;
    }

    if (m1.length < 5 || m2.length < 5) {
        showResult('resultMobile', 0, '⚠️ Enter valid numbers!', '📱 Minimum 5 digits please');
        return;
    }

    const percent = generatePercent(m1, m2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'mobile');
    showResult('resultMobile', percent, message, sub);
}

// ============================================
// KEYBOARD SUPPORT (Enter key)
// ============================================
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const screen = input.closest('.screen');
            if (screen) {
                const id = screen.id;
                if (id === 'screen-name') calculateByName();
                else if (id === 'screen-dob') calculateByDOB();
                else if (id === 'screen-friendship') calculateFriendship();
                else if (id === 'screen-marriage') calculateMarriage();
                else if (id === 'screen-mobile') calculateByMobile();
            }
        }
    });
});

// ============================================
// MOBILE NUMBER AUTO-FORMAT
// ============================================
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 10);
    });
});

console.log('💕 Love Calculator Suite loaded! Made with ❤️');
