function swapImageAndGif() {
  const images = document.querySelectorAll(".swap-element");
  images.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      const gif = image.getAttribute("data-gif");
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
    });
    image.addEventListener("mouseleave", () => {
      const src = image.getAttribute("src");
      const img = image.getAttribute("data-img");
      if (src !== img) {
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
