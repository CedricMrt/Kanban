import cardModule from '../modules/card.js';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const cardService = {
  async fetchCreateCard(data) {
    const response = await fetch(`${API_BASE_URL}/v1/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: data.content,
        list_id: Number(data.list_id),
        color: data.color,
      }),
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const card = await response.json();
    const modalCardElm = document.getElementById('add-card-modal');
    modalCardElm.classList.remove('is-active');

    return cardModule.addCardToList(card.list_id, card);
  },

  async fetchUpdateCard(data) {
    const response = await fetch(`${API_BASE_URL}/v1/cards/${data.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: data.content,
        color: data.color,
      }),
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const card = await response.json();

    const modalCardElm = document.getElementById('update-card-modal');
    modalCardElm.classList.remove('is-active');

    return card;
  },

  async fetchDeleteCard(data) {
    const response = await fetch(`${API_BASE_URL}/v1/cards/${data.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const modalCardElm = document.getElementById('delete-card-modal');
    modalCardElm.classList.remove('is-active');
  },
};

export default cardService;
