import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';


class List extends Model {}

List.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'list',
  },
);

export default List;
