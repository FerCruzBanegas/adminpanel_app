import {
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType
} from 'graphql';
import { Currencies, CurrencyRates, UserProfile, User } from '../../../models';
import CurrenciesType from '../../../types/siteadmin/CurrenciesType';

const updateCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType },
    isEnable: { type: BooleanType },
    symbol: { type: StringType }
  },

  async resolve({ request }, { id, isEnable, symbol }) {
    try {

      if (request.user && request.user.admin == true) {
        let updateCurrency;

        const findAlreadyExist = await Currencies.findOne({
          attributes: ['id'],
          where: {
            symbol
          }
        });

        const findValidCurrency = await CurrencyRates.findOne({
          attributes: ['currencyCode'],
          where: {
            currencyCode: symbol
          }
        });

        const users = await UserProfile.findOne({
          attributes: ['preferredCurrency'],
          where: {
            preferredCurrency: symbol
          },
          include: [{
            model: User,
            as: 'user',
            attributes: ['id'],
            required: true,
            where: {
              deletedAt: null
            },
          }],
          raw: true
        });

        if (!findValidCurrency && !id) {
          return {
            status: 400,
            errorMessage: 'Sorry, Please add the valid currency!'
          }
        }

        if (findAlreadyExist && !id) {
          return {
            status: 400,
            errorMessage: 'Sorry, it looks like the currency is already exist.'
          }
        }

        if (id) {

          if (users) {
            return {
              status: 400,
              errorMessage: 'Oops! This currency is used as the preferred currency.'
            }
          }

          updateCurrency = await Currencies.update(
            {
              isEnable: !isEnable
            },
            {
              where: {
                id
              }
            }
          );
        } else {
          updateCurrency = await Currencies.create(
            {
              isEnable,
              symbol
            }
          );
        }

        return {
          status: updateCurrency ? 200 : 400
        }

      } else {
        return {
          status: 400,
          errorMessage: 'Something went wrong, Please login.',
        }
      }
    } catch (error) {
      return {
        errorMessage: 'Something went wrong ' + error,
        status: 400
      };
    }
  },
};

export default updateCurrency;