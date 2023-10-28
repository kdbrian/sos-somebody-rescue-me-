const {SMS}  = require('../config/at.config');
const userModel = require('../models/user.model');
const catchAsync = require('../util/catchAsync');

exports.helloWorld = catchAsync(async (req, res, next) => {

    const {sessionId, phoneNumber, text, date, serviceCode, status, errorMessage} = req.body;

    let newUserMailAndRegistraation=''

    let resp = ''

    if(text === '')
        resp = `CON Welcome to my Ussd App.\nThe best emergency help-line service, \nto proceed choose an option below,\n1. Register \n2. View T&c \n3. Developer info \n4. Others \n0. Quit`;
    else if(text === '0')
        resp = `END Thank you for choosing emerg. Closed Application`
    else if(text === '1'){
        resp = `CON Provide your institution email and registration number \n(separate by a #) e.g.\n(abc.def@s.karu.ac.ke\n#P101/1200G/20)`
    }
    else if(text && text.startsWith('1*')){
        let email, regNo, tempText
        tempText = text.substring(2, text.length)
        console.log(`Successfully as ${tempText}`);
        [email, regNo] = tempText.split('#')

        console.log(email, regNo);

        const user = await userModel.create({email, registrationNumber:regNo, phoneNumber:phoneNumber});

        // SMS.send({})
        await SMS.send({
            to: `${phoneNumber}`,
            from: `${process.env.AT_SHORTCODE}`,
            message: `Hi ${email}, of registration number ${regNo}. You have successfully registered to the emergency line. Your backup ID : ${user._id}`+
            ` Stay tuned for daily/weekly/monthly/yearly updates`
        }).then(()=>{
            resp = `END You have successfully registered as ${email} with registration ${regNo}`
        }).catch(err => {
            resp = `END Failed to create account due to ${err}. \nPlease try again later.`
        });
        
    }
    else{
        // console.log(text);
        resp = `END Thank you for choosing emerg.`
    }

    // console.log(resp, sessionId, phoneNumber, text, date, serviceCode, status, errorMessage);
    console.log(resp, sessionId, phoneNumber, text,typeof(text), serviceCode);

    res.set('Content-Type: Text/plain');
    res.send(resp);
})

exports.sendSms = catchAsync(async (req,res,next)=>{

    const {sessionId, phoneNumber, text} = req.body



})