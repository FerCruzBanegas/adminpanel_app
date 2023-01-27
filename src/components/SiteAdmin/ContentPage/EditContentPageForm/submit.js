import fetch from 'node-fetch';
import history from '../../../../history';
import { showToaster } from '../../../../helpers/toastrMessgaes/showToaster';

const mutation = `
mutation updateContentPageDetails(
  $id: Int,
  $metaTitle: String,
  $metaDescription: String,
  $pageUrl: String,
  $pageTitle: String,
  $content: String,
  $pageBanner: String
) {
  updateContentPageDetails(
    id: $id,
    metaTitle: $metaTitle,
    metaDescription: $metaDescription,
    pageUrl: $pageUrl,
    pageTitle: $pageTitle,
    content: $content,
    pageBanner: $pageBanner
  ) {
      status
      errorMessage
  }
}
`;

async function submit(values, dispatch) {
  try {
    if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
      showToaster({ messageId: 'addCmsContent', toasterType: 'error' });
      return '';
    }

    values.pageUrl = values.pageUrl && values.pageUrl.toString().trim();

    const response = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: values
      }),
      credentials: 'include'
    });

    const { data } = await response.json();

    if (data && data.updateContentPageDetails && data.updateContentPageDetails.status === 200) {
      showToaster({ messageId: 'updateStatusSuccess', toasterType: 'success' });
      history.push('/siteadmin/contentpage/manage')
    }
    else if (data && data.updateContentPageDetails && data.updateContentPageDetails.status !== 200)
      showToaster({ messageId: 'errorMessage', requestContent: { content: data && data.updateContentPageDetails && data.updateContentPageDetails.errorMessage }, toasterType: 'error' });
    else showToaster({ messageId: 'errorMessage', toasterType: 'error' });
  }
  catch (error) {
    showToaster({ messageId: 'catchMessage', requestContent: { content: error }, toasterType: 'error' });
  }
}

export default submit;