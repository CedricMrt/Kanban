import labelModule from '../modules/label';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const labelService = {
  async getAllLabels() {
    const response = await fetch(`${API_BASE_URL}/v1/labels`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const labels = await response.json();
    return labels;
  },

  async deleteLabelOnCard(card_id, labelId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/cards/${card_id}/labels/${labelId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  },

  async addLabelToCard(cardId, labelId) {
    const response = await fetch(
      `${API_BASE_URL}/v1/cards/${cardId}/labels/${labelId}`,
      {
        method: 'PUT',
      },
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const label = await response.json();

    return labelModule.addLabelToCard(cardId, label);
  },

  async createLabel(data) {
    const response = await fetch(`${API_BASE_URL}/v1/labels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const label = await response.json();

    return labelModule.addLabelToCard(data.card_id, label);
  },
};

export default labelService;
