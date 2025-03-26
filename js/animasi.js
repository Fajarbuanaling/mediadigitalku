// Add more interactivity
document.addEventListener('DOMContentLoaded', function() {
    const shoppingAnimation = lottie.loadAnimation({
        container: document.getElementById('shopping-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_hu9cd9.json'
    });

    // Pause and play on click
    let isPlaying = true;
    document.getElementById('shopping-animation').addEventListener('click', () => {
        if (isPlaying) {
            shoppingAnimation.pause();
        } else {
            shoppingAnimation.play();
        }
        isPlaying = !isPlaying;
    });

    // Animate on scroll
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroOffset = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;

        if (scrollPosition > heroOffset && scrollPosition < heroOffset + heroHeight) {
            shoppingAnimation.play();
        } else {
            shoppingAnimation.pause();
        }
    });

    // Smooth entrance animation
    const animationContainer = document.getElementById('shopping-animation');
    animationContainer.style.opacity = '0';
    animationContainer.style.transform = 'translateY(20px)';

    setTimeout(() => {
        animationContainer.style.transition = 'all 1s ease';
        animationContainer.style.opacity = '1';
        animationContainer.style.transform = 'translateY(0)';
    }, 500);
});