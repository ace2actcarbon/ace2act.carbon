const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".learn-more").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = document.getElementById(button.dataset.expand);
    const isHidden = detail.hidden;
    detail.hidden = !isHidden;
    button.setAttribute("aria-expanded", String(isHidden));
    button.querySelector("span").textContent = isHidden ? "−" : "＋";
    button.firstChild.textContent = isHidden ? "Show less " : "Read a little more ";
  });
});

const transport = document.querySelector("#transport");
const distance = document.querySelector("#distance");
const travellers = document.querySelector("#travellers");
const returnTrip = document.querySelector("#returnTrip");
const distanceOutput = document.querySelector("#distanceOutput");
const travellersOutput = document.querySelector("#travellersOutput");
const resultValue = document.querySelector("#resultValue");
const resultDescription = document.querySelector("#resultDescription");

function calculateFootprint() {
  const km = Number(distance.value);
  const people = Number(travellers.value);
  const journeys = returnTrip.checked ? 2 : 1;
  // Simplified demo factors only; replace with sourced factors for research use.
  const estimate = km * journeys * Number(transport.value) / people;
  resultValue.textContent = estimate.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  resultDescription.textContent = `For ${km.toLocaleString("en-US")} km one way, ${returnTrip.checked ? "including return travel" : "one way only"}, shared by ${people} ${people === 1 ? "traveller" : "travellers"}.`;
  distanceOutput.value = `${km.toLocaleString("en-US")} km`;
  travellersOutput.value = `${people} ${people === 1 ? "person" : "people"}`;
}

[transport, distance, travellers, returnTrip].forEach((control) => {
  control.addEventListener("input", calculateFootprint);
  control.addEventListener("change", calculateFootprint);
});
document.querySelector("#calculateButton").addEventListener("click", calculateFootprint);
calculateFootprint();

document.querySelector("#surveyForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const age = document.querySelector("#ageGroup").value;
  const trust = document.querySelector("#trustLevel").value;
  const factor = document.querySelector("#feeFactor").value;
  const thought = document.querySelector("#surveyThought").value.trim();
  const message = document.querySelector("#formMessage");

  message.textContent = "Preview only — your response has not been submitted or saved. Connect a survey backend before collecting real data.";
  console.info("Demo survey preview (not transmitted):", { age, trust, factor, thought });
});

document.querySelector("#year").textContent = new Date().getFullYear();
