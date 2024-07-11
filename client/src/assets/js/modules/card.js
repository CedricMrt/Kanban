import cardService from '../services/card';
import 'vanilla-colorful';
import labelService from '../services/label';

const cardModule = {
  addCardToList(listId, card) {
    const cardTemplate = document.querySelector('#cardTemplate');
    const clone = cardTemplate.content.cloneNode(true);

    let articleElm = clone.querySelector('[slot="card-id"]');
    articleElm.style.backgroundColor = card.color;
    Object.assign(articleElm.dataset, card);

    let cardContent = clone.querySelector('#card-content');
    cardContent.textContent = card.content;

    const updateButtonElm = clone.querySelector('.updateCard');
    updateButtonElm.addEventListener('click', () => {
      const modalCardElm = document.getElementById('update-card-modal');
      modalCardElm.classList.add('is-active');
      modalCardElm.querySelector('input[name="id"]').value = card.id;
      modalCardElm.querySelector('input[name="content"]').value = card.content;
    });

    const addLabelButtonElm = clone.querySelector('.addLabel');
    addLabelButtonElm.addEventListener('click', async () => {
      const labels = await labelService.getAllLabels();
      const modalLabelElm = document.getElementById('add-label-modal');
      modalLabelElm.classList.add('is-active');

      modalLabelElm.querySelector('input[name="card_id"]').value = card.id;

      const selectLabelElm = document.getElementById('label-select');
      selectLabelElm.textContent = '';
      labels.forEach((label) => {
        const optionElm = document.createElement('option');
        optionElm.value = label.id;
        optionElm.textContent = label.name;
        selectLabelElm.append(optionElm);
      });
    });

    const deleteButtonElm = clone.querySelector('.deleteCard');
    deleteButtonElm.addEventListener('click', () => {
      const modalCardElm = document.getElementById('delete-card-modal');
      modalCardElm.classList.add('is-active');

      modalCardElm.querySelector('input[name="id"]').value = card.id;
    });

    const listElm = document.querySelector(
      `[slot="list-id"][data-id="${listId}"]`,
    );
    if (listElm) {
      const cardContainer = listElm.querySelector('.card-container');
      cardContainer.appendChild(articleElm);
    }
  },

  activeModal() {
    const modalCardElm = document.getElementById('add-card-modal');
    modalCardElm.classList.add('is-active');
  },

  closeActiveModal(event) {
    const btnCloseModalElm = event.currentTarget;

    const modalElm = btnCloseModalElm.closest('.modal');

    modalElm.classList.remove('is-active');
  },

  async handleSubmitCardForm(event) {
    event.preventDefault();

    const picker = document.querySelector('#color-picker-card');
    picker.addEventListener('color-changed', (event) => {
      const newColor = event.detail.value;
    });

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);
    data.color = picker.color;

    try {
      await cardService.fetchCreateCard(data);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la creation de la carte');
    }
  },

  async handleUpdateSubmitCardForm(event) {
    event.preventDefault();

    const picker = document.querySelector('hex-color-picker');
    picker.addEventListener('color-changed', (event) => {
      const newColor = event.detail.value;
    });

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);
    data.color = picker.color;

    try {
      const cardUpdated = await cardService.fetchUpdateCard(data);
      const cardElm = document.querySelector(
        `[slot="card-id"][data-id="${cardUpdated.id}"]`,
      );

      const cardContentElm = cardElm.querySelector('#card-content');

      cardContentElm.textContent = cardUpdated.content;
      Object.assign(cardElm.dataset, cardUpdated);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la modification de la carte');
    }
  },

  async handleDeleteSubmitCardForm(event) {
    event.preventDefault();

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);

    try {
      await cardService.fetchDeleteCard(data);

      const cardElm = document.querySelector(`[data-id="${data.id}"]`);

      cardElm.remove();
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la suppression de la carte');
    }
  },
};

export default cardModule;
