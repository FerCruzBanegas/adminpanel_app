import gql from 'graphql-tag';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
    mutation ($homePageCategoryList: [categoryListInputType]!) {
        updateHomePageCategory (homePageCategoryList: $homePageCategoryList) {
        status
        errorMessage
        }
    }
`;

export function updateHomePageCategory({ categoryList }) {

    try {
        return async (dispatch, getState, { client }) => {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    homePageCategoryList: categoryList.map(item => ({
                        title: item.title,
                        description: item.description,
                        logo: item.logo,
                        banner: item.banner
                    }))
                }
            });

            if (data && data.updateHomePageCategory && data.updateHomePageCategory.status == 200) showToaster({ messageId: 'updateHomeSuccess', toasterType: 'success' });
            else showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateHomePageCategory && data.updateHomePageCategory.errorMessage }, toasterType: 'error' });
        };
    }
    catch (error) {
        showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
    }
}