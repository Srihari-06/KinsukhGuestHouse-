// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animate stats counters
function animateCounters() {
    const bookingsCount = document.getElementById('bookingsCount');
    const customersCount = document.getElementById('customersCount');
    const roomsCount = document.getElementById('roomsCount');
    const yearsCount = document.getElementById('yearsCount');

    animateValue(bookingsCount, 0, 100, 2000);
    animateValue(customersCount, 0, 150, 2000);
    animateValue(roomsCount, 0, 10, 2000);
    animateValue(yearsCount, 0, 5, 2000);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = end > 100 ? value + '+' : value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger stats animation when section is in view
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);
// Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let intervalId;

    // Function to show slide
    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    // Next slide function
    function nextSlide() {
        let newIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(newIndex);
    }

    // Previous slide function
    function prevSlide() {
        let newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(newIndex);
    }

    // Auto-rotate carousel
    function startCarousel() {
        intervalId = setInterval(nextSlide, 5000);
    }

    // Stop auto-rotation when user interacts
    function stopCarousel() {
        clearInterval(intervalId);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopCarousel();
        startCarousel();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopCarousel();
        startCarousel();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });

    // Start the carousel
    startCarousel();

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    // Your existing JavaScript remains the same
    // Mobile menu, header scroll, etc.
});