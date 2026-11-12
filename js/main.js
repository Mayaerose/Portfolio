const engineeringFolder = document.querySelector(".folder--engineering");
const designFolder = document.querySelector(".folder--design");
const engineeringTab = document.getElementById("tab-engineering");
const designTab = document.getElementById("tab-design");
const folders = document.querySelector(".folders");

function scrollToTabs() {
  const top = folders.getBoundingClientRect().top + window.scrollY - 16;
  if (window.scrollY > top + 80) {
    window.scrollTo({ top: top, behavior: "smooth" });
  }
}

function showEngineering() {
  if (!designFolder || !engineeringFolder.classList.contains("is-back")) {
    return;
  }
  engineeringFolder.classList.remove("is-back");
  designFolder.classList.add("is-back");
  document.body.classList.remove("design");
  scrollToTabs();
}

function showDesign() {
  if (!designFolder || !designFolder.classList.contains("is-back")) {
    return;
  }
  designFolder.classList.remove("is-back");
  engineeringFolder.classList.add("is-back");
  document.body.classList.add("design");
  scrollToTabs();
}

engineeringTab.addEventListener("click", showEngineering);
engineeringFolder.addEventListener("click", showEngineering);

// The design folder is commented out in index.html for now.
if (designFolder && designTab) {
  designTab.addEventListener("click", showDesign);
  designFolder.addEventListener("click", showDesign);
}

const form = document.getElementById("contact-form");
const status = document.querySelector(".form__status");

function setStatus(message, tone) {
  status.textContent = message;
  status.setAttribute("data-tone", tone);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (form.action.includes("YOUR_FORM_ID")) {
    setStatus("This form isn't connected yet. Add your Formspree ID in index.html.", "error");
    return;
  }

  setStatus("Sending...", "");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not send");
      }
      form.reset();
      setStatus("Thank you. Your message has been sent.", "success");
    })
    .catch(function () {
      setStatus("Something went wrong. Please try again or email me directly.", "error");
    });
});

const years = document.querySelectorAll("[data-year]");

for (let i = 0; i < years.length; i++) {
  years[i].textContent = new Date().getFullYear();
}
