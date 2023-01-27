import gql from 'graphql-tag';
import history from '../../history';
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

let query = gql`
query getContentPageDetails {
    getContentPageDetails {
        status
        errorMessage
        results{
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        isEnable
        pageBanner
        }
    }
}
`;

export function deleteContentPageDetails(id) {
    try {
        return async (dispatch, getState, { client }) => {
            let requestContent = {};
            let mutation = gql`
                mutation deleteContentPage ($id: Int!) {
                    deleteContentPage (id: $id) {
                        status
                        errorMessage
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query }]
            });

            if (data && data.deleteContentPage && data.deleteContentPage.status === 200) {
                showToaster({ messageId: 'deleteContentSuccess', toasterType: 'success' });
                history.push('/siteadmin/contentpage/manage')
            }
            else if (data && data.deleteContentPage && data.deleteContentPage.status !== 200) {
                requestContent = {
                    content: data.deleteContentPage.errorMessage
                };
                showToaster({ messageId: 'errorMessage', requestContent, toasterType: 'error' });
            }
            else showToaster({ messageId: 'errorMessage', toasterType: 'error' });
        }
    }
    catch (error) {
        showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
    }
}

export function updateContentPageStatus(id, isEnable) {
    try {
        return async (dispatch, getState, { client }) => {
            let requestContent = {};
            let mutation = gql`
            mutation updateContentPageStatus ($id: Int, $isEnable: Boolean) {
                updateContentPageStatus(id: $id, isEnable: $isEnable){
                    status
                    errorMessage
                }
            }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query }]
            });

            if (data && data.updateContentPageStatus && data.updateContentPageStatus.status === 200) {
                showToaster({ messageId: 'updateStatusSuccess', toasterType: 'success' });
                history.push('/siteadmin/contentpage/manage')
            }
            else if (data && data.updateContentPageStatus && data.updateContentPageStatus.status !== 200) {
                requestContent = {
                    content: data.updateContentPageStatus.errorMessage
                };
                showToaster({ messageId: 'errorMessage', requestContent, toasterType: 'error' });
            }
            else showToaster({ messageId: 'errorMessage', toasterType: 'error' });

        }
    } catch (error) {
        showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
    }
}