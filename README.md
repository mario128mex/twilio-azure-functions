# twilio-demo azure functions
Support azure functions that assist twilio-demo API

## Available functions

#### `send-sms`
This function is triggered by a queue named `incoming-sms`, in order to make this work, a storage account should be created in the same resource group and it should contain a queue with the same name, then the function should be configured to listen to the created storage account

#### `sms-received-webhook`
A function that is triggered every time our twilio phone number receives an SMS, in order to make this function to work, we need to tell to our twilio account, that this function URL will be used as an SMS webhook for our number


## Environment variables
The following vars need to be defined in the configuration section of Function App settings in portal.azure.com
* `API_HOSTNAME`: The hostname of our API
* `TWILIO_ACCOUNT_SID`: the SID of your Twilio account
* `TWILIO_AUTH_TOKEN`: the auth token of your Twilio account
* `TWILIO_PHONE_NUMBER`: the phone number used by your Twilio account
