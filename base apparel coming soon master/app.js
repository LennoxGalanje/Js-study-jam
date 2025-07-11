// Selecting Key HTML elements using document.querySelector()
const form = document.querySelector("#rsvpForm");
const input = document.querySelector("input[type='email']");
const button = document.querySelector(".rsvpForm__button");
const statusMessage = document.querySelector(".status-message");
const statusIcon = document.querySelector(".rsvpForm__status-icon");

// Safety check
if (form && input && button && statusMessage && statusIcon) {
  // Defining Helper functions
  function setError(message) {
    // Adds css class .invalid to the input for styling
    input.classList.add("invalid");
    // Sets the value of the input to the error message
    statusMessage.textContent = message;
    statusMessage.style.display = "block";
    //sets the text color
    statusMessage.style.color = "#f96464";
    // changes input border color
    input.style.borderColor = "#f96464";
    // disables the submit button until the input is valid
    button.disabled = true;
    //inserts the error iccon
    statusIcon.innerHTML = `
        <img
            src="./images/icon-error.svg"
            width="24"
            height="24"
            alt="icon-error"
        />

        <figcaption class="offscreen">icon-error</figcaption>
        
        `;
  }

  function setSuccess(message) {
    // Adds css class .invalid to the input for styling
    input.classList.add("valid");
    statusMessage.textContent = message;
    statusMessage.style.display = "block";
    statusMessage.style.color = "#008000";
    input.style.borderColor = "#008000";
    button.disabled = false;
    statusIcon.innerHTML = `
        <img
            src="./images/icon-success.svg"
            width="24"
            height="24"
            alt="icon-success"
        />

        <figcaption class="offscreen">icon-success</figcaption>
        
        `;
  }

  function resetFormUI() {
    statusMessage.style.display = "none";
    input.style.borderColor = "hsla(0, 36%, 70%, 0.5)";
    input.classList.remove("valid", "invalid");
    statusIcon.innerHTML = ``;
    button.disabled = true;
    input.value = "";
  }

  // Real time validation
  input.addEventListener("input", () => {
    // This gets the email and removes extra spaces
    const value = input.value.trim();
    //Checks if the input field is empty
    const isValueEmpty = value === "";
    //isValueValid uses an browser-built-in validation
    const isValueValid = input.validity.valid;

    if (isValueEmpty) {
      setError("Email address is required 🥲");
    } else if (!isValueValid) {
      setError("Please enter a valid email address 🫤");
    } else {
      setSuccess("Successful ☺️");
    }
  });
  form.addEventListener("submit", (e) => {
    //Stops the page from reloading
    e.preventDefault();
    // This will clear all the visual feedback and it will reset the form
    resetFormUI();
  });
}
