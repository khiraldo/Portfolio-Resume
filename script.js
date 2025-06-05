
"use strict";

//DARK MODE TOGGLE WITH LOCAL STORAGE
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkModeClass = 'dark-mode';
const themeStorageKey = 'userThemePreference';

function saveThemePreference(theme) {
  localStorage.setItem(themeStorageKey, theme);
}

function getSavedThemePreference() {
  return localStorage.getItem(themeStorageKey);
}

function applySavedTheme() {
  const savedTheme = getSavedThemePreference();
  const themeIcon = document.getElementById('theme-icon');
  const lightModeIconPath = 'Files/lightmodeicon.png';
  const darkModeIconPath = 'Files/darkmodeicon.png';

  if (themeIcon) {
    if (savedTheme === darkModeClass) {
      body.classList.add(darkModeClass);
      themeIcon.src = darkModeIconPath;
      themeIcon.alt = 'Dark Mode Active';
    } else {
      body.classList.remove(darkModeClass);
      themeIcon.src = lightModeIconPath;
      themeIcon.alt = 'Light Mode Inactive';
    }
  }
}

document.addEventListener('DOMContentLoaded', applySavedTheme);

themeToggle.addEventListener('click', () => {
  body.classList.toggle(darkModeClass);
  const currentTheme = body.classList.contains(darkModeClass) ? darkModeClass : '';
  saveThemePreference(currentTheme); 

  const themeIcon = document.getElementById('theme-icon');
  const lightModeIconPath = 'Files/lightmodeicon.png';
  const darkModeIconPath = 'Files/darkmodeicon.png';

  if (themeIcon) {
    if (body.classList.contains(darkModeClass)) {
      themeIcon.src = darkModeIconPath;
      themeIcon.alt = 'Dark Mode Active';
    } else {
      themeIcon.src = lightModeIconPath;
      themeIcon.alt = 'Light Mode Inactive';
    }
  }
});

//RESUME TABS
//I added the tabs from https://jqueryui.com/tabs
$("#resume-tabs").tabs();

//SERVICES
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-links a');
    const services = document.querySelectorAll('#service-container > div');

    services.forEach(service => {
        service.style.display = 'none';
    });

    document.querySelector('.main-service').style.display = 'flex';

    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetService = this.getAttribute('data-service');

            services.forEach(service => {
                service.style.display = 'none';
            });

            const activeService = document.querySelector(`[data-service="${targetService}"]`);
            if (activeService) {
                activeService.style.display = 'flex';
            }
        });
    });
});

//PORTFOLIO
//I used the plug-in from http://flexslider.woothemes.com/
$(document).ready(function() {
    $('.flexslider').flexslider({
      animation: "slide"
    });
});

//GAME
document.addEventListener('DOMContentLoaded', function() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const gameForm = document.getElementById('game-form');
    const userGuessInput = document.getElementById('user-guess');

    gameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userGuess = parseInt(userGuessInput.value);

        if (userGuess === randomNumber) {
            alert('You Won!');
        } else {
            alert('Try Again');
        }

        userGuessInput.value = '';
    });
});

//POKEMON API
//Found via: https://pokemontcg.io/
function fetchRandomPokemonCardOptimized() {
    const apiUrl = 'https://api.pokemontcg.io/v2/cards';
    const pageSize = 1; 
  
    fetch(`${apiUrl}?pageSize=${pageSize}&page=${Math.floor(Math.random() * 100) + 1}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          const randomCard = data.data[0]; 
          displaySinglePokemonCard(randomCard);
        } else {
          handleFetchError('No Pokémon card data found.');
        }
    })
      .catch(error => {
        handleFetchError('Error fetching Pokémon card:', error);
    });
}
  
  function displaySinglePokemonCard(card) {
    const cardContainer = document.querySelector('.single-pokemon-card');
    if (cardContainer) {
      cardContainer.innerHTML = `
        <h3>${card.name}</h3>
        ${card.supertype ? `<p>Supertype: ${card.supertype}</p>` : ''}
        ${card.types ? `<p>Types: ${card.types.join(', ')}</p>` : ''}
        ${card.hp ? `<p>HP: ${card.hp}</p>` : ''}
        ${card.images?.large ? `<img src="${card.images.large}" alt="${card.name}">` : 'No Image Available'}
        <p><a href="${card.cardmarket?.url}" target="_blank">View on Cardmarket</a></p>
      `;
} else {
      console.error('HTML element with class "single-pokemon-card" not found.');
    }
}
  
  function handleFetchError(message, error = null) {
    console.error(message, error);
    const cardContainer = document.querySelector('.single-pokemon-card');
    if (cardContainer) {
      cardContainer.textContent = 'Failed to load Pokémon card.';
    }
}
  
document.addEventListener('DOMContentLoaded', fetchRandomPokemonCardOptimized);
  
  const fetchButton = document.getElementById('fetch-pokemon-button');
  if (fetchButton) {
    fetchButton.addEventListener('click', fetchRandomPokemonCardOptimized);
}


//CONTACT FORM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submissionMessage = document.getElementById('submissionMessage');


    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.textContent = '';
            });
    }

    function displayError(elementId, message) {
        console.log("Attempting to display error for:", elementId);
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            console.log("Error span found:", errorElement);
            errorElement.textContent = message;
        } else {
            console.error("Error span not found:", elementId);
        }
    }

    function displaySubmissionMessage(customer) {
        submissionMessage.innerHTML = `
            <p>Thank you for your submission, ${customer.firstName}!</p>
            <p>Here's the information you provided:</p>
            <ul>
                <li>First Name: ${customer.firstName}</li>
                <li>Last Name: ${customer.lastName}</li>
                <li>Phone: ${customer.phone || 'Not provided'}</li>
                <li>Email: ${customer.email || 'Not provided'}</li>
                <li>Comments: ${customer.comments}</li>
                <li>Contact Method: ${customer.contactMethod}</li>
            </ul>
        `;
        submissionMessage.style.display = 'block';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comments = document.getElementById('comments').value;
        const contactMethod = document.querySelector('input[name="contactMethod"]:checked');

        let isValid = true;

        const nameRegex = /^[a-zA-Z]{3,}$/;
        if (!nameRegex.test(firstName)) {
            displayError('firstNameError', 'First name must be at least 3 letters.');
            isValid = false;
        }

        if (!nameRegex.test(lastName)) {
            console.log("lastNameError Span:", document.getElementById("lastNameError"));
            displayError('lastNameError', 'Last name must be at least 3 letters.');
            isValid = false;
        }

        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; 
        if (phone && !phoneRegex.test(phone)) {
            displayError('phoneError', 'Phone must be in the format: 123-456-7890');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            displayError('emailError', 'Invalid email address.');
            isValid = false;
        }

        const commentsRegex = /.{3,}/;
        if (!commentsRegex.test(comments)) {
            displayError('commentsError', 'Comments must be at least 3 characters.');
            isValid = false;
        }

        if (!contactMethod) {
            displayError('contactMethodError', 'Please select a contact method.');
            isValid = false;
        }

        if (isValid) {
            const customer = {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                comments: comments,
                contactMethod: contactMethod.value
            };

            displaySubmissionMessage(customer);
            form.reset();
        }
    });

});
