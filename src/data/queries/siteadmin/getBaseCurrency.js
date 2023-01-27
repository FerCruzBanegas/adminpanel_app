import CurrenciesType from '../../types/siteadmin/CurrenciesType';
import { Currencies } from '../../models';

const getBaseCurrency = {

  type: CurrenciesType,

  async resolve({ request }) {

    return await Currencies.findOne({
      where: {
        isBaseCurrency: true
      }
    });

  },
};

export default getBaseCurrency;
