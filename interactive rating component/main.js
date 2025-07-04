if (document.querySelector(".rating__form")) {
    const form = document.getElementById("ratingForm");
    const ratingButtons = document.querySelectorAll(".rating__button");
  
    // Highlight selected rating
    ratingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // We are removing "active" class from all buttons
        ratingButtons.forEach((otherButton) =>
          otherButton.classList.remove("active")
        );
  
        // We are adding the "active" class when one is clicked
        button.classList.add("active");
  
        // We need to automatically check the radio button
        const input = button.querySelector("rating__input");
        if (input) {
          input.checked = true;
        }
      });
    });
  
    // Form submmision block
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // This prevents us from reloading the page/screen
  
      const selectedRating = form.querySelector(".rating__input:checked");
  
      if (selectedRating) {
        const ratingValue = selectedRating.value;
  
        // Save value in localStorage
        localStorage.setItem("userRating", ratingValue);
  
        // We need to redirect to thanks.html
        window.location.href = "thanks.html";
      }
    });
  }
  
  // Check if we're on the thanks.html page
  if (document.querySelector(".thanks__container")) {
    window.addEventListener("DOMContentLoaded", () => {
      const ratingNumSpan = document.querySelector(".thanks__rating-number");
  
      // We need to get the input value from localStorage
      const rating = localStorage.getItem("userRating") || "";
  
      ratingNumSpan.textContent = rating;
    });
  }