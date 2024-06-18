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

    
    const planet = document.createElement('div');
    planet.classList.add('planet');
    document.body.appendChild(planet);

    
    const moon = document.createElement('div');
    moon.classList.add('moon');
    document.body.appendChild(moon);

    
    const sun = document.createElement('div');
    sun.classList.add('sun');
    document.body.appendChild(sun);

    
    const risingSun = document.createElement('div');
    risingSun.classList.add('rising-sun');
    document.body.appendChild(risingSun);

    
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date('August 14, 2023').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = now - targetDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setTimeout(updateCountdown, 1000);
    };

    updateCountdown();
});

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

document.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    
    const scrollPercent = scrollPosition / (documentHeight - windowHeight);

    
    document.body.style.backgroundPosition = `0 ${Math.min(scrollPercent * 100, 100)}%`;

    
    if (scrollPosition > 200) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    
    const moon = document.querySelector('.moon');
    const nightTarget = document.getElementById('moon-target-night');
    const nightTargetPosition = nightTarget.getBoundingClientRect();

    const moonScrollPosition = scrollPosition + windowHeight / 2;

    if (moonScrollPosition >= nightTargetPosition.top + scrollPosition - windowHeight / 2) {
        moon.style.top = `${nightTargetPosition.top + scrollPosition + -30}px`; 
        moon.style.left = `${nightTargetPosition.left + nightTargetPosition.width / 2}px`;
        moon.classList.add('moon-rotate');
    } else {
        moon.classList.remove('moon-rotate');
        moon.style.top = `${moonScrollPosition}px`;
        moon.style.left = `50%`;
    }

    
    const sun = document.querySelector('.sun');
    const sunTarget = document.getElementById('sun-target');
    const sunTargetPosition = sunTarget.getBoundingClientRect();
    if (scrollPosition >= sunTargetPosition.top + scrollPosition - windowHeight / 2) {
        sun.classList.add('sun-visible');
        sun.style.bottom = `${-20 + scrollPercent * 120}%`;
    }

    
    const bigSun = document.querySelector('.big-sun');
    const bigSunTarget = document.querySelector('#sun-target');
    const bigSunTargetPosition = bigSunTarget.getBoundingClientRect();

    if (scrollPosition >= bigSunTargetPosition.top + scrollPosition - windowHeight / 2) {
        bigSun.classList.add('big-sun-visible');
    } else {
        bigSun.classList.remove('big-sun-visible');
    }

    
    const sunRiseSentence = document.querySelector('#sun-rise-sentence');
    const sunRiseSentencePosition = sunRiseSentence.getBoundingClientRect();

    const risingSun = document.querySelector('.rising-sun');

    if (scrollPosition >= sunRiseSentencePosition.top + scrollPosition - windowHeight / 2) {
        risingSun.style.position = 'fixed';
        risingSun.style.bottom = `${0}%`;
        risingSun.style.left = `${sunRiseSentencePosition.left - risingSun.offsetWidth}px`; 
        risingSun.classList.add('rising-sun-visible');
    } else {
        risingSun.classList.remove('rising-sun-visible');
    }

    
    if (scrollPosition + windowHeight >= sunRiseSentencePosition.top + scrollPosition) {
        risingSun.style.position = 'absolute';
        risingSun.style.top = `${sunRiseSentencePosition.top + scrollPosition}px`;
    }

    
    const sentences = document.querySelectorAll('.sentence');
    sentences.forEach(sentence => {
        const sentencePosition = sentence.getBoundingClientRect();
        if (scrollPosition + windowHeight >= sentencePosition.top + scrollPosition) {
            sentence.classList.add('sentence-visible');
        } else {
            sentence.classList.remove('sentence-visible');
        }
    });
}, 50));

document.addEventListener('DOMContentLoaded', () => {
    const sunRiseSentence = document.getElementById('sun-rise-sentence');
    const sun = document.createElement('div');
    sun.classList.add('sun');
    
    
    sun.style.top = '-50px';  
    sun.style.left = '0px';   

    sunRiseSentence.appendChild(sun);

    let angle = 0;

    const animateSun = () => {
        const radius = 80; 
        const x = radius * Math.cos(angle) - sun.offsetWidth / 2;
        const y = radius * Math.sin(angle) - sun.offsetHeight / 2;
        
        sun.style.transform = `translate(${x}px, ${y}px)`;
        
        angle += 0.01; 

        requestAnimationFrame(animateSun);
    };

    animateSun();
});
