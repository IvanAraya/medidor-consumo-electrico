const form = document.getElementById('calc-form');
const powerInput = document.getElementById('power');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const resultSection = document.getElementById('result');
const resultKwh = document.getElementById('result-kwh');
const resultDetail = document.getElementById('result-detail');

function formatHoursMinutes(hours, minutes) {
  const parts = [];
  if (hours > 0) parts.push(`${hours} h`);
  if (minutes > 0) parts.push(`${minutes} min`);
  return parts.length ? parts.join(' ') : '0 min';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const power = parseFloat(powerInput.value);
  const hours = parseFloat(hoursInput.value) || 0;
  const minutes = parseFloat(minutesInput.value) || 0;

  powerInput.closest('.field').classList.toggle('invalid', !(power > 0));

  if (!(power > 0) || hours < 0 || minutes < 0) {
    resultSection.hidden = true;
    return;
  }

  const totalHours = hours + minutes / 60;
  const consumptionKwh = (power * totalHours) / 1000;

  resultKwh.textContent = consumptionKwh.toLocaleString('es', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
  resultDetail.textContent = `${power} W durante ${formatHoursMinutes(hours, minutes)}`;
  resultSection.hidden = false;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = new URL('sw.js', document.baseURI).toString();
    navigator.serviceWorker.register(swUrl).catch((err) => {
      console.error('No se pudo registrar el service worker:', err);
    });
  });
}
