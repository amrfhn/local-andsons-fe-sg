import anime from 'animejs/lib/anime.es.js'

const logoOpacity = () => {
  //Handle & Logo opacity
  let scrollPosition = window.scrollY
  const sonsLogo = document.querySelector('.sons-logo')

  if (sonsLogo) {
    if (scrollPosition <= 50) {
      sonsLogo.style.opacity = 1
    } else if (scrollPosition > 200) {
      sonsLogo.style.opacity = 0
    } else {
      sonsLogo.style.opacity = 1 / (scrollPosition / 45)
    }
  }

  // Handle floating logo opacity
  // const floatingLogo = document.querySelector(".floating-logo");
  // const otherContent = document.querySelector("#other-content");
  // let otherContentRect = otherContent.getBoundingClientRect();

  // if (otherContentRect.top <= 100) {
  //   floatingLogo.style.opacity = (otherContentRect.top / 100);
  // }

  //Handle Hair Logo opacity
  const hairSection = document.querySelector('#hair-section')
  const hairLogo = document.querySelector('.hair-logo')
  let hairRect = hairSection.getBoundingClientRect()
  // const hairNavItem = document.querySelector("#hair-nav-item a");

  if (hairRect.top < 4) {
    hairLogo.style.opacity = 1
    // reset();
    // hairNavItem.classList.add("active-section");
  } else {
    hairLogo.style.opacity = 1 / parseInt(hairRect.top)

    // hairNavItem.classList.remove("active-section");
  }

  //Handle Sex Logo Opacity
  const sexSection = document.querySelector('#sex-section')
  const sexLogo = document.querySelector('.sex-logo')
  let sexRect = sexSection.getBoundingClientRect()
  // const sexNavItem = document.querySelector("#sex-nav-item a");

  if (sexRect.top < 4) {
    sexLogo.style.opacity = 1
    // reset();
    // sexNavItem.classList.add("active-section");
  } else {
    sexLogo.style.opacity = 1 / parseInt(sexRect.top)
  }

  //Handle Skin Logo Opacity
  const skinSection = document.querySelector('#skin-section')
  const skinLogo = document.querySelector('.skin-logo')
  let skinRect = skinSection.getBoundingClientRect()
  // const skinNavItem = document.querySelector("#skin-nav-item a");

  if (skinRect.top < 4) {
    skinLogo.style.opacity = 1
    // reset();
    // skinNavItem.classList.add("active-section");
  } else {
    skinLogo.style.opacity = 1 / parseInt(skinRect.top)
  }

  //Handle Mind Logo Opacity
  const mindSection = document.querySelector('#mind-section')
  const mindLogo = document.querySelector('.mind-logo')
  let mindRect = mindSection.getBoundingClientRect()
  // const mindNavItem = document.querySelector("#mind-nav-item a");

  if (mindRect.top < 4) {
    mindLogo.style.opacity = 1
    // reset();
    // mindNavItem.classList.add("active-section");
  } else {
    mindLogo.style.opacity = 1 / parseInt(mindRect.top)
  }

  const otherSection = document.querySelector('#other-content')
  let otherRect = otherSection.getBoundingClientRect()
  if (otherRect.top < 4) {
    // reset();
  }
}

const parallaxEffect = () => {
  //Parallax effect
  // const main = document.querySelector("#main-section");
  // let mainRect = main.getBoundingClientRect();
  let slowCards = document.querySelectorAll('.card-parallax-slow')
  let mediumCards = document.querySelectorAll('.card-parallax-medium')
  let fastCards = document.querySelectorAll('.card-parallax-fast')

  if (window.outerWidth >= 1024) {
    slowCards.forEach((card) => {
      const boundingRect = card.getBoundingClientRect()
      // card.style.transform = `translateY(${boundingRect.top -
      // boundingRect.top / 1.1}px)`;
      anime({
        targets: card,
        translateY: boundingRect.top - boundingRect.top / 1.1,
        duration: 200,
        easing: 'easeOutCubic'
      })
    })

    mediumCards.forEach((card) => {
      const boundingRect = card.getBoundingClientRect()
      // card.style.transform = `translateY(${boundingRect.top -
      // boundingRect.top / 1.15}px)`;
      anime({
        targets: card,
        translateY: boundingRect.top - boundingRect.top / 1.2,
        duration: 200,
        easing: 'easeOutCubic'
      })
    })

    fastCards.forEach((card) => {
      const boundingRect = card.getBoundingClientRect()
      // card.style.transform = `translateY(${boundingRect.top -
      // boundingRect.top / 1.2}px)`;
      anime({
        targets: card,
        translateY: boundingRect.top - boundingRect.top / 1.3,
        duration: 200,
        easing: 'easeOutCubic'
      })
    })
  }
}

const scrollTop = () => {
  // if (window.outerWidth < 1024) {
  let windowPosition = window.scrollY

  if (windowPosition > 300) {
    document.querySelector('.scroll-up-container').style.display = 'block'
  } else {
    document.querySelector('.scroll-up-container').style.display = 'none'
  }
  // }
}

const windowResize = () => {
  if (window.outerWidth < 1024) {
    document.querySelector('.scroll-up-container').style.display = 'block'
  } else {
    document.querySelector('.scroll-up-container').style.display = 'none'
  }
}

// const reset = () => {
// 	document.querySelector("#hair-nav-item a").classList.remove("active-section");
// 	document.querySelector("#sex-nav-item a").classList.remove("active-section");
// 	document.querySelector("#skin-nav-item a").classList.remove("active-section");
// 	document.querySelector("#mind-nav-item a").classList.remove("active-section");
// };

const submitAnimation = () => {
  const button = document.querySelector('#subcribeButton')
  button.addEventListener('click', updateButtonMsg)
}

const updateButtonMsg = () => {
  const button = document.querySelector('#subcribeButton')
  button.classList.add('state-1', 'animated')
}

const errorButtonMsg = () => {
  const button = document.querySelector('#subcribeButton')
  button.classList.add('state-3')

  const setInitialButtonState = function() {
    button.classList.remove('state-1', 'state-2', 'state-3', 'animated')
  }

  setTimeout(setInitialButtonState, 2000)
}

const finalButtonMsg = function() {
  const button = document.querySelector('#subcribeButton')
  button.classList.add('state-2')

  const setInitialButtonState = function() {
    button.classList.remove('state-1', 'state-2', 'animated')
  }

  setTimeout(setInitialButtonState, 2000)
}

const toggleSideNav = () => {
  const sideMenu = document.querySelector('.side-menu')

  if (sideMenu.classList.contains('open')) {
    sideMenu.classList.remove('open')
    setTimeout(() => {
      sideMenu.style.display = 'none'
    }, 600)
  } else {
    sideMenu.style.display = 'block'
    setTimeout(() => {
      sideMenu.classList.add('open')
    }, 10)
  }
}

export default {
  logoOpacity,
  parallaxEffect,
  scrollTop,
  windowResize,
  submitAnimation,
  toggleSideNav,
  updateButtonMsg,
  finalButtonMsg,
  errorButtonMsg
}
