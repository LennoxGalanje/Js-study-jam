const faqItems = document.querySelectorAll(".faq-accordion__item");

faqItems.forEach((item) => {
  const questionButton = item.querySelector(".faq-accordion__question");
  const answerDiv = item.querySelector(".faq-accordion__answer");
  const questionDiv = item.querySelector(".faq-accordion__icon");

  questionButton.addEventListener("click", () => {
    // Close all other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        const otherAnswer = otherItem.querySelector(".faq-accordion__answer");
        const otherIcon = otherItem.querySelector(".faq-accordion__icon");
        const otherButton = otherItem.querySelector(".faq-accordion__question");

        otherAnswer.classList.remove("faq-accordion__answer--open");
        otherIcon.textContent = "+";
        otherButton.setAttribute("aria-expanded", false);
      }
    });

    // Toggle the clicked item
    const isOpen = answerDiv.classList.toggle("faq-accordion__answer--open");
    questionButton.setAttribute("aria-expanded", isOpen);
    questionDiv.textContent = isOpen ? "-" : "+";
  });
});
