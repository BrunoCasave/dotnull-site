'use strict';
// All interactions are local. No analytics, forms or persistent browser storage.
const petButton = document.querySelector('#pet-button');
const heroPet = document.querySelector('#hero-pet');
const petMessage = document.querySelector('#pet-message');
let patReset;
petButton?.addEventListener('click', () => {
  clearTimeout(patReset);
  heroPet.src = 'assets/pets/leopa-happy.svg';
  heroPet.alt = 'なでられてうれしそうなレオパ';
  petButton.classList.add('petted');
  petMessage.textContent = 'うれしそう。今日も、あなたのペースで。';
  patReset = setTimeout(() => {
    heroPet.src = 'assets/pets/leopa.svg';
    heroPet.alt = 'にっこりしたドット絵のレオパ';
    petButton.classList.remove('petted');
    petMessage.textContent = 'タップして、なでてみて。';
  }, 3000);
});
const familyButtons = [...document.querySelectorAll('[data-family]')];
let rosterRequest;
let selectionVersion = 0;
familyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const version = ++selectionVersion;
    try {
      rosterRequest ??= fetch('assets/roster.json').then(response => {
        if (!response.ok) throw new Error('Roster unavailable');
        return response.json();
      });
      const roster = await rosterRequest;
      if (version !== selectionVersion) return;
      const family = button.dataset.family;
      const pets = roster[family];
      if (!Array.isArray(pets) || pets.length !== 6) throw new Error('Invalid family');
      const offset = familyButtons.indexOf(button) * 6;
      const figures = pets.map(([id, label], index) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `assets/pets/${id}.svg`;
        img.alt = '';
        img.width = 256;
        img.height = 128;
        const caption = document.createElement('figcaption');
        const number = document.createElement('span');
        number.textContent = String(offset + index + 1).padStart(2, '0');
        caption.append(number, document.createTextNode(label));
        figure.append(img, caption);
        return figure;
      });
      document.querySelector('#pet-grid').replaceChildren(...figures);
      familyButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelector('#family-status').textContent = `${button.textContent}の6種類を表示`;
    } catch {
      rosterRequest = undefined;
      document.querySelector('#family-status').textContent = '相棒の読み込みに失敗しました。もう一度選んでください。';
    }
  });
});
