import { getParkData } from './parkService.mjs';

async function init() {
  const parkData = await getParkData();

  // 1. Update the link in the disclaimer area
  const disclaimerAnchor = document.querySelector('.disclaimer a');
  if (disclaimerAnchor) {
    disclaimerAnchor.href = parkData.url;
    disclaimerAnchor.textContent = parkData.fullName;
  }

  // 2. Update the page title
  document.title = parkData.fullName;

  // 3. Update the hero image with the first image from the dataset
  const heroImg = document.querySelector('.hero-banner img');
  if (heroImg && parkData.images && parkData.images.length > 0) {
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText || parkData.fullName;
  }

  // 4. Update the park title, designation, and states dynamically
  const heroContent = document.querySelector('.hero-banner__content');
  if (heroContent) {
    heroContent.innerHTML = `
      <h1 class="hero-banner__title">${parkData.fullName}</h1>
      <p class="hero-banner_subtitle">
        <span>${parkData.designation}</span>
        <span>${parkData.states}</span>
      </p>
    `;
  }
}

init();