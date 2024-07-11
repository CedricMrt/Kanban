import { z } from 'zod';
import { Label } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';
import cardController from './cardController.js';

const labelSchema = z.object({
  name: z.string().min(1),
  color: z.string(),
});

const LabelController = {
  async getAll(req, res) {
    const labels = await Label.findAll({
      order: [['name', 'ASC']],
    });
    res.json(labels);
  },
  async getOne(req, res) {
    const id = req.params.id;

    const label = await Label.findByPk(id);
    if (!label) {
      throw new NotFoundError(
        'Label not found. Please verify the provided ID.',
      );
    }
    res.json(label);
  },
  async create(req, res) {
    const body = {
      name: req.body.name,
      color: req.body.color,
    };
    const data = labelSchema.parse(body);

    const label = await Label.create(data);
    res.json(label);
  },
  async update(req, res) {
    const id = req.params.id;

    const data = labelSchema.partial().parse(req.body);

    const label = await Label.findByPk(id);
    if (!label) {
      throw new NotFoundError(
        'Label not found. Please verify the provided ID.',
      );
    }

    await label.update(data);

    res.json(label);
  },
  async delete(req, res) {
    const id = req.params.id;

    const label = await Label.findByPk(id);
    if (!label) {
      throw new NotFoundError(
        'Label not found. Please verify the provided ID.',
      );
    }

    await label.destroy();

    res.status(204).send();
  },
};

export default LabelController;
