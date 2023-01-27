import gql from 'graphql-tag';
import { api } from '../../config';
import {
  PROFILE_IMAGE_UPLOAD_ERROR,
  PROFILE_IMAGE_UPLOAD_START,
  PROFILE_IMAGE_UPLOAD_SUCCESS
} from '../../constants/index'
import { showToaster } from '../../helpers/toastrMessgaes/showToaster';

export default function uploadProfileImage(id, fileName, oldFile) {

  return async (dispatch, getState, { client }) => {
    dispatch({
      type: PROFILE_IMAGE_UPLOAD_START
    })

    try {
      const mutation = gql`
            mutation uploadProfileImage($userId:ID,$picture:String){
                uploadProfileImage(userId:$userId, picture:$picture) {
                  status
                }
              }
            `
      const { data } = await client.mutate({
        mutation,
        variables: {
          userId: id,
          picture: fileName
        }
      })

      if (oldFile !== undefined) {
        removeProfileImage(oldFile);
      };

      if (data && data.uploadProfileImage && data.uploadProfileImage.status == "200") {
        dispatch({
          type: PROFILE_IMAGE_UPLOAD_SUCCESS
        });
        showToaster({ messageId: 'updateProfileSuccess', toasterType: 'success' });
      } else {
        dispatch({
          type: PROFILE_IMAGE_UPLOAD_ERROR
        })
      }
    } catch (err) {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_ERROR
      })
    }
  }
}

async function removeProfileImage(fileName) {
  try {
    const url = api.apiEndpoint + "/deleteProfileImage";
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
    console.log(err);
  }
}