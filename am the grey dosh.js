let currentIndex = 0;
const images = [];

// Initialize lightbox when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Collect all images from project-detail
  document.querySelectorAll(".project-detail img").forEach((img, index) => {
    images.push({
      src: img.src,
      alt: img.alt,
    });

    // Add click handler to each image
    img.addEventListener("click", () => openLightbox(index));
  });

  // Add click handler to close lightbox when clicking outside
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.classList.contains("lightbox-overlay")) {
      closeLightbox();
    }
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("lightbox").style.display === "block") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") changeImage(-1);
      if (e.key === "ArrowRight") changeImage(1);
    }
  });
});

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  document.getElementById("lightbox").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "auto";
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const currentImage = images[currentIndex];

  lightboxImg.src = currentImage.src;
  lightboxImg.alt = currentImage.alt;
  lightboxCaption.textContent = currentImage.alt;
}
