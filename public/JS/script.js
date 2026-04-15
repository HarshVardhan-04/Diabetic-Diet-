// let currentIndex = 0;

// function moveSlide(direction) {
//   const slider = document.getElementById('slider');
//   const slides = document.querySelectorAll('.slide');
//   const totalSlides = slides.length;

//   // Update index
//   currentIndex += direction;

//   // Loop logic: If at the end, go back to start (and vice versa)
//   if (currentIndex >= totalSlides) {
//     currentIndex = 0;
//   } else if (currentIndex < 0) {
//     currentIndex = totalSlides - 1;
//   }

//   // Move the wrapper
//   const offset = -currentIndex * 100;
//   slider.style.transform = `translateX(${offset}%)`;
// }

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.getElementById('slider');

function moveSlide(direction) {
    currentSlide += direction;

    // Loop back logic
    if (currentSlide >= totalSlides) {
        currentSlide = 0; // Go back to first image
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Go to last image
    }

    // Apply the movement
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

// Auto-slide every 5 seconds
// We clear the interval if it already exists to prevent double-sliding
if (window.slideInterval) clearInterval(window.slideInterval);
window.slideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);