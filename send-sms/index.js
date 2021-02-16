const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

module.exports = async function (context, smsInfo) {
  context.log('Incoming message', smsInfo);

  const [phone, ...messageContent] = smsInfo.split(',');

  const message = messageContent.join();

  client.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to: phone
  });
};
