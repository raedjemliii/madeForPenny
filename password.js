document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.createElement('div');
    starContainer.classList.add('stars');
    document.body.appendChild(starContainer);

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starContainer.appendChild(star);
    }

const form = document.getElementById('password-form');
    form.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const errorMessage = document.getElementById('error');

    if (password === '011808') { 
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('password', password);
        }
        window.location.href = 'indexmain.html';
    } else {
        errorMessage.style.display = 'flex';
    }
});

    if (localStorage.getItem('password') === '011808') {
        window.location.href = 'indexmain.html';
    }
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'password') {
        toggleIcon.src = 'See No Evil Monkey Emoji.png';
    } else {
        toggleIcon.src = 'Hear No Evil Monkey Emoji.png';
    }

    toggleIcon.classList.add('animate-icon');
    setTimeout(() => {
        toggleIcon.classList.remove('animate-icon');
    }, 300);
}

function closeErrorMessage() {
    const errorMessage = document.getElementById('error');
    errorMessage.style.display = 'none';
}
