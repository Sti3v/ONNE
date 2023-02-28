function preloadImages() {
  let images = document.querySelectorAll(".swap-element");
  
  for (let i = 0; i < images.length; i++) {
    let gif = images[i].getAttribute("data-gif");
    let img = new Image();
    img.src = gif;
  }
}

// Swap image on mouse enter and leave event listeners
function swapImageAndGif() {
  let images = document.querySelectorAll(".swap-element");
  let timeout;
  
  // Add MouseEnter Event Listener
  images.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      let gif = image.getAttribute("data-gif");
      timeout = setTimeout(() => {
        image.style.transition = "transform 0.2s ease-out";
        Velocity(
          image,
          { scale: 1.2 },
          {
            duration: 500,
            easing: "ease-out",
            complete: () => {
              image.setAttribute("src", gif);
            },
          }
        );
      }, 200);
    });
    
    // Add MouseLeave Event Listener
    image.addEventListener("mouseleave", () => {
      clearTimeout(timeout);
      
      let src = image.getAttribute("src");
      let img = image.getAttribute("data-img");
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

// Call the swap image and preload image functions
function imageSwapAndPreload() {
  preloadImages();
  swapImageAndGif();
}

imageSwapAndPreload();
