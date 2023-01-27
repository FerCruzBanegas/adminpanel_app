import {
  GraphQLInt as IntType,
} from 'graphql';
import { Currencies } from '../../../models';
import CurrenciesType from '../../../types/siteadmin/CurrenciesType';

const allowPaymentCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType },
    isPayment: { type: IntType }
  },

  async resolve({ request }, { id, isPayment }) {
    try {

      if (request.user && request.user.admin == true) {
        let isCurrencyUpdated = false;

        const updateCurrencies = await Currencies.update(
          {
            isPayment: !isPayment
          },
          {
            where: {
              id: id
            }
          }
        )
          .then(function (instance) {
            // Check if any rows are affected
            if (instance > 0) {
              isCurrencyUpdated = true;
            }
          });

        return {
          status: isCurrencyUpdated ? 200 : 400
        }

      } else {
        return {
          status: 400
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

export default allowPaymentCurrency;