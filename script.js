const weddingDate = new Date("2026-09-08T19:00:00+05:00");

const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds")
};

function updateCountdown() {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  countdownNodes.days.textContent = String(Math.floor(distance / day)).padStart(2, "0");
  countdownNodes.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  countdownNodes.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
  countdownNodes.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const revealSelector = [
  ".eyebrow",
  "h1",
  "h2",
  "h3",
  "p",
  ".hero__line",
  ".scroll-cue",
  ".gold-rule",
  ".signature",
  ".countdown__item",
  ".calendar-card",
  ".date-lockup",
  ".time-lockup",
  ".venue-card",
  ".venue-card__pin",
  ".mini-map",
  ".rsvp-form",
  ".field",
  ".choice",
  ".button",
  ".finale__date",
  ".monogram",
  "small"
].join(",");

const ambientSelector = [
  ".section-number",
  ".ornament-small",
  ".kazakh-band",
  ".venue-ornament",
  ".kazakh-emblem"
].join(",");

document.querySelector(".hero").classList.add("hero-active");

document.querySelectorAll("[data-reveal]").forEach((group) => {
  const pieces = [...group.querySelectorAll(revealSelector)];

  pieces.forEach((piece, index) => {
    piece.classList.add("reveal-piece");
    piece.style.setProperty("--reveal-delay", `${90 + index * 95}ms`);
  });
});

document.querySelectorAll(ambientSelector).forEach((element) => {
  element.classList.add("ambient-reveal");
});

document.querySelectorAll("img.botanical").forEach((image) => {
  const stage = document.createElement("span");

  stage.className = image.className;
  stage.classList.add("is-animated-flower");
  image.replaceWith(stage);
  image.className = "botanical__art";
  stage.appendChild(image);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const section = entry.target;
      const group = section.querySelector("[data-reveal]");
      const ambientElements = section.querySelectorAll(".ambient-reveal");
      const flowers = section.querySelectorAll(".botanical");

      group?.querySelectorAll(".reveal-piece").forEach((piece) => {
        piece.classList.add("is-visible");
      });

      ambientElements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${index * 110}ms`);
        element.classList.add("is-visible");
      });

      flowers.forEach((flower, index) => {
        flower.style.setProperty("--bloom-delay", `${180 + index * 170}ms`);
        flower.classList.add("is-bloomed");
      });

      sectionObserver.unobserve(section);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".hero, .section, .finale").forEach((section) => {
  sectionObserver.observe(section);
});

const rsvpForm = document.querySelector("#rsvp-form");
const formStatus = document.querySelector("#form-status");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(rsvpForm);
  const guestName = data.get("guestName").trim();
  const attendance = data.get("attendance");

  localStorage.setItem(
    "nazerke-rsvp",
    JSON.stringify({ guestName, attendance, submittedAt: new Date().toISOString() })
  );

  formStatus.textContent = `Рақмет, ${guestName}! Жауабыңыз қабылданды.`;
  rsvpForm.reset();
});
