const form = document.querySelector("#contactForm");

// Safety Check
if (form) {
  const inputs = form.querySelectorAll(
    'input[type="text"], input[type="email"], textarea'
  );
  const checkbox = form.querySelector('input[type="checkbox"]');
  const radios = form.querySelectorAll('input[name="query"]');
  const submitButton = form.querySelector(".submit-button");
  const popup = form.querySelector(".popup-content");

  // Strings :: Names, Email & Textarea
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateStringInput(input);
      updateSubmitButton();
    });
  });

  // Checkbox
  checkbox.addEventListener("change", () => {
    validateCheckInput(checkbox);
    updateSubmitButton();
  });

  // Radios
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      validateRadioInput();
      updateSubmitButton();
    });
  });

  // Validate Strings :: Names, Email & Textarea
  function validateStringInput(input) {
    const wrapper =
      input.closest(".name-wrapper") ||
      input.closest(".email-wrapper") ||
      input.closest(".message-wrapper");
    const message = wrapper.querySelector(".message");
    const value = input.value.trim();
    let isValid = true;

    input.classList.remove("valid", "invalid");
    message.classList.remove("error-message", "success-message");
    message.textContent = "";
    message.style.display = "none";

    if (value === "") {
      setError("This field is required.");
    } else if (["first-name", "last-name"].includes(input.name)) {
      if (value.length < 2) {
        setError("Name must be at least 2 characters long.");
      } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(value)) {
        setError("Name must only contain letters.");
      } else {
        setSuccess("Looks good!");
      }
    } else if (input.name === "message-input") {
      if (value.length > 2200) {
        setError("Message must be less than 2200 characters long.");
      } else {
        setSuccess("Looks good!");
      }
    } else if (input.type === "email") {
      const isEmailValid = input.validity.valid;

      if (!isEmailValid) {
        setError("Please enter a valid email address.");
      } else {
        setSuccess("Looks good!");
      }
    } else {
      setSuccess("Looks good!");
    }

    function setError(sms) {
      isValid = false;
      input.classList.add("invalid");
      message.classList.add("error-message");
      message.style.display = "block";
      message.textContent = sms;
    }

    function setSuccess(sms) {
      isValid = true;
      input.classList.add("valid");
      message.classList.add("success-message");
      message.style.display = "block";
      message.textContent = sms;
    }
    return isValid;
  }

  //   Validate radio buttons
  function validateRadioInput() {
    const selectedRadio = form.querySelector('input[name="query"]:checked');
    const wrapper = radios[0].closest(".form-query-wrapper");
    const message = wrapper.querySelector(".message");
    const queryButton = form.querySelectorAll(".query-button");

    queryButton.forEach((label) => {
      label.classList.remove("valid", "invalid");
    });
    message.classList.remove("error-message", "success-message");
    message.textContent = "";
    message.style.display = "none";

    if (selectedRadio) {
      const selectedLabel = selectedRadio.closest(".query-button");
      selectedLabel.classList.add("valid");
      message.classList.add("success-message");
      message.style.display = "block";
      message.textContent = "Looks good!";
      return true;
    } else {
      message.classList.add("error-message");
      message.style.display = "block";
      message.textContent = "Please select a query";
      return false;
    }
  }

  // Validate checkbox

  function validateCheckInput(box) {
    const wrapper = box.closest(".check-wrapper");
    const message = wrapper.querySelector(".message");
    const customBox = form.querySelector(".custom-checkbox");

    message.classList.remove("success-message", "error-message");
    message.textContent = "";
    message.style.display = "none";

    if (!box.checked) {
      customBox.classList.add("invalid");
      message.classList.add("error-message");
      message.style.display = "block";
      message.textContent = "This checkbox must be checked";
      return false;
    } else {
      message.classList.add("success-message");
      message.style.display = "block";
      message.textContent = "Looks good!";
      return true;
    }
  }

  function updateSubmitButton() {
    let allValid = true;

    inputs.forEach((input) => {
      const valid = validateStringInput(input);
      if (!valid) allValid = false;
    });

    const isRadioValid = validateRadioInput();
    const isCheckValid = validateCheckInput(checkbox);

    if (!allValid && !isRadioValid && !isCheckValid) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }
  form.addEventListener("submit", (e) => {
    let formValid = true;

    inputs.forEach((input) => {
      const valid = validateStringInput(input);
      if (!valid) foValid = false;
    });

    const isRadioValid = validateRadioInput();
    const isCheckValid = validateCheckInput(checkbox);

    if (!allValid && !isRadioValid && !isCheckValid) {
      e.preventDefault();
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
      e.preventDefault();

      popup.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        popup.style.display = "none";
        form.submit();
      }, 5000);
    }
  });
}
