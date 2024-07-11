import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';

class Label extends Model {}

Label.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    color: {
      type: DataTypes.TEXT,
      defaultValue: '#0F0',
    },
  },
  {
    sequelize,
    tableName: 'label',
  },
);

export default Label;
