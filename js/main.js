


// Збереження позиції прокрутки перед оновленням
window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Відновлення позиції прокрутки після оновлення
window.addEventListener('load', function() {
  if (sessionStorage.getItem('scrollPosition') !== null) {
    window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition'), 10));
    sessionStorage.removeItem('scrollPosition');
  }
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


document.querySelector('.header__btn-mobile').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('menu__open');
});






document.querySelector('.header__btn').addEventListener('click',()=> {
    document.querySelector('.rightside__menu').classList.add('active')
})

document.querySelector('.rightside__menu-close').addEventListener('click',()=> {
    document.querySelector('.rightside__menu').classList.remove('active')
})

const swiper = new Swiper('.swiper__top', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    duration:2400,
    spaceBetween: 500,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  const swiper2 = new Swiper('.swiper__contact-gallery', {
    direction: 'horizontal',
    loop: true,
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },

});


  const swiper3 = new Swiper('.swiper-blog', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  const swiper4 = new Swiper('.swiper-blog__one', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  slidesPerView: 2,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });


  const mixer = mixitup('.gallery__inner', {
    load: {
      filter: '.living'
    }
  });




  Fancybox.bind("[data-fancybox]", {
    backFocus: false,
    iframe: {
      css: {
        width: '80%',
        height: '80%',

      }
    }
  });





