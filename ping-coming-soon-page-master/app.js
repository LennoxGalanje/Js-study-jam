const form = document.querySelector("#subscribeForm");

// Safety Check
if (form) {
  const input = form.querySelector("input[type='email']");
  const submitBtn = form.querySelector(".submit-button");
  const message = form.querySelector(".message");

  // Error Handler
  function setError(msg) {
    input.classList.add("invalid");
    message.textContent = msg;
    message.style.display = "block";
    message.classList.add("error-message");
    submitBtn.disabled = true;

    form.style.gap = window.matchMedia("(min-width: 992px)").matches
      ? "16px"
      : "20px";
  }

  // Success Handler
  function setSuccess(msg) {
    input.classList.add("valid");
    message.textContent = msg;
    message.style.display = "block";
    message.classList.add("success-message");
    submitBtn.disabled = false;

    form.style.gap = window.matchMedia("(min-width: 992px)").matches
      ? "16px"
      : "20px";
  }

  //ResetUI
  function resetUI() {
    input.classList.remove("valid", "invalid");
    message.classList.remove("error-message", "success-message");
    message.textContent = "";
    message.style.display = "none";
    submitBtn.disabled = false;
  }

  // Adding event listener to email input
  input.addEventListener("input", () => {
    const value = input.value.trim();
    const isEmpty = value === "";
    const isValueValid = input.validity.valid;

    input.classList.remove("valid", "invalid");
    message.classList.remove("error-message", "success-message");

    if (isEmpty) {
      setError("This field is required 📌");
    } else if (!isValueValid) {
      setError("Please provide a valid email address ⚠️");
    } else {
      setSuccess("Looks good! ✅");
    }
  });

  // Adding event listener to submit button
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetUI();
  });
}
