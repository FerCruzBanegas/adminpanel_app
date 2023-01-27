import messages from '../../../locale/messages'

const validate = values => {

  const errors = {}

  if (!values.userAndroidVersion) {
    errors.userAndroidVersion = messages.required;
  } else if (values.userAndroidVersion && values.userAndroidVersion.toString().trim() === '') {
    errors.userAndroidVersion = messages.required;
  } else if (values.userAndroidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.userAndroidVersion)) {
    errors.userAndroidVersion = messages.invalidVersionNumber;
  }

  if (!values.userIosVersion) {
    errors.userIosVersion = messages.required
  } else if (values.userIosVersion.trim() == '') {
    errors.userIosVersion = messages.required
  } else if (values.userIosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.userIosVersion)) {
    errors.userIosVersion = messages.invalidVersionNumber;
  }
  if (!values.partnerAndroidVersion) {
    errors.partnerAndroidVersion = messages.required
  } else if (values.partnerAndroidVersion.trim() == '') {
    errors.partnerAndroidVersion = messages.required
  } else if (values.partnerAndroidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.partnerAndroidVersion)) {
    errors.partnerAndroidVersion = messages.invalidVersionNumber;
  }
  if (!values.partnerIosVersion) {
    errors.partnerIosVersion = messages.required
  } else if (values.partnerIosVersion.trim() == '') {
    errors.partnerIosVersion = messages.required
  } else if (values.partnerIosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.partnerIosVersion)) {
    errors.partnerIosVersion = messages.invalidVersionNumber;
  }


  if (!values.stripePublishableKey) {
    errors.stripePublishableKey = messages.required;
  } else if (values.stripePublishableKey && values.stripePublishableKey.toString().trim() == "") {
    errors.stripePublishableKey = messages.required;
  }

  if (!values.contactEmail) {
    errors.contactEmail = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.contactEmail)) {
    errors.contactEmail = messages.emailInvalid;
  }

  if (!values.contactPhoneNumber) {
    errors.contactPhoneNumber = messages.required;
  } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.contactPhoneNumber)) {
    errors.contactPhoneNumber = messages.phoneError;
  }

  if (values.skype && values.skype.toString().trim() === '') {
    errors.skype = messages.invalid;
  }

  if (!values.allowedServices) {
    errors.allowedServices = messages.required;
  } else if (values.allowedServices === '0' || isNaN(values.allowedServices) || !/^[0-9]+$/.test(values.allowedServices)) {
    errors.allowedServices = messages.invalid;
  }

  if (values.notificationInterval === '0' || isNaN(values.notificationInterval) || !/^[0-9\.]+$/.test(values.notificationInterval)) {
    errors.notificationInterval = messages.invalid;
  } else if (values.notificationInterval < 0.5) {
    errors.notificationInterval = messages.validateInterval;
  }

  if (!values.maximumEmergencyContact) {
    errors.maximumEmergencyContact = messages.required;
  } else if (values.maximumEmergencyContact === '0' || isNaN(values.maximumEmergencyContact) || !/^[0-9]+$/.test(values.maximumEmergencyContact)) {
    errors.maximumEmergencyContact = messages.invalid;
  }

  if (values.defaultScheduleInterval === '0' || isNaN(values.defaultScheduleInterval) || !/^[0-9\.]+$/.test(values.defaultScheduleInterval)) {
    errors.defaultScheduleInterval = messages.invalid;
  } else if (values.defaultScheduleInterval < 20) {
    errors.defaultScheduleInterval = messages.validateScheduleInterval;
  }

  return errors
}

export default validate;
