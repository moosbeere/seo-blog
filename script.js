// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });

  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Добавление класса активной ссылке в навигации
const currentPage = window.location.pathname.split('/').pop();
const navItems = document.querySelectorAll('.nav a');

navItems.forEach(item => {
  const itemHref = item.getAttribute('href');
  if (itemHref === currentPage || 
      (currentPage === '' && itemHref === 'index.html')) {
    item.classList.add('active');
    item.style.color = 'var(--secondary-color)';
    item.style.fontWeight = '600';
  }
});

// Анимация появления элементов при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});
