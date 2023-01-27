import gql from 'graphql-tag';
import { api } from '../../../config';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
    mutation updatePrecautionNotification(
        $id:Int, 
        $title:String!,
        $description:String!, 
        $isEnabled:Boolean!, 
        $imageName:String) {
            updatePrecautionNotification(
                id:$id, 
                title:$title, 
                description:$description, 
                isEnabled:$isEnabled, 
                imageName:$imageName) { 
                    status
                    errorMessage
            }
    }
`;

export function updatePrecautionNotification({ id, title, description, isEnabled, imageName }) {

    return async (dispatch, getState, { client }) => {
        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    title,
                    description,
                    isEnabled: isEnabled === 'true',
                    imageName
                }
            });

            if (data.updatePrecautionNotification.status == 200) {
                showToaster({ messageId: 'updateStatusSuccess', toasterType: 'success' });
            } else {
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updatePrecautionNotification && data.updatePrecautionNotification.errorMessage }, toasterType: 'error' });
            }
        }
        catch (error) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
        }
    };
}

export async function removeStaticBannerImage(fileName) {
    try {
        const url = api.apiEndpoint + "/deleteStaticBannerImage";
        const resp = await fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName }),
        });

        const { status } = await resp.json();

        if (status) {
            return {
                status
            };
        }

    } catch (err) {
        showToaster({ messageId: 'catchMessage', requestContent: { content: err }, toasterType: 'error' });
    }
}