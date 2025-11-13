// index.js
// Author: Roland Eklund
// Date: 2025-11-13

document.addEventListener('DOMContentLoaded', () => {
  const CHECK = '✅';
  const CROSS = '❌';

  const form = document.getElementById('registrationForm');
  if (!form) return;

  const tableBody = document
    .getElementById('timetable')
    ?.querySelector('tbody');
  const nameInput = document.getElementById('nameField');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const dobInput = document.getElementById('birthDate');
  const termsInput = form.querySelector('input[name="terms"]');
  const timestampInput = document.getElementById('timestamp');

  function formatName(name) {
    return name
      .trim()
      .split(/\s+/)
      .map((w) => {
        const lower = w.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(' ');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!tableBody || !nameInput) return;

    const rawName = nameInput.value || '';
    const name = formatName(rawName);
    if (!name) return;

    const email = (emailInput?.value || '').trim();
    const phone = (phoneInput?.value || '').trim();
    const dobRaw = dobInput?.value || '';
    const dobDisplay = dobRaw ? new Date(dobRaw).toLocaleDateString() : '';
    const termsAccepted = !!termsInput?.checked;

    const now = new Date();
    const iso = now.toISOString();
    const regDisplay = now.toLocaleString();

    if (timestampInput) timestampInput.value = iso;

    const row = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = name;
    row.appendChild(tdName);

    const tdReg = document.createElement('td');
    tdReg.textContent = regDisplay;
    row.appendChild(tdReg);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = email;
    row.appendChild(tdEmail);

    const tdPhone = document.createElement('td');
    tdPhone.textContent = phone;
    row.appendChild(tdPhone);

    const tdDob = document.createElement('td');
    tdDob.textContent = dobDisplay;
    row.appendChild(tdDob);

    const tdTerms = document.createElement('td');
    tdTerms.textContent = termsAccepted ? CHECK : CROSS;
    row.appendChild(tdTerms);

    tableBody.appendChild(row);

    const studentNameSpan = document.querySelector('.student-name');
    const studentDateSpan = document.querySelector('.student-date');
    const studentEmailSpan = document.querySelector('.student-email');
    const studentPhoneSpan = document.querySelector('.student-phone');
    const studentDobSpan = document.querySelector('.student-dob');
    if (studentNameSpan) studentNameSpan.textContent = name;
    if (studentDateSpan) studentDateSpan.textContent = regDisplay;
    if (studentEmailSpan) studentEmailSpan.textContent = email;
    if (studentPhoneSpan) studentPhoneSpan.textContent = phone;
    if (studentDobSpan) studentDobSpan.textContent = dobDisplay;

    form.reset();
    nameInput.focus();
  });
});
