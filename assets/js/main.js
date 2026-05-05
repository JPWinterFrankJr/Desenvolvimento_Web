document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const menuLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section[id]');

  function updateThemeIcon() {
    if (!themeBtn) return;

    const icon = themeBtn.querySelector('i');

    if (!icon) return;

    if (body.classList.contains('dark')) {
      icon.className = 'bi bi-sun';
    } else {
      icon.className = 'bi bi-moon-stars';
    }
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('winter-theme');

    if (savedTheme === 'dark') {
      body.classList.add('dark');
    }

    updateThemeIcon();
  }

  function toggleTheme() {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
      localStorage.setItem('winter-theme', 'dark');
    } else {
      localStorage.setItem('winter-theme', 'light');
    }

    updateThemeIcon();
  }

  loadTheme();

  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar) {
        sidebar.classList.remove('open');
      }

      menuLinks.forEach(item => {
        item.classList.remove('active');
      });

      link.classList.add('active');
    });
  });

  function updateActiveSection() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  window.addEventListener('load', updateActiveSection);

  updateActiveSection();

  console.log('Winter Web carregado com sucesso.');
});