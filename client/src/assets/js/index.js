import listService from './services/list.js';
import listModule from './modules/list.js';
import cardModule from './modules/card.js';
import labelModule from './modules/label.js';
import Sortable from 'sortablejs';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const app = {
  init() {
    app.fetchAndDisplayLists();
    app.listenToClickOnAddListModal();
    app.listenToClickOnModalClosingElements();
    app.listenToSubmitOnAddListForm();
    app.listenToSubmitOnUpdateListForm();
    app.listenToSubmitOnDeleteListForm();

    app.listenToSubmitOnAddCardForm();
    app.listenToSubmitOnUpdateCardForm();
    app.listenToSubmitOnDeleteCardForm();

    app.listenToClickOnAddLabelForm();
    app.listenToSubmitOnCreateLabelForm();
  },

  /* ########### function for lists ############ */

  async fetchAndDisplayLists() {
    try {
      const lists = await listService.getLists();
      const listsElm = document.getElementById('lists-container');
      listsElm.textContent = '';

      lists.forEach((list) => {
        listModule.addListToListsContainer(list);

        list.cards.forEach((card) => {
          cardModule.addCardToList(list.id, card);

          card.labels.forEach((label) => {
            labelModule.addLabelToCard(card.id, label);
          });
        });

        this.initializeCardSortable(list.id);
      });

      this.initializeListSortable();
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la récupération des listes');
    }
  },

  listenToClickOnAddListModal() {
    const buttonAddListElm = document.getElementById('addList');

    buttonAddListElm.addEventListener('click', listModule.activeModal);
  },

  listenToClickOnModalClosingElements() {
    const btnCloseModalElms = document.querySelectorAll('.modal .close');
    btnCloseModalElms.forEach((btnCloseModalElm) => {
      btnCloseModalElm.addEventListener('click', listModule.closeActiveModal);
    });
  },

  listenToSubmitOnAddListForm() {
    const addListFormElm = document.getElementById('addListForm');
    addListFormElm.addEventListener('submit', listModule.handleSubmitListForm);
  },

  listenToSubmitOnUpdateListForm() {
    const updateListFormElm = document.getElementById('updateListForm');
    updateListFormElm.addEventListener(
      'submit',
      listModule.handleUpdateSubmitListForm,
    );
  },

  listenToSubmitOnDeleteListForm() {
    const deleteListFormElm = document.getElementById('deleteListForm');
    deleteListFormElm.addEventListener(
      'submit',
      listModule.handleDeleteSubmitListForm,
    );
  },

  /* ########### function for card ########### */

  listenToSubmitOnAddCardForm() {
    const addCardFormElm = document.getElementById('addCardForm');
    addCardFormElm.addEventListener('submit', cardModule.handleSubmitCardForm);
  },

  listenToSubmitOnUpdateCardForm() {
    const updateCardFormElm = document.getElementById('updateCardForm');
    updateCardFormElm.addEventListener(
      'submit',
      cardModule.handleUpdateSubmitCardForm,
    );
  },

  listenToSubmitOnDeleteCardForm() {
    const deleteCardFormElm = document.getElementById('deleteCardForm');
    deleteCardFormElm.addEventListener(
      'submit',
      cardModule.handleDeleteSubmitCardForm,
    );
  },

  initializeListSortable() {
    const listsContainer = document.getElementById('lists-container');

    new Sortable(listsContainer, {
      animation: 150,
      ghostClass: 'blue-background-class',
      handle: '.message-header',
      onEnd: async () => {
        const allLists = document.querySelectorAll('#lists-container section');

        allLists.forEach(async (list, index) => {
          const listPosition = index;
          const listId = list.dataset.id;

          const response = await fetch(`${API_BASE_URL}/v1/lists/${listId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              position: listPosition,
            }),
          });
          if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
        });
      },
    });
  },

  initializeCardSortable(listId) {
    const cardContainer = document.querySelector(
      `[slot="list-id"][data-id="${listId}"] .message-body`,
    );

    new Sortable(cardContainer, {
      group: 'shared',
      animation: 150,
      onEnd: async (event) => {
        const allCards = document.querySelectorAll(
          '#lists-container section article',
        );

        allCards.forEach(async (card) => {
          const cardId = event.item.dataset.id;
          const newListId = Number(
            event.to.closest('[slot="list-id"]').dataset.id,
          );
          const newIndex = Number(
            Array.from(event.to.children).indexOf(event.item),
          );

          const response = await fetch(`${API_BASE_URL}/v1/cards/${cardId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              list_id: newListId,
              position: newIndex,
            }),
          });
          if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
        });
      },
    });
  },

  /* ########### function for label ########### */

  listenToClickOnAddLabelForm() {
    const addLabelFormElm = document.getElementById('add-label-form');
    addLabelFormElm.addEventListener(
      'submit',
      labelModule.handleSubmitLabelForm,
    );
  },
  listenToSubmitOnCreateLabelForm() {
    const createLabelFormElm = document.getElementById('create-label-form');
    createLabelFormElm.addEventListener(
      'submit',
      labelModule.handleSubmitCreateLabelForm,
    );
  },
};

app.init();
