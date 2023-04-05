var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIBEMAIL_APIKEY;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var smtpMailData = new SibApiV3Sdk.SendSmtpEmail();


exports.forgotPassword = async (req, res) => {
    apiKey.apiKey = process.env.SIBEMAIL_APIKEY;

    try {
        console.log('API_KEY>>>>', apiKey)
        const email = req.body.email
        console.log(email)

        const sender = {
            email: 'dilkashpeshimam@gmail.com'
        }
        smtpMailData.sender = sender
        smtpMailData.to = [{
            email: email,
        }];
        smtpMailData.subject = 'Reset Password!';
        smtpMailData.htmlContent = `<html><body><p>Reset Passowrd</p></body></html>`;
        const res = await apiInstance.sendTransacEmail(smtpMailData)
        console.log(res)


    } catch (err) {
        console.log('ERROR IS>>>>>', err)
    }

}