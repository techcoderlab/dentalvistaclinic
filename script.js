import { lazyloadImages } from "./assets/js/_lazy_load_image.js";

lazyloadImages();

/**
 * Selects elements based on the provided selector.
 * @param {string} selector - The CSS selector.
 * @returns {NodeList|Element} - A single element or a NodeList of matching elements.
 */
const _ = (selector) => document.querySelector(selector);
const __ = (selector) => document.querySelectorAll(selector);

const isMobile = {
  Android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: () => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const getWindowDimensions = () => {
  function getWindowWidth() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }

  function getWindowHeight() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }

  return [getWindowWidth(), getWindowHeight()];
};

const [width, height] = getWindowDimensions();

const OneColumnLayoutBreakpoint = 992;
const isOneColumnLayout = width < OneColumnLayoutBreakpoint;

/**
 * Handles main navigation functionality, including hamburger menu and scroll behavior.
 * @param {boolean} isOneColumnLayout - Indicates if the layout is a single column.
 */
const mainNavigation = (isOneColumnLayout) => {
  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  let supportsPassive = false;

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  try {
    window.addEventListener("test", null, { passive: true });
    supportsPassive = true;
  } catch (e) {}

  const wheelOpt = supportsPassive ? { passive: false } : false;
  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  function setScroll(enable) {
    const action = enable ? "removeEventListener" : "addEventListener";

    window[action]("DOMMouseScroll", preventDefault, false);
    window[action](wheelEvent, preventDefault, wheelOpt);
    window[action]("touchmove", preventDefault, wheelOpt);
    window[action]("keydown", preventDefaultForScrollKeys, false);
  }

  const hamburger = _(".hamburger");
  const navLinks = _(".menu-list");
  const links = __(".menu-item");

  const toggleFadeClass = () =>
    links.forEach((link) => link.classList.toggle("fade"));

  const toggleNavAndHamburger = () => {
    navLinks.classList.toggle("open");
    toggleFadeClass();
    hamburger.classList.toggle("toggle");

    navLinks.classList.contains("open") ? setScroll(false) : setScroll(true);
  };

  if (isOneColumnLayout)
    links.forEach((link) =>
      link.addEventListener("click", toggleNavAndHamburger)
    );

  hamburger.addEventListener("click", toggleNavAndHamburger);
};

mainNavigation(isOneColumnLayout);
