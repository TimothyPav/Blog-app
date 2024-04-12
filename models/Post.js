const mongoose = require('mongoose');

function dateFormat(){
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    let currentTime = ""
    if(currentDate.getHours() > 12){
        currentTime = `${currentDate.getHours()-12}:${currentDate.getMinutes()} PM`
    } else {
        currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()} AM`
    }

    return `${currentMonth+1}/${currentDayOfMonth}/${currentYear} @ ${currentTime}`
}

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: dateFormat() },
    genre: {type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);

console.log(dateFormat())

