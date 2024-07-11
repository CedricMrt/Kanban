import labelService from '../services/label';

const labelModule = {
  addLabelToCard(cardId, label) {
    const cardElm = document.querySelector(
      `[slot="card-id"][data-id="${cardId}"]`,
    );
    const cardBodyELm = cardElm.querySelector('.card-body');

    const labelDivElm = document.createElement('div');
    labelDivElm.classList.add('tags', 'has-addons');
    Object.assign(labelDivElm.dataset, { id: label.id });

    cardBodyELm.appendChild(labelDivElm);

    const labelSpanElm = document.createElement('span');
    labelSpanElm.classList.add('tag', 'm-1');
    labelSpanElm.style.backgroundColor = label.color;
    labelSpanElm.textContent = label.name;

    labelDivElm.appendChild(labelSpanElm);

    const labelAnchorElm = document.createElement('a');
    labelAnchorElm.classList.add('tag', 'is-delete');
    labelDivElm.appendChild(labelAnchorElm);

    const labelDeleteElms = document.querySelectorAll('.tag.is-delete');

    labelDeleteElms.forEach((label) => {
      label.addEventListener('click', async () => {
        const cardId = label.closest('.card').dataset.id;
        const labelId = label.closest('.tags').dataset.id;
        await labelService.deleteLabelOnCard(cardId, labelId);
        label.closest('.tags').remove();
      });
    });
  },

  handleSubmitLabelForm(event) {
    event.preventDefault();
    const cardId = document.querySelector('input[name="card_id"]').value;
    const selectLabelElm = document.getElementById('label-select');
    selectLabelElm.addEventListener('change', (event) => {
      return event.target.value;
    });
    labelService.addLabelToCard(cardId, selectLabelElm.value);
    const modalLabelElm = document.getElementById('add-label-modal');
    modalLabelElm.classList.remove('is-active');
  },

  handleSubmitCreateLabelForm(event) {
    event.preventDefault();
    const picker = document.querySelector('#color-picker-label');
    picker.addEventListener('color-changed', (event) => {
      const newColor = event.detail.value;
    });

    const formElm = event.currentTarget;

    const formData = new FormData(formElm);

    const data = Object.fromEntries(formData);
    data.color = picker.color;

    labelService.createLabel(data);

    const modalCreateLabelElm = document.getElementById('add-label-modal');
    modalCreateLabelElm.classList.remove('is-active');
  },
};

export default labelModule;
