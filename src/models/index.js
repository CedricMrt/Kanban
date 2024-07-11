import Card from './Card.js';
import Label from './Label.js';
import List from './List.js';

// Card <-> List
List.hasMany(Card, {
  as: 'cards',
  foreignKey: {
    name: 'list_id',
    allowNull: false,
  },

  onDelete: 'CASCADE',
});
Card.belongsTo(List, {
  as: 'list',
  foreignKey: {
    name: 'list_id',
    allowNull: false,
  },
});

// Card <-> Label
Card.belongsToMany(Label, {
  as: 'labels',
  through: 'card_has_label',
  foreignKey: 'card_id',
  otherKey: 'label_id',
});
Label.belongsToMany(Card, {
  as: 'cards',
  through: 'card_has_label',
  foreignKey: 'label_id',
  otherKey: 'card_id',
});

export { Card, Label, List };
