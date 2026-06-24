// ============================================
// SPLASH SCREEN
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splashScreen').classList.add('hide');
        document.getElementById('mainApp').style.display = 'flex';
        updateTime();
        setInterval(updateTime, 1000);
        showToast('💕 Welcome to Love Suite!');
    }, 2800);
});

function updateTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent =
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');
}

// ============================================
// THEME SYSTEM
// ============================================
const themes = ['default', 'blue', 'green', 'purple', 'gold'];
let currentThemeIndex = 0;

document.getElementById('themeToggle').addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const theme = themes[currentThemeIndex];
    if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
        showToast('🎨 Theme: Default Pink');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        showToast(`🎨 Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
    }
    playSound('click');
});

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
// TOAST NOTIFICATION
// ============================================
function showToast(message, duration = 2500) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================
// NAVIGATION
// ============================================
document.querySelectorAll('.menu-btn, .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen) {
            playSound('click');
            navigateTo(screen);
            // Update active nav
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.nav-btn[data-screen="${screen}"]`)?.classList.add('active');
        }
    });
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound('click');
        navigateTo('home');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.nav-btn[data-screen="home"]')?.classList.add('active');
    });
});

function navigateTo(screenId) {
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
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '✨', '💘', '💞'];
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
        '✨ Magical Connection! Destiny brought you together!',
        '💗 Pure Love! Your hearts beat as one!',
        '🌹 Romantic Soulmates! A love story for the ages!'
    ],
    mid: [
        '💗 Great Compatibility! Love is growing!',
        '🌹 Beautiful Bond! Keep nurturing it!',
        '💞 Strong Connection! You two are special!',
        '🌸 Lovely Pair! Love is blossoming!',
        '🌺 Wonderful Chemistry! You complement each other!',
        '💫 Amazing Connection! So much potential!',
        '💖 Sweet Love! A beautiful journey awaits!'
    ],
    low: [
        '💫 Interesting Match! Opposites attract!',
        '🌈 Give it time! Love can grow!',
        '🌙 Mysterious Connection! Explore it!',
        '⭐ Potential is there! Nurture it!',
        '🍀 Lucky to have found each other!',
        '💕 A beautiful beginning! Let love blossom!',
        '🌟 Stars are aligning! Be patient!'
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
        name: ['💕 Love is in the air...', '💑 Perfect match!', '❤️ Heartbeats sync!', '💞 True connection!'],
        dob: ['🌟 Destiny aligned!', '🎂 Stars match!', '💫 Written in the stars!', '🌙 Cosmic bond!'],
        friendship: ['🤗 Besties forever!', '🤝 Friends like family!', '💪 Unbreakable bond!', '🌟 True friendship!'],
        marriage: ['💍 Happily ever after!', '👰🤵 Perfect wedding!', '💞 Soulmates forever!', '💒 Dream wedding!'],
        mobile: ['📱 Digital destiny!', '💖 Connected hearts!', '✨ Cosmic connection!', '📲 Love calls!']
    };
    const list = subs[type] || subs.name;
    return list[Math.floor(Math.random() * list.length)];
}

// ============================================
// SHARE FUNCTION
// ============================================
function shareResult(type) {
    const resultBox = document.getElementById('result' + type.charAt(0).toUpperCase() + type.slice(1));
    const percent = resultBox.querySelector('.result-percent')?.textContent || '0%';
    const message = resultBox.querySelector('.result-message')?.textContent || 'Love is beautiful!';
    
    // Get names/inputs based on type
    let name1 = '', name2 = '';
    if (type === 'name') {
        name1 = document.getElementById('name1').value || '???';
        name2 = document.getElementById('name2').value || '???';
    } else if (type === 'friendship') {
        name1 = document.getElementById('friend1').value || '???';
        name2 = document.getElementById('friend2').value || '???';
    } else if (type === 'marriage') {
        name1 = document.getElementById('marry1').value || '???';
        name2 = document.getElementById('marry2').value || '???';
    } else if (type === 'mobile') {
        name1 = document.getElementById('mobile1').value || '???';
        name2 = document.getElementById('mobile2').value || '???';
    } else if (type === 'dob') {
        const d1 = document.getElementById('dob1').value || '???';
        const d2 = document.getElementById('dob2').value || '???';
        name1 = d1;
        name2 = d2;
    }

    const shareText = `💕 Love Calculator Result 💕\n\n${name1} ❤️ ${name2}\nLove Score: ${percent}\n${message}\n\n✨ Made with Love ❤️`;

    if (navigator.share) {
        navigator.share({
            title: 'Love Calculator Result',
            text: shareText,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('📋 Result copied to clipboard!');
        }).catch(() => {
            // Fallback
            prompt('Copy this result:', shareText);
        });
    }
    playSound('click');
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

function showResult(resultId, percent, message, subMessage, showShare = true) {
    const box = document.getElementById(resultId);
    if (!box) return;

    // Get current values for share
    box.classList.remove('pop');
    setTimeout(() => {
        box.innerHTML = `
            <div class="result-percent">${percent}%</div>
            <div class="result-message">${message}</div>
            <div class="result-sub">${subMessage}</div>
            ${showShare ? `<button class="share-result-btn" onclick="shareResult('${resultId.replace('result', '').toLowerCase()}')">
                <i class="fas fa-share-alt"></i> Share Result
            </button>` : ''}
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
        showResult('resultName', 0, '⚠️ Please enter both names!', '💕 Love needs two hearts 💕', false);
        return;
    }

    const percent = generatePercent(n1, n2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'name');
    showResult('resultName', percent, message, sub, true);
}

// ----- 2. LOVE BY DOB -----
function calculateByDOB() {
    const d1 = document.getElementById('dob1').value;
    const d2 = document.getElementById('dob2').value;

    if (!d1 || !d2) {
        showResult('resultDob', 0, '⚠️ Please select both dates!', '🎂 Choose your birth dates', false);
        return;
    }

    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diff = Math.abs(date2 - date1);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    let percent;
    if (days < 365) percent = 85 + Math.floor(Math.random() * 14);
    else if (days < 1095) percent = 65 + Math.floor(Math.random() * 20);
    else if (days < 3650) percent = 45 + Math.floor(Math.random() * 20);
    else percent = 25 + Math.floor(Math.random() * 25);
    percent = Math.min(percent, 99);

    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'dob');
    showResult('resultDob', percent, message, sub, true);
}

// ----- 3. FRIENDSHIP -----
function calculateFriendship() {
    const f1 = document.getElementById('friend1').value.trim();
    const f2 = document.getElementById('friend2').value.trim();

    if (!f1 || !f2) {
        showResult('resultFriendship', 0, '⚠️ Enter both names!', '🤝 Friendship needs two!', false);
        return;
    }

    const percent = generatePercent(f1, f2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'friendship');
    showResult('resultFriendship', percent, message, sub, true);
}

// ----- 4. MARRIAGE -----
function calculateMarriage() {
    const m1 = document.getElementById('marry1').value.trim();
    const m2 = document.getElementById('marry2').value.trim();

    if (!m1 || !m2) {
        showResult('resultMarriage', 0, '⚠️ Enter both names!', '💍 Marriage needs two souls!', false);
        return;
    }

    const percent = generatePercent(m1, m2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'marriage');
    showResult('resultMarriage', percent, message, sub, true);
}

// ----- 5. LOVE BY MOBILE -----
function calculateByMobile() {
    const m1 = document.getElementById('mobile1').value.trim();
    const m2 = document.getElementById('mobile2').value.trim();

    if (!m1 || !m2) {
        showResult('resultMobile', 0, '⚠️ Enter both numbers!', '📱 Mobile love needs digits!', false);
        return;
    }

    if (m1.length < 5 || m2.length < 5) {
        showResult('resultMobile', 0, '⚠️ Enter valid numbers!', '📱 Minimum 5 digits please', false);
        return;
    }

    const percent = generatePercent(m1, m2);
    const message = getLoveMessage(percent);
    const sub = getSubMessage(percent, 'mobile');
    showResult('resultMobile', percent, message, sub, true);
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

// ============================================
// AUTO-CALCULATE ON LOAD WITH DEFAULT VALUES
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    // Set default values for demo
    document.getElementById('name1').value = 'JAMES';
    document.getElementById('name2').value = 'CHARLOTTE';
    setTimeout(calculateByName, 500);
});

console.log('💕 Love Calculator Suite v3.0 Loaded! Made with ❤️');
