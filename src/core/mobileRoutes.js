import { sendEmail } from './email/sendEmail';

const mobileRoutes = app => {

  app.post('/sendEmailTemplate', function (req, res, next) {
    next();
  }, async (req, res) => {

    let status = 200, errorMessage;
    let requestData = req.body;
    let sendEmailStatus;

    try {

      if (requestData.to && requestData.type) {
        sendEmailStatus = await sendEmail(requestData.to, requestData.type, requestData.content);
        status = sendEmailStatus.status;
        errorMessage = sendEmailStatus.response;
      } else {
        status = 400;
        errorMessage = 'Receipt address or template type is required';
      }

    } catch (error) {
      status = 400;
      errorMessage = 'Something went wrong!, ' + error;
    }

    res.send({
      status,
      errorMessage
    });
  });
};

export default mobileRoutes;
