
const AT_APIKEY = process.env.AT_APIKEY
const AT_UNAME = process.env.AT_UNAME

console.log(AT_APIKEY,AT_UNAME);

const at = require('africastalking')({username: AT_UNAME, apiKey:AT_APIKEY});

module.exports = {
    SMS : at.SMS
}