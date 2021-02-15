const axios = require('axios');
const qs = require("querystring");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const hostname = process.env.API_HOSTNAME || "http://localhost:3000";

const replyToAppointment = (customerPhone, Message, twiml, context) => {
  const message = Message.toLowerCase();
  let path;

  if (message === 'yes') {
    path = '/api/appointments/confirm';
  } else if (message === 'no') {
    path = '/api/appointments/cancel';
  } else {
    // TODO: handle bad customer replies
    twiml.message('please enter yes or no, your answer was:\n' + Message);
    return;
  }

  // TODO: handle errors correctly and add a proper logging
  return axios.post(`${hostname}${path}`, {customerPhone, message})
    .then((res) => {
      context.log('passed!');
      context.log('statusCode: ' + res.statusCode);
      //context.log(res);
    })
    .catch((err) => {
      // TODO: handle API error correctly
      context.log(err);
    });
};

module.exports = async function (context, req) {
  const formValues = qs.parse(req.body);

  context.log(`Customer SMS reply with SmsSid: ${formValues.SmsSid} processed!`);

  const twiml = new MessagingResponse();

  await replyToAppointment(formValues.From, formValues.Body, twiml, context);

  context.res = {
    status: 200,
    body: twiml.toString(),
    headers: { 'Content-Type': 'application/xml' },
    isRaw: true
  };

  context.done();
};
