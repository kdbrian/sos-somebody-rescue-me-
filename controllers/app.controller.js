const {SMS}  = require('../config/at.config');
const userModel = require('../models/user.model');
const consultationModel = require('../models/consultation.model');
const catchAsync = require('../util/catchAsync');
const promisify = require('promisify');

const regPattern = /\b[\w.-]+@s\.karu\.ac\.ke\b/g

exports.helloWorld = catchAsync(async (req, res, next) => {

    const {sessionId, phoneNumber, text, date, serviceCode, status, errorMessage} = req.body;

    let newUserMailAndRegistraation=''

    let resp = ''

    const mainUser = await userModel.findOne({phoneNumber});

    if(text === '')
        resp = `CON Welcome to my Ussd App.\n`+
                `The best emergency help-line service, `+
                `\nto proceed choose an option below,`+
                `\n1. Register \n2. Login `+
                `\n3. View T&c \n4. Developer info `+
                `\n5. Others \n0. Quit`;
    else if(text === '0')
        resp = `END Thank you for choosing emerg. Closed Application`
    else if(text === '1'){

        // if(mainUser != null)
        //     const _user = await userModel.findOne({_id:mainUser._id});

        if(mainUser != null)
            resp=`END User already exist, please login`
        else
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

        if(!regPattern.test(email)){
            resp = `END Please provide a valid email adress. In the prescribed format`
        }else{            
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
                        // console.log(err);
                        resp = `END Failed to create account due to ${err}. \nPlease try again later.`
                });
            }

        
    }
    else if(text && text.startsWith('2*') && text.split('*').length === 2){
        let regNo = text.substring(2, text.length).trim()
        
        const user = await userModel.findOne({registrationNumber:regNo});

        // console.log(user);

        // console.log(text.split('*')[text.split('*').length -1]);

        if(user != null){
            // console.log(_cons);
            resp = `CON 1. Consltation\n2. Emergency \n3. Call for ambulance \n4. SOS `+
                    `\n 5. Track order`+
                    `\n0. Quit`
        }else{
            resp = `END Invalid credentials`
        }

        

    }
    else if(text && text.startsWith('2*') && text.split('*').length === 3){

        // console.log(text.split('*')[text.split('*').length -1]);
        const desc = text.split('*')[text.split('*').length -1];

        switch (text.split('*')[text.split('*').length -1]) {
            case '1':
                // console.log('cons');
                resp = `CON please fill out the details to get a doctor assigned`
                break;

            case '5':
                resp = `CON Enter the tracking id`
                break
        
            default:
                resp = `END Thank you for choosing emerg. Closed Application`
                break;
        }
    }
    else if(text && text.startsWith('2*') && text.split('*').length === 4){

        // console.log(`choice ${text.split('*')[2]}`);

        switch(text.split('*')[2]){
            case '1':
                const desc = text.split('*')[text.split('*').length -1]
                console.log(text.split('*')[text.split('*').length -1]);

                if(desc.length <= 12){
                    resp = `END Please provide a valid description(minimum 12 characters)`
                }else{

                    const _cons = await consultationModel.create({description:desc, user : mainUser});
                    // console.log(_cons);

                    await SMS.send({
                        to:`${phoneNumber}`,
                        from:`${process.env.AT_SHORTCODE}`,
                        message:`Successfully requested for a consultation session.\nWe will provide all the info when ready, via the specified channels\n`+
                        `To track your order use ID: ${_cons._id}. \nThank you for choosing us`
                    }).then(()=>{
                        resp = `END Successfully created consultation. Check your inbox for more details`
                    }).catch(err => {
                        resp = `END Error while processing request please try again later.${err}`
                    });
                }
                break;
            case '5':
                // console.log("here 1");
                const cons_id = text.split('*')[text.split('*').length -1];
                // console.log(cons_id);
                const fetchedConsultation = await consultationModel.findOne({_id: cons_id});

                if(! fetchedConsultation)
                    resp = `END Invalid tracking id`
                else
                    resp = `END consultation state is ${fetchedConsultation.status}`
               break;
        }
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