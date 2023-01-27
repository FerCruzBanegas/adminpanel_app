import gql from 'graphql-tag';
import { showToaster } from '../../../helpers/toastrMessgaes/showToaster';

export function updateTempImages(tableName, fieldName, fileName) {

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation updateTempImages(
          $tableName: String,
          $fieldName: String,
          $fileName: String
        ) {
        updateTempImages(
          tableName: $tableName,
          fieldName: $fieldName,
          fileName: $fileName
        ){
          status
        }
      }
    `;


    const { data } = await client.mutate({
      mutation,
      variables: {
        tableName,
        fieldName,
        fileName
      }
    });


    if (data && data.updateTempImages && data.updateTempImages.status == 200) {
      showToaster({ messageId: 'tempImage', requestContent: { fileName }, toasterType: 'success' });
    } else {
      showToaster({ messageId: 'errorMessage', toasterType: 'error' });
    }
  }
}