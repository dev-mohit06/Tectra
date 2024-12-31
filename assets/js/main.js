/*==================== POPUP HANDLING ==================== */
function openPopup() {
  document.getElementById('signupPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('signupPopup').style.display = 'none';
}

function handleRoleChange() {
  const roleSelect = document.getElementById('role');
  const otherRoleInput = document.getElementById('otherRoleInput');

  if (roleSelect.value === 'other') {
      otherRoleInput.style.display = 'block';
      otherRoleInput.required = true;
  } else {
      otherRoleInput.style.display = 'none';
      otherRoleInput.required = false;
  }
}

function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase &&
      hasNumber && hasSpecial;
}

function handleSubmit(event) {
  event.preventDefault();
  let isValid = true;

  // Reset all error messages
  document.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
  });

  // Validate email
  const email = document.getElementById('email').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address';
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
  }

  // Validate phone
  const phone = document.getElementById('phone').value;
  if (!/^\d{10}$/.test(phone)) {
      document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
      document.getElementById('phoneError').style.display = 'block';
      isValid = false;
  }

  // Validate password
  const password = document.getElementById('password').value;
  if (!validatePassword(password)) {
      document.getElementById('passwordError').textContent =
          'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      document.getElementById('passwordError').style.display = 'block';
      isValid = false;
  }

  // Validate confirm password
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
      document.getElementById('confirmPasswordError').style.display = 'block';
      isValid = false;
  }

  if (isValid) {
      console.log({
          fullName: $('#fullName').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          company: $('#company').val(),
          role: $('#role').val() === 'other' ? $('#otherRoleInput').val() : $('#role').val(),
          location: $('#location').val(),
          password: $('#password').val()
      });

      $('#submitButton').text('Submitting!!'); // Change the button text to "Submitting!!"
      $('#submitButton').prop('disabled', true); // Disable the submit button

      $.ajax({
          url: "https://script.google.com/macros/s/AKfycbxksHDliLIB7d6JIGVfR2CqqN65nvGRORJqVxhRTG8C-7RgIIodI56I_AiJgPuo03w1/exec",
          type: "POST",
          data: {
              fullName: $('#fullName').val(),
              email: $('#email').val(),
              phone: $('#phone').val(),
              company: $('#company').val() || 'N/A',
              role: $('#role').val() === 'other' ? $('#otherRoleInput').val() : $('#role').val(),
              location: $('#location').val(),
              password: $('#password').val()
          },
          success: function (response) {
              alert('Form submitted successfully!');
              $('#submitButton').text('Create My Account'); // Change the button text back to "Create My Account"
              closePopup();
              $('#signupForm')[0].reset();
                window.location.href = '/coming-soon.html';
          },
          error: function (error) {
              alert('There was an error submitting the form. Please try again.');
              $('#submitButton').text('Create My Account'); // Change the button text back to "Create My Account"
          }
      });
  }
}

// Close popup when clicking outside
window.onclick = function (event) {
  const popup = document.getElementById('signupPopup');
  if (event.target === popup) {
      closePopup();
  }
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header')
      : header.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader);
  
  /*=============== VALUE ACCORDION ===============*/
  const accordionItems = document.querySelectorAll('.value__accordion-item');
  
  accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.value__accordion-header');
  
    accordionHeader.addEventListener("click", () => {
      const openItem = document.querySelector('.accordion-open');
      toggleItem(item)
  
      if (openItem && openItem !== item) {
        toggleItem(openItem);
      }
    });
  })
  
  const toggleItem = (item) => {
    const accordionContent = item.querySelector(".value__accordion-content");
  
    if (item.classList.contains('accordion-open')) {
      accordionContent.removeAttribute('style');
      item.classList.remove('accordion-open');
    }
    else {
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
      item.classList.add("accordion-open");
    }
  }

  /*=============== SCROLL REVEAL ANIMATION ===============*/
// Initialize ScrollReveal with snappier base configuration
const sr = ScrollReveal({
  origin: 'top',
  distance: '50px',
  duration: 1500,  // Reduced from 2500
  delay: 200,      // Reduced from 400
  easing: 'cubic-bezier(0.5, 0, 0, 1)' // Add smooth easing
});

// Header and Navigation - Quick entrance
sr.reveal('.nav__logo', { 
  origin: 'left',
  delay: 0,
  distance: '30px',
  duration: 1000
});

sr.reveal('.nav__menu', {
  origin: 'top',
  delay: 100,
  distance: '30px',
  duration: 1000
});

sr.reveal('.nav__button', {
  origin: 'right',
  delay: 100,
  distance: '30px',
  duration: 1000
});

// Home Section - Dynamic entrance
sr.reveal('.home__title', {
  delay: 100,
  origin: 'left',
  distance: '40px',
  duration: 1000
});

sr.reveal('.home__description', {
  delay: 200,
  origin: 'right',
  distance: '40px',
  duration: 1000
});

// Reveal value numbers with a scale effect
sr.reveal('.home__value', {
  delay: 300,
  scale: 0.8,
  distance: '0px',
  duration: 1000,
  interval: 100
});

// Home images with dynamic entrance
sr.reveal('.home__images', {
  delay: 200,
  origin: 'bottom',
  distance: '60px',
  duration: 1200,
  scale: 0.9
});

sr.reveal('.home__orbe', {
  delay: 300,
  origin: 'right',
  distance: '80px',
  duration: 1200,
  scale: 0.8
});

// How it Works Section - Snappy reveals
sr.reveal('.section__subtitle', {
  origin: 'left',
  distance: '30px',
  interval: 100,
  duration: 1000
});

sr.reveal('.section__title', {
  origin: 'right',
  distance: '30px',
  interval: 100,
  duration: 1000
});

// Features Section - Staggered grid reveal
sr.reveal('.value__container div', {
  origin: 'bottom',
  distance: '40px',
  interval: 50,  // Faster interval between items
  delay: 100,
  duration: 1000,
  scale: 0.9    // Slight scale effect
});

// Contact Section - Coordinated entrance
sr.reveal('.contact__orbe', {
  origin: 'left',
  distance: '80px',
  delay: 200,
  duration: 1200,
  scale: 0.9
});

sr.reveal('.contact__img', {
  origin: 'right',
  distance: '60px',
  delay: 300,
  duration: 1200
});

// Contact cards with staggered popup effect
sr.reveal('.contact__card-box', {
  origin: 'bottom',
  distance: '30px',
  interval: 100,
  scale: 0.8,
  duration: 1000
});

// Footer - Quick sequential reveal
sr.reveal('.footer__container > div', {
  origin: 'bottom',
  distance: '30px',
  interval: 100,
  duration: 800
});

sr.reveal('.footer__copy', {
  origin: 'right',
  distance: '30px',
  delay: 200,
  duration: 800
});

// Scroll Up Button - Subtle entrance
sr.reveal('.scrollup', {
  origin: 'bottom',
  distance: '40px',
  delay: 400,
  duration: 1000,
  scale: 0.9
});