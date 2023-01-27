import DataType from 'sequelize';
import Model from '../sequelize';

const UserCategory = Model.define('UserCategory', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    mainCategoryId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    subCategoryId: {
        type: DataType.INTEGER,
        allowNull: false
    }

});

export default UserCategory;