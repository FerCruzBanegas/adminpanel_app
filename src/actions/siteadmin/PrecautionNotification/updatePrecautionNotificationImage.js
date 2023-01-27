import gql from 'graphql-tag';
import { removeStaticBannerImage } from './updatePrecautionNotification';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

const mutation = gql`
    mutation updatePrecautionNotificationImage(
        $id:Int!,
        $imageName:String) {
            updatePrecautionNotificationImage(
                id:$id,
                imageName:$imageName) {
                    status
                    errorMessage
            }
    }
`;

export function updatePrecautionNotificationImage({ id, imageName }, oldImage) {

    return async (dispatch, getState, { client }) => {
        try {
            if (oldImage) await removeStaticBannerImage(oldImage);

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    imageName
                }
            });

            if (data.updatePrecautionNotificationImage && data.updatePrecautionNotificationImage.status == 200) {
                showToaster({ messageId: 'updateStatusSuccess', toasterType: 'success' });
            } else {
                showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updatePrecautionNotificationImage && data.updatePrecautionNotificationImage.errorMessage }, toasterType: 'error' });
            }
        }
        catch (error) {
            showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
        }
    };
}