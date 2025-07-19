 // Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Product filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value from data attribute
        const filterValue = this.dataset.filter;
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategory = card.dataset.category;
                if (cardCategory.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Slider
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevSlideBtn = document.querySelector('.prev-slide');
const nextSlideBtn = document.querySelector('.next-slide');
let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Trigger animation for hero content
    const heroContent = slides[currentSlide].querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 50);
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners for navigation
nextSlideBtn.addEventListener('click', nextSlide);
prevSlideBtn.addEventListener('click', prevSlide);

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideInterval();
    });
});

// Auto slide
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Gallery Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal-close');
const modalPrevBtn = document.querySelector('.modal-prev');
const modalNextBtn = document.querySelector('.modal-next');

// Get all gallery items and images
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));

let currentImageIndex = 0;

// Open modal when clicking on gallery images or links
galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-img');
    const link = item.querySelector('.gallery-link');
    
    img.addEventListener('click', () => openModal(index));
    link.addEventListener('click', () => openModal(index));
});

function openModal(index) {
    currentImageIndex = index;
    updateModal();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function updateModal() {
    const currentItem = galleryItems[currentImageIndex];
    const imgSrc = currentItem.querySelector('.gallery-img').src;
    const imgAlt = currentItem.querySelector('.gallery-img').alt;
    
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
}

// Close modal
closeModal.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Navigation functions for modal
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModal();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModal();
}

// Event listeners for modal navigation
modalPrevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevImage();
});

modalNextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextImage();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// Gallery hover effect
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        item.querySelector('.gallery-img').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
        item.querySelector('.gallery-img').style.transform = 'scale(1)';
    });
});

// Scroll animations using Intersection Observer
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate elements within the section
            const featureItems = entry.target.querySelectorAll('.feature-item');
            const productCards = entry.target.querySelectorAll('.product-card');
            const featureBoxes = entry.target.querySelectorAll('.feature-box');
            const galleryItems = entry.target.querySelectorAll('.gallery-item');
            const contactCards = entry.target.querySelectorAll('.contact-card');
            const socialLinks = entry.target.querySelectorAll('.social-link');
            
            if (featureItems.length > 0) {
                featureItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            if (productCards.length > 0) {
                productCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            if (featureBoxes.length > 0) {
                featureBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            if (galleryItems.length > 0) {
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            if (contactCards.length > 0) {
                contactCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            if (socialLinks.length > 0) {
                socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // For contact form
            const contactForm = entry.target.querySelector('.contact-form');
            if (contactForm) {
                setTimeout(() => {
                    contactForm.style.opacity = '1';
                    contactForm.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start slider
    showSlide(0);
    startSlideInterval();
    
    // Initialize filter to show all products
    document.querySelector('.filter-btn[data-filter="all"]').click();
});