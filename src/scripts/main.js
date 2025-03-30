"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 1;
  let intervalId;

  const sliderImages = document.getElementsByClassName("slider__img");
  const prevButton = document.querySelector(".slider__button--prev");
  const nextButton = document.querySelector(".slider__button--next");
  const links = document.querySelectorAll(".autofocus-link");
  const contactForm = document.getElementById("contact-form");
  const firstInput = contactForm?.querySelector("input:first-of-type");

  function changeSlide(n) {
    showSlide((slideIndex += n));
  }

  function showSlide(n) {
    if (!sliderImages.length) return;

    if (n > sliderImages.length) slideIndex = 1;
    if (n < 1) slideIndex = sliderImages.length;

    Array.from(sliderImages).forEach((img) => {
      img.style.display = "none";
    });

    sliderImages[slideIndex - 1].style.display = "block";
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(() => changeSlide(1), 5000);
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      stopAutoPlay();
      changeSlide(-1);
    });

    nextButton.addEventListener("click", () => {
      stopAutoPlay();
      changeSlide(1);
    });
  }

  if (links.length && contactForm && firstInput) {
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.hash = "contact-form";
        firstInput.focus();
        contactForm.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });
  }

  showSlide(slideIndex);
  startAutoPlay();
});
