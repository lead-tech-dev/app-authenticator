
import CryptoJS from 'crypto-js';
import utf8  from 'utf8';
export class MoptToken {

    resetOtpTime = 0;
    defaultPeriod = 10;
    defaultDigits = 6;
    tokenType = "";
    issuer = '';
    issuerIcon = "";
    secret = '';
    pin = '';
    currentOTP = '';
    waitingForPin= false;
    waitingForOtp= false;

    isLongPressed = false;

    constructor(parsedUri) {

        this.tokenType = parsedUri.host;
        this.secret = parsedUri.query.split("=")[1];
        this.issuer = parsedUri.pathname.split("/")[1];
        this.issuerIcon = this.issuer.split("")[0].toUpperCase()

    }

    generateOTP(pin) {
        const milliseconds = Date.now();
        const actualTime = Math.floor((milliseconds/1000)/10).toString();
        let hash = CryptoJS
            .MD5(utf8.encode(actualTime + this.secret + pin))
            .toString()
            .substring(0, this.defaultDigits);

       /* let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }*/
        this.resetOtpTime = this.resetOtpTime + 1;
        this.pin = pin;
        this.waitingForOtp = true;
        this.waitingForPin = false;
        this.currentOTP = hash

        return hash;
    }

    generateNextOtp() {
        if (this.pin !== "") {
            this.currentOTP = this.generateOTP(this.pin);
        }
        return false;
    }

    setWaitingForPin() {
        this.waitingForPin = !this.waitingForPin;
    }

    setWaitingForOtp() {
        this.waitingForOtp = true;
        this.isLongPressed = false;
    }

    setIsLongPressed() {
        this.isLongPressed = true;
        this.waitingForPin = false;
        this.pin = "";
    }

    setResetOtpTime () {
    }

    reset() {
        this.isLongPressed = false;
        this.waitingForOtp = false;
        this.waitingForPin = false;
        this.currentOTP = "";
        this.pin = "";
        this.resetOtpTime = 0;
    }

}