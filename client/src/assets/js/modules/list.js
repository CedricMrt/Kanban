import listService from '../services/list.js';

const listModule = {
  addListToListsContainer(list) {
    const listsContainerElm = document.getElementById('lists-container');
    const listTemplate = document.querySelector('#list-template');

    const instance = listTemplate.content.cloneNode(true);

    let sectionElm = instance.querySelector('[slot="list-id"]');
    Object.assign(sectionElm.dataset, list);

    let listTitle = instance.querySelector('#list-title');
    listTitle.textContent = list.title;

    const updateButtonElm = instance.querySelector('.updateList');
    updateButtonElm.addEventListener('click', () => {
      const modalListElm = document.getElementById('update-list-modal');
      modalListElm.classList.add('is-active');

      modalListElm.querySelector('input[name="id"]').value = list.id;
      modalListElm.querySelector('input[name="title"]').value = list.title;
    });

    const deleteButtonElm = instance.querySelector('.deleteList');
    deleteButtonElm.addEventListener('click', () => {
      const modalListElm = document.getElementById('delete-list-modal');
      modalListElm.classList.add('is-active');

      modalListElm.querySelector('input[name="id"]').value = list.id;
    });

    const addCardButtonElm = instance.querySelector('.addCard');
    addCardButtonElm.addEventListener('click', () => {
      const modalCardElm = document.getElementById('add-card-modal');
      modalCardElm.classList.add('is-active');

      modalCardElm.querySelector('input[name="list_id"]').value = list.id;
    });

    listsContainerElm.append(instance);
  },

  activeModal() {
    const modalListElm = document.getElementById('add-list-modal');
    modalListElm.classList.add('is-active');
  },

  closeActiveModal(event) {
    const btnCloseModalElm = event.currentTarget;

    const modalElm = btnCloseModalElm.closest('.modal');

    modalElm.classList.remove('is-active');
  },

  async handleSubmitListForm(event) {
    event.preventDefault();

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);

    const listElms = document.querySelectorAll('[slot= "list-id"]');
    data.position = listElms.length;

    try {
      await listService.fetchCreateList(data);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la creation de la liste');
    }
  },

  async handleUpdateSubmitListForm(event) {
    event.preventDefault();

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);

    try {
      const listUpdated = await listService.fetchUpdateList(data);
      const listElm = document.querySelector(
        `[slot="list-id"][data-id="${listUpdated.id}"]`,
      );

      const listNameElm = listElm.querySelector('#list-title');

      listNameElm.textContent = listUpdated.title;
      Object.assign(listElm.dataset, listUpdated);
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la modification de la liste');
    }
  },

  async handleDeleteSubmitListForm(event) {
    event.preventDefault();

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);

    try {
      await listService.fetchDeleteList(data);

      const listElm = document.querySelector(`[data-id="${data.id}"]`);

      listElm.remove();
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la suppression de la liste');
    }
  },
};

export default listModule;
