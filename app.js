const html = document.querySelector('html');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');

function toggleMode() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Apply a class to trigger the animation
  html.classList.add('theme-transition');

  setTimeout(() => {
    html.setAttribute('data-theme', newTheme);
    modeStatus.innerText = "Currently in " + newTheme.charAt(0).toUpperCase() + newTheme.slice(1) + " Mode";

    // Remove the animation class after the transition completes
    html.classList.remove('theme-transition');
  }, 300);
}

modeToggle.addEventListener('click', toggleMode);

// Get form elements
const contactForm = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Function to validate a single input field
function validateInput(input, errorElement) {
  if (input.checkValidity()) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
    return true;
  } else {
    input.classList.add('invalid');
    errorElement.textContent = input.validationMessage;
    return false;
  }
}

// Function to validate all input fields
function validateForm() {
  const isFullNameValid = validateInput(fullName, fullNameError);
  const isEmailValid = validateInput(email, emailError);
  const isPhoneNumberValid = validateInput(phoneNumber, phoneNumberError);
  
  return isFullNameValid && isEmailValid && isPhoneNumberValid;
}

// Event listener for form submission
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (validateForm()) {
    // Form is valid, show success message and reset form
    successMessage.style.display = 'block';
    contactForm.reset();
    submitBtn.disabled = true;
  }
});

// Event listeners for real-time validation as the user types
fullName.addEventListener('input', () => {
  validateInput(fullName, fullNameError);
  updateSubmitButton();
});

email.addEventListener('input', () => {
  validateInput(email, emailError);
  updateSubmitButton();
});

phoneNumber.addEventListener('input', () => {
  validateInput(phoneNumber, phoneNumberError);
  updateSubmitButton();
});

// Function to enable or disable the submit button
function updateSubmitButton() {
  submitBtn.disabled = !validateForm();
}

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

