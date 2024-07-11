import listModule from '../modules/list.js';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const listService = {
  async getLists() {
    const response = await fetch(`${API_BASE_URL}/v1/lists`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const lists = await response.json();
    return lists;
  },

  async fetchCreateList(data) {
    const response = await fetch(`${API_BASE_URL}/v1/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const list = await response.json();
    const modalListElm = document.getElementById('add-list-modal');
    modalListElm.classList.remove('is-active');

    return listModule.addListToListsContainer(list);
  },

  async fetchUpdateList(data) {
    const response = await fetch(`${API_BASE_URL}/v1/lists/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
      }),
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const list = await response.json();

    const modalListElm = document.getElementById('update-list-modal');
    modalListElm.classList.remove('is-active');

    return list;
  },

  async fetchDeleteList(data) {
    const response = await fetch(`${API_BASE_URL}/v1/lists/${data.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const modalListElm = document.getElementById('delete-list-modal');
    modalListElm.classList.remove('is-active');
  },
};

export default listService;
