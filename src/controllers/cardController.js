import { z } from 'zod';
import { Card, Label } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

const cardSchema = z.object({
  content: z.string().min(1),
  color: z.string().optional(),
  position: z.number().int().min(0).optional(),
  list_id: z.number().int().min(1),
});

const cardController = {
  async getAll(req, res) {
    const cards = await Card.findAll({
      order: [['position', 'ASC']],
    });
    res.json(cards);
  },
  async getOne(req, res) {
    const id = req.params.id;

    const card = await Card.findByPk(id);
    if (!card) {
      throw new NotFoundError('Card not found. Please verify the provided ID.');
    }
    res.json(card);
  },
  async create(req, res) {
    const data = cardSchema.parse(req.body);

    const card = await Card.create(data);
    res.status(201).json(card);
  },
  async update(req, res) {
    const id = req.params.id;
    // .partial permet de rendre optionnel les propriétés du schéma
    const data = cardSchema.partial().parse(req.body);

    const card = await Card.findByPk(id);
    if (!card) {
      throw new NotFoundError('Card not found. Please verify the provided ID.');
    }

    // Pour mettre à jour les données, on utilise la méthode update de mon instance de modèle
    await card.update(data);

    res.json(card);
  },
  async delete(req, res) {
    const id = req.params.id;

    const card = await Card.findByPk(id);
    if (!card) {
      throw new NotFoundError('Card not found. Please verify the provided ID.');
    }

    await card.destroy();

    res.status(204).send();
  },

  async addLabel(req, res) {
    const { card_id, label_id } = req.params;

    const card = await Card.findByPk(card_id);
    if (!card) {
      throw new NotFoundError('Card not found. Please verify the provided ID.');
    }

    const label = await Label.findByPk(label_id);
    if (!label) {
      throw new NotFoundError(
        'Label not found. Please verify the provided ID.',
      );
    }

    const alreadyHaveLabel = await card.hasLabel(label);

    if (!alreadyHaveLabel) {
      await card.addLabel(label);
    }

    res.json(label);
  },

  async removeLabel(req, res) {
    const { card_id, label_id } = req.params;

    const card = await Card.findByPk(card_id);
    if (!card) {
      throw new NotFoundError('Card not found. Please verify the provided ID.');
    }

    const label = await Label.findByPk(label_id);
    if (!label) {
      throw new NotFoundError(
        'Label not found. Please verify the provided ID.',
      );
    }

    await card.removeLabel(label);

    res.status(204).send();
  },
};

export default cardController;
