// ===== DOM ELEMENTS =====
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const calculateBtn = document.getElementById('calculateBtn');
const progressCircle = document.getElementById('progressCircle');
const percentText = document.getElementById('percentText');
const loveMessage = document.getElementById('loveMessage');
const loveSubMessage = document.getElementById('loveSubMessage');
const shareBtn = document.getElementById('shareBtn');
const resetBtn = document.getElementById('resetBtn');
const quoteText = document.getElementById('quoteText');

// ===== LOVE QUOTES =====
const quotes = [
    '💬 "Love is when the other person\'s happiness is more important than your own."',
    '💬 "The best thing to hold onto in life is each other."',
    '💬 "Love is not about how many days together, but how much you love each other every day."',
    '💬 "True love is finding someone who knows all your flaws and still loves you more."',
    '💬 "You don\'t love someone for their looks, or their clothes, or their car. You love them because they sing a song only your heart can hear."',
    '💬 "Love is composed of a single soul inhabiting two bodies."',
    '💬 "Where there is love there is life."',
    '💬 "Love is the bridge between two hearts."',
];

// ===== RANDOM QUOTE ON LOAD =====
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// ===== LOVE CALCULATOR LOGIC =====
function calculateLove(name1Val, name2Val) {
    if (!name1Val || !name2Val) {
        return { percent: 0, message: '💕 Enter both names!', subMessage: 'Type names to see the magic ✨' };
    }

    // Simple but fun algorithm
    const combined = (name1Val + name2Val).toUpperCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = (hash * 31 + combined.charCodeAt(i)) % 1000;
    }
    // Base percent from hash
    let percent = (hash % 71) + 20; // 20% to 90%

    // Bonus based on length and common letters
    const commonLetters = [...name1Val.toUpperCase()].filter(ch => name2Val.toUpperCase().includes(ch)).length;
    const bonus = Math.min(commonLetters * 2, 10);
    percent = Math.min(percent + bonus, 99);

    // Get message based on percent
    let message, subMessage;
    if (percent >= 80) {
        message = '🔥 Incredible Love! Together you are invincible!';
        subMessage = '💞 A match made in heaven!';
    } else if (percent >= 60) {
        message = '💖 Elevated Compatibility! Solid relationship and deep love!';
        subMessage = '🌟 You two are a beautiful couple!';
    } else if (percent >= 40) {
        message = '💕 Good Connection! There is potential here!';
        subMessage = '🌱 Nurture this love, it can grow!';
    } else if (percent >= 20) {
        message = '💫 Interesting Match! Opposites can attract!';
        subMessage = '✨ Give it time, love may blossom!';
    } else {
        message = '💔 Not a perfect match, but love is unpredictable!';
        subMessage = '🌈 Sometimes the best love stories are unexpected!';
    }

    return { percent, message, subMessage };
}

// ===== UPDATE UI =====
function updateResult(percent, message, subMessage) {
    // Update circle
    const circumference = 314.16;
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Update text
    percentText.textContent = percent + '%';
    loveMessage.textContent = message;
    loveSubMessage.textContent = subMessage;

    // Color change based on percent
    let color;
    if (percent >= 80) color = '#e91e63';
    else if (percent >= 60) color = '#f06292';
    else if (percent >= 40) color = '#ec407a';
    else if (percent >= 20) color = '#f48fb1';
    else color = '#b0bec5';

    progressCircle.style.stroke = color;
    percentText.style.fill = color;
}

// ===== CALCULATE =====
function handleCalculate() {
    const val1 = name1.value.trim() || 'UNKNOWN';
    const val2 = name2.value.trim() || 'UNKNOWN';
    const { percent, message, subMessage } = calculateLove(val1, val2);
    updateResult(percent, message, subMessage);
}

// ===== SHARE =====
function handleShare() {
    const p = percentText.textContent;
    const msg = loveMessage.textContent;
    const n1 = name1.value.trim() || '???';
    const n2 = name2.value.trim() || '???';

    const shareText = `💕 Love Calculator Result 💕\n\n${n1} ❤️ ${n2}\nLove Score: ${p}\n${msg}\n\nMade with ❤️`;

    if (navigator.share) {
        navigator.share({
            title: 'Love Calculator Result',
            text: shareText,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('📋 Result copied to clipboard! Share it with your love!');
        }).catch(() => {
            // Fallback
            prompt('Copy this result:', shareText);
        });
    }
}

// ===== RESET =====
function handleReset() {
    name1.value = '';
    name2.value = '';
    updateResult(0, '💕 Enter both names!', 'Type names to see the magic ✨');
    progressCircle.style.stroke = '#e91e63';
    percentText.style.fill = '#333';
    // Random quote
    quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// ===== EVENT LISTENERS =====
calculateBtn.addEventListener('click', handleCalculate);

// Enter key support
name1.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleCalculate(); });
name2.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleCalculate(); });

shareBtn.addEventListener('click', handleShare);
resetBtn.addEventListener('click', handleReset);

// ===== AUTO CALCULATE ON LOAD WITH DEFAULT VALUES =====
window.addEventListener('DOMContentLoaded', () => {
    handleCalculate();
});
