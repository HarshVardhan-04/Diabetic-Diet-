let currentIndex = 0;

function moveSlide(direction) {
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  // Update index
  currentIndex += direction;

  // Loop logic: If at the end, go back to start (and vice versa)
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  // Move the wrapper
  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}