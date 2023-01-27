import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

import { Category } from '../../../models';

const SubCategoryType = new ObjectType({
  name: 'SubCategory',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    image: { type: StringType },
    categoryId: { type: IntType },
    status: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    categoryName: {
      type: StringType,
      async resolve(data) {
        let result = await Category.findOne({
          attributes: ['name'],
          where: {
            id: data && data.categoryId,
          }
        });

        return (result) ? result.name : null
      }
    },
  },
});

export default SubCategoryType;
