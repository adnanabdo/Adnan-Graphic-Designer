document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const icon = document.querySelector('.icon');
  const links = document.querySelector('.links ul');
  
  icon.addEventListener('click', function() {
    links.classList.toggle('show');
    
    // Animate hamburger icon
    const spans = icon.querySelectorAll('span');
    if (links.classList.contains('show')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'rotate(0deg)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0deg)';
    }
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.links ul li a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('show');
      const spans = icon.querySelectorAll('span');
      spans[0].style.transform = 'rotate(0deg)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0deg)';
    });
  });
  
  // Slider Functionality
  const slides = document.querySelectorAll('.slider-container div');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const paginations = document.getElementById('paginations');
  const slideNumber = document.getElementById('slide-number');
  let currentSlide = 0;
  
  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    paginations.appendChild(dot);
  });
  
  // Initialize slider
  function initSlider() {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    
    // Update pagination
    document.querySelectorAll('.paginations span').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update slide number
    slideNumber.textContent = `${currentSlide + 1} / ${slides.length}`;
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    initSlider();
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    initSlider();
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    initSlider();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto slide every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto slide on hover
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Initialize slider
  initSlider();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section, .aboutme, .services, .gallery');
  const navLinks = document.querySelectorAll('.links ul li a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Gallery lightbox effect (simple version)
  document.querySelectorAll('.gallery div').forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      alert(`Viewing full image: ${imgSrc}\n\nIn a complete implementation, this would open a lightbox gallery.`);
    });
  });
});