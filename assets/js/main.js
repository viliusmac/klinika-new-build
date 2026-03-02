(function() {
  "use strict";

  const swiper = new Swiper('.doctors-swiper', {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2
      },
      576: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });

  GLightbox({
    selector: '.glightbox',
    descPosition: 'bottom'
  });

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  document.querySelectorAll('.navmenu li.dropdown > a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === null) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        const dropdown = this.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('dropdown-active');
      }
    }, true);
  });


  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  
  window.addEventListener('load', aosInit);
  document.addEventListener('DOMContentLoaded', aosInit);
  
  window.addEventListener('hashchange', function() {
    setTimeout(aosInit, 100);
  });

  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });


  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  function initTeamCarousel() {
    const isotope = document.querySelector('.isotope-layout');
    if (!isotope) return;
    const originalItems = Array.from(isotope.querySelectorAll('.isotope-item'));
    if (originalItems.length === 0) return;
    let currentItems = originalItems.slice();

    function detectPerSlide() {
      const w = window.innerWidth;
      return (w < 576) ? 2 : 3;
    }
    const parent = isotope.parentNode;

    const filtersEl = isotope.querySelector('.portfolio-filters');
    let filtersClone = null;
    if (filtersEl) {
      filtersClone = filtersEl.cloneNode(true);
      parent.insertBefore(filtersClone, isotope);
    }

    function buildCarousel(fromItems) {
      const perSlide = detectPerSlide();
      const carousel = document.createElement('div');
      carousel.id = 'komandaCarousel';
      carousel.className = 'carousel slide';
      carousel.setAttribute('data-bs-ride','carousel');
      const inner = document.createElement('div');
      inner.className = 'carousel-inner';

      for (let i = 0; i < fromItems.length; i += perSlide) {
        const slide = document.createElement('div');
        slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
        const slice = fromItems.slice(i, i + perSlide);
        const row = document.createElement('div');
        row.className = 'row gy-4' + (slice.length < perSlide ? ' justify-content-center' : '');
        slice.forEach(it => {
          const clone = it.cloneNode(true);
          clone.className = 'col-6 col-sm-6 col-md-4 portfolio-item';
          row.appendChild(clone);
        });
        slide.appendChild(row);
        inner.appendChild(slide);
      }

      carousel.appendChild(inner);
      const prev = document.createElement('button');
      prev.className = 'team-carousel-control team-prev';
      prev.type = 'button';
      prev.setAttribute('aria-label', 'Previous');
      prev.innerHTML = '<i class="bi bi-chevron-left" aria-hidden="true"></i>';

      const next = document.createElement('button');
      next.className = 'team-carousel-control team-next';
      next.type = 'button';
      next.setAttribute('aria-label', 'Next');
      next.innerHTML = '<i class="bi bi-chevron-right" aria-hidden="true"></i>';

      carousel.appendChild(prev);
      carousel.appendChild(next);

      const existing = document.getElementById('komandaCarousel');
      if (existing) parent.replaceChild(carousel, existing);
      else parent.replaceChild(carousel, isotope);

      const el = document.getElementById('komandaCarousel');
      try {
        if (el && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
          try { el.bsCarousel && el.bsCarousel.dispose(); } catch(e){}
          const instance = new bootstrap.Carousel(el, { interval: 8000, pause: 'hover', ride: 'carousel', wrap: true });
          el.bsCarousel = instance;
          const prevBtn = el.querySelector('.team-prev');
          const nextBtn = el.querySelector('.team-next');
          if (prevBtn) prevBtn.addEventListener('click', () => instance.prev());
          if (nextBtn) nextBtn.addEventListener('click', () => instance.next());
        }
      } catch (e) {
        console.warn('Bootstrap carousel init failed', e);
      }
    }

    currentItems = originalItems.slice();
    buildCarousel(currentItems);

    let resizeTimer = null;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        buildCarousel(currentItems);
      }, 200);
    });

    const filtersNode = filtersClone || document.querySelector('.portfolio-filters');
    if (filtersNode) {
      const lis = filtersNode.querySelectorAll('li');
      lis.forEach(li => {
        li.addEventListener('click', function() {
          lis.forEach(x => x.classList.remove('filter-active'));
          this.classList.add('filter-active');
          const filter = this.getAttribute('data-filter');
          let filtered;
          if (filter === '*') filtered = originalItems.slice();
          else {
            const cls = filter.replace('.', '');
            filtered = originalItems.filter(it => it.classList.contains(cls));
          }
          if (filtered.length === 0) filtered = originalItems.slice();
          currentItems = filtered.slice();
          buildCarousel(currentItems);
        });
      });
    }
  }

  window.addEventListener('load', initTeamCarousel);


  document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  });

})();