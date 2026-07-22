const animatedElements = document.querySelectorAll('.section-intro, .service-card, .process-list li, .assurance-item, .benefits-heading, .benefit-card, .contact-copy, .form-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  animatedElements.forEach(element => observer.observe(element));
} else {
  animatedElements.forEach(element => element.classList.add('reveal-visible'));
}
