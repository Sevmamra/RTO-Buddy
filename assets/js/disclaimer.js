document.addEventListener("DOMContentLoaded", () => {
  const agreed = localStorage.getItem("rto-disclaimer-agreed");
  if (!agreed) {
    showDisclaimerPopup();
  }
});

function showDisclaimerPopup() {
  const popup = document.createElement("div");
  popup.id = "disclaimer-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Disclaimer</h2>
      <p>
        This app is designed for learning and practice purposes only. We are not affiliated with any government body or the official Parivahan portal (www.parivahan.gov.in). 
        The content shown is compiled from publicly available sources to help users prepare for the RTO learner’s licence test.
      </p>
      <p>
        Please verify all legal information with official government sources. This app does not guarantee accuracy or completeness of any data.
      </p>
      <div class="popup-actions">
        <button id="disagree-btn">I Disagree</button>
        <button id="agree-btn">I Agree</button>
      </div>
      <p class="popup-link">
        <a href="privacy.html" target="_blank">Read our Privacy Policy</a>
      </p>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("agree-btn").addEventListener("click", () => {
    localStorage.setItem("rto-disclaimer-agreed", "true");
    popup.remove();
  });

  document.getElementById("disagree-btn").addEventListener("click", () => {
    alert("You have declined the terms. The app will now close.");
    window.location.href = "https://www.google.com/";
  });
}
