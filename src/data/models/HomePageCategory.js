import DataType from 'sequelize';
import Model from '../sequelize';

const HomePageCategory = Model.define('HomePageCategory', {

    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING
    },

    description: {
        type: DataType.TEXT
    },

    logo: {
        type: DataType.STRING
    },

    banner: {
        type: DataType.STRING
    }

});

export default HomePageCategory;