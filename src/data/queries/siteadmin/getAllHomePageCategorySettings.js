import { HomePageCategory } from '../../models';
import { HomePageCategoryCommonType } from '../../types/siteadmin/HomePageCategoryType';


const getAllHomePageCategorySettings = {
  type: HomePageCategoryCommonType,

  async resolve({ requset }) {
    try {
      const results = await HomePageCategory.findAll();
      return {
        status: 200,
        results
      };
    }
    catch (error) {
      return {
        status: 400,
        errorMessage: "Something went wrong " + error
      };
    }
  }
}

export default getAllHomePageCategorySettings;

/**
 query getAllHomePageCategorySettings {
        getAllHomePageCategorySettings {
            status
            errorMessage
            results{
           title
           description
           logo
           banner
            }
        }
    }
 */