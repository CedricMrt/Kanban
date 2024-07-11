import sequelize from '../database/client.js';
import '../models/index.js';

(async () => {
  console.log('Syncing database');
  await sequelize.sync({ force: true });
  console.log('Database synced');
  await sequelize.close();
})();
