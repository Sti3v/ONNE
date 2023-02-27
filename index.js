function swapImageAndGif() {
  const images = document.querySelectorAll(".swap-element");
  let timeout;

  images.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      const gif = image.getAttribute("data-gif");
      timeout = setTimeout(() => {
        image.style.transition = "transform 0.2s ease-out";
        Velocity(
          image,
          { scale: 1.2 },
          {
            duration: 200,
            easing: "ease-out",
            complete: () => {
              image.setAttribute("src", gif);
            },
          }
        );
      }, 500);
    });
    image.addEventListener("mouseleave", () => {
      clearTimeout(timeout);
      const src = image.getAttribute("src");
      const img = image.getAttribute("data-img");
      if (src !== img) {
        image.style.transition = "transform 0.2s ease-out";
        Velocity(
          image,
          { scale: 1.0 },
          {
            duration: 200,
            easing: "ease-out",
            complete: () => {
              image.setAttribute("src", img);
            },
          }
        );
      }
    });
  });
}

swapImageAndGif();

function preloadImages() {
  const images = document.querySelectorAll(".swap-element");
  for (let i = 0; i < images.length; i++) {
    const gif = images[i].getAttribute("data-gif");
    const img = new Image();
    img.src = gif;
  }
}

preloadImages();
