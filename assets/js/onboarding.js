// ========== STATE AND LANGUAGE DROPDOWN ==========
const stateSelect = document.getElementById('state');
const languageSelect = document.getElementById('language');
const continueBtn = document.getElementById('continueBtn');

// Dummy states & languages (You can later replace this with real list)
const states = ["Andhra Pradesh", "Gujarat", "Maharashtra", "Tamil Nadu", "Uttar Pradesh"];
const languages = ["English", "Hindi", "Gujarati"];

// Populate dropdowns
function populateDropdowns() {
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.toLowerCase();
    option.textContent = lang;
    languageSelect.appendChild(option);
  });
}

// Save to localStorage
function savePreferences() {
  const selectedState = stateSelect.value;
  const selectedLang = languageSelect.value;

  if (!selectedState || !selectedLang) {
    alert("Please select both state and language to continue.");
    return;
  }

  localStorage.setItem("userState", selectedState);
  localStorage.setItem("userLang", selectedLang);

  // Redirect to home/dashboard
  window.location.href = "index.html";
}

if (stateSelect && languageSelect && continueBtn) {
  populateDropdowns();
  continueBtn.addEventListener("click", savePreferences);
}
