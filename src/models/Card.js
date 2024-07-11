import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';

class Card extends Model {}

Card.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    color: {
      type: DataTypes.TEXT,
      defaultValue: '#F0F',
    },
  },
  {
    sequelize,
    tableName: 'card',
  },
);

export default Card;
