const {SMS}  = require('../config/at.config');
const userModel = require('../models/user.model');
const consultationModel = require('../models/consultation.model');
const catchAsync = require('../util/catchAsync');
const promisify = require('promisify');


exports.helloWorld = catchAsync(async (req, res, next) => {

    const {sessionId, phoneNumber, text, date, serviceCode, status, errorMessage} = req.body;

    let newUserMailAndRegistraation=''

    let resp = ''

    const mainUser = await userModel.findOne({phoneNumber});

    if(text === '')
        resp = `CON Welcome to my Ussd App.\nThe best emergency help-line service, \nto proceed choose an option below,\n1. Register \n2. Login \n3. View T&c \n4. Developer info \n5. Others \n0. Quit`;
    else if(text === '0')
        resp = `END Thank you for choosing emerg. Closed Application`
    else if(text === '1'){
        resp = `CON Provide your institution email and registration number \n(separate by a #) e.g.\n(abc.def@s.karu.ac.ke\n#P101/1200G/20)`
    }
    else if(text === '2'){
        resp = `CON Provide your registration number e.g.\n(P101/1200G/20)`
    }else if(text === '4'){
        resp = `END \ngithub.com/junrdev\nlinkedin.com/Brian-Kidiga\njuniorprogrammer09@gmail.com\nkaru.ac.ke`
    }
    else if(text && text.startsWith('1*')){
        let email, regNo, tempText
        tempText = text.substring(2, text.length)
        console.log(`Successfully as ${tempText}`);
        [email, regNo] = tempText.split('#')

        email = email.trim()
        regNo = regNo.trim()

        console.log(email, regNo);

        const _user = await userModel.findOne({email});

        if( _user == null){
            const user = await userModel.create({email, registrationNumber:regNo, phoneNumber:phoneNumber});

            // SMS.send({})
            await SMS.send({
                to: `${phoneNumber}`,
                from: `${process.env.AT_SHORTCODE}`,
                message: `Hi ${email}, of registration number ${regNo}. You have successfully registered to the emergency line. Your backup ID : ${user._id}`+
                ` Stay tuned for daily/weekly/monthly/yearly updates`
            })
            .then(()=>{
                resp = `END You have successfully registered as ${email} with registration ${regNo}`
            }).catch(err => {
                resp = `END Failed to create account due to ${err}. \nPlease try again later.`
            });
        
        }else{
            resp=`END Duplicate credentials found please login`
        }

        
    }
    else if(text && text.startsWith('2*') && text.split('*').length === 2){
        let regNo = text.substring(2, text.length).trim()
        
        const user = await userModel.findOne({registrationNumber:regNo});

        // console.log(user);

        console.log(text.split('*')[text.split('*').length -1]);
        if(user != null){
            resp = `CON 1. Consltation\n2. Emergency \n3. Call for ambulance \n4. SOS \n0. Quit`
        }else{
            resp = `END Invalid credentials`
        }

        

    }
    else if(text && text.startsWith('2*') && text.split('*').length === 3){

        // console.log(text.split('*')[text.split('*').length -1]);
        const desc = text.split('*')[text.split('*').length -1];

        switch (text.split('*')[text.split('*').length -1]) {
            case '1':
                console.log('cons');
                resp = `CON please fill out the details to get a doctor assigned`
                break;
        
            default:
                resp = `END Thank you for choosing emerg. Closed Application`
                break;
        }
    }
    else if(text && text.startsWith('2*') && text.split('*').length === 4){

        console.log("Here");
        console.log(text.split('*')[text.split('*').length -1]);

        const _cons = await consultationModel.create({description:desc, user : mainUser});

        await SMS.send({
            to:phoneNumber,
            from:process.env.AT_SHORTCODE,
            message:`Successfully requested for a consultation session.\nWe will provide all the info when ready, via the specified channels\n`+
            `To track your order use ID: ${_cons._id}. \nThank you for choosing us`
        })
        .then(()=>{
            resp = `END Successfully created consultation. Check your inbox for more details`
        }).catch(err => {
            resp = `END Error while processing request please try again later`
        });;

    }

    // console.log(resp, sessionId, phoneNumber, text, date, serviceCode, status, errorMessage);
    console.log(resp, sessionId, phoneNumber, text,typeof(text), serviceCode);

    res.set('Content-Type: Text/plain');
    res.send(resp);
})

exports.recieveSms = catchAsync(async (req,res,next)=>{
   
        const data = req.body;
        console.log(`Received message: \n ${data}`);
        res.sendStatus(200);
   
})