import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageCity = {

    type: HomePageType,

    args: {
        citySectionTitle1: { type: StringType },
        citySectionContent1: { type: StringType }
    },

    async resolve({ request }, {
        citySectionTitle1,
        citySectionContent1
    }) {

        if (request.user && request.user.admin == true) {

            let isCityPageUpdated = false;

            const updateCitySectionTitle1 = await HomePage.update({ value: citySectionTitle1 }, { where: { name: 'citySectionTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isCityPageUpdated = true;
                    } else {
                        isCityPageUpdated = false;
                    }
                });

            const updateCitySectionContent1 = await HomePage.update({ value: citySectionContent1 }, { where: { name: 'citySectionContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isCityPageUpdated = true;
                    } else {
                        isCityPageUpdated = false;
                    }
                });

            return {
                status: isCityPageUpdated ? 200 : 400
            }

        } else {
            return {
                status: 500,
                errorMessage: "Oops! Please login with your account and try again."
            }
        }
    }
}

export default updateHomePageCity;

/*
mutation updateHomePageCity (
  $citySectionTitle1: String
  $citySectionContent1: String
) {
  updateHomePageCity (
    citySectionTitle1: $citySectionTitle1
    citySectionContent1: $citySectionContent1
  ) {
    status
  }
}
*/