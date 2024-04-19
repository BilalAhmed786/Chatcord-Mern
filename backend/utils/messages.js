const moment= require('moment');

function formatMessages(name,message){
return{
name,
message,
time:moment().format('hh:mm a')
}
}

module.exports = formatMessages