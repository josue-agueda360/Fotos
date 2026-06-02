const INVITATION = {
  names: "Josue & Amor",
  label: "Celebramos nuestro amor",
  intro: "Cada momento juntos merece quedarse en la memoria. Acompananos a celebrar nuestro aniversario.",
  dateISO: "2026-12-12T18:00:00-06:00",
  dateText: "12 de diciembre de 2026",
  timeText: "6:00 PM",
  place: "Lugar por confirmar",
  mapUrl: "https://maps.google.com",
  whatsappNumber: "",
  whatsappMessage: "Confirmo mi asistencia al aniversario. Muchas gracias por la invitacion."
};

const $ = (selector) => document.querySelector(selector);

function applyInvitationData() {
  $("#heroNames").textContent = INVITATION.names;
  $("#heroLabel").textContent = INVITATION.label;
  $("#heroCopy").textContent = INVITATION.intro;
  $("#dateText").textContent = INVITATION.dateText;
  $("#timeText").textContent = INVITATION.timeText;
  $("#placeText").textContent = INVITATION.place;
  $("#mapLink").href = INVITATION.mapUrl;

  const encodedMessage = encodeURIComponent(INVITATION.whatsappMessage);
  const phone = INVITATION.whatsappNumber.replace(/\D/g, "");
  $("#whatsappLink").href = phone
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

function updateCountdown() {
  const target = new Date(INVITATION.dateISO).getTime();
  const now = Date.now();
  const distance = Math.max(target - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}

function wireOpening() {
  const opening = $("#opening");
  const openButton = $("#openInvite");
  const music = $("#bgMusic");
  const musicToggle = $("#musicToggle");

  async function startExperience() {
    opening.classList.add("is-hidden");
    try {
      music.volume = 0.34;
      await music.play();
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Pausar musica");
    } catch {
      musicToggle.setAttribute("aria-label", "Activar musica");
    }
  }

  openButton.addEventListener("click", startExperience);
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await music.play();
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Pausar musica");
      return;
    }

    music.pause();
    musicToggle.classList.remove("is-playing");
    musicToggle.setAttribute("aria-label", "Activar musica");
  });
}

applyInvitationData();
updateCountdown();
wireOpening();
setInterval(updateCountdown, 1000);
