
import Sequelize, { Op } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.databaseUrl, {
  operatorsAliases: Op,
  define: {
    freezeTableName: true,
  },
  logQueryParameters: true,
});

export default sequelize;
