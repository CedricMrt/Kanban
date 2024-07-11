import { z } from 'zod';
import { List } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

const listSchema = z.object({
  title: z.string().min(1),
  position: z.number().int().min(0).optional(),
});

const listController = {
  async getAll(req, res) {
    const lists = await List.findAll({
      order: [
        ['position', 'ASC'],
        ['cards', 'position', 'ASC'],
      ],
      include: [
        {
          association: 'cards',
          include: [
            {
              association: 'labels',
            },
          ],
        },
      ],
    });
    res.json(lists);
  },
  async getOne(req, res) {
    const id = req.params.id;

    const list = await List.findByPk(id);
    if (!list) {
      throw new NotFoundError('List not found. Please verify the provided ID.');
    }
    res.json(list);
  },
  async create(req, res) {
    const data = listSchema.parse(req.body);

    const list = await List.create(data);
    res.status(201).json(list);
  },
  async update(req, res) {
    const id = req.params.id;
    // .partial permet de rendre optionnel les propriétés du schéma
    const data = listSchema.partial().parse(req.body);

    const list = await List.findByPk(id);
    if (!list) {
      throw new NotFoundError('List not found. Please verify the provided ID.');
    }

    // Pour mettre à jour les données, on utilise la méthode update de mon instance de modèle
    await list.update(data);

    res.json(list);
  },
  async delete(req, res) {
    const id = req.params.id;

    const list = await List.findByPk(id);
    if (!list) {
      throw new NotFoundError('List not found. Please verify the provided ID.');
    }

    await list.destroy();

    res.status(204).send();
  },
};

export default listController;
