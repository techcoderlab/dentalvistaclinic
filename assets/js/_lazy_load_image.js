const lazyloadImages = () => {
  // Initialize library
  lozad(".lozad", {
    threshold: 0.1,
    load: function (el) {
      const imageTag = el.getElementsByTagName("img");
      console.log(imageTag);
      console.log(el.dataset);
      // el.classList.add("image-skeleton");

      if (el.dataset.src) {
        imageTag.src = el.dataset.src;
      } else if (el.dataset.iesrc) {
        imageTag.src = el.dataset.iesrc;
      }
      if (el.dataset.alt) {
        imageTag.alt = el.dataset.alt;
      }

      el.onload = function () {
        // el.classList.remove("image-skeleton");
        el.classList.add("image-fade");
      };
    },
  }).observe();
};

export { lazyloadImages };
