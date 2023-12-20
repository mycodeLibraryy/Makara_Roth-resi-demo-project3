

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  /**
  * Easy on scroll event listener 
  */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  /**
 * Scrolls to an element with header offset
 */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  on('click', '.fa-bars', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('.fa-bars')
  })

  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.fa-bars')
        navbarToggle.classList.toggle('.fa-bars')
      }
      scrollto(this.hash)
    }
  }, true)

  document.addEventListener('DOMContentLoaded', function () {
    // Create Isotope instance outside the click event listener
    var iso = new Isotope('.gallery', {});

    var filterItems = document.querySelectorAll('.filtering span');

    filterItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });

        // Update the class 'active' for clicked item and its siblings
        filterItems.forEach(function (sibling) {
          if (sibling === item) {
            sibling.classList.add('active');
          } else {
            sibling.classList.remove('active');
          }
        });
      });
    });
  });

})()