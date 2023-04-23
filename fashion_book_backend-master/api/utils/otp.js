'use strict'

exports.generateOTP = () => {
    let result = "";
    for(let i = 1; i < 7; i++) {
        result += Math.floor((Math.random() * 9) + 1);
    }
    return result;
}
