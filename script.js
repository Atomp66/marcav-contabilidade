document.addEventListener('DOMContentLoaded', () => {

  // 1. ROLAGEM SUAVE COM DESCONTO DO CABEÇALHO FIXO
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignora links vazios ou sem ID
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Calcula a altura real da navbar fixa
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Fecha o menu mobile se estiver aberto
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // 2. INDICADOR DE SEÇÃO ATIVA NO MENU (SCROLLSPY)
  const sections = document.querySelectorAll('section[id], footer[id]');

  const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 0;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navHeight - 60;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);

  // 3. MENU HAMBÚRGUER MOBILE
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }
});