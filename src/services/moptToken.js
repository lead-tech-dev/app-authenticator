import CryptoJS from 'crypto-js';
import utf8 from 'utf8';

export class MoptToken {

    resetOtpTime = 0;
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
    period = 10;
    constructor(parsedUri) {

        this.tokenType = parsedUri.host;
        this.secret = parsedUri.query.split("=")[1];
        this.issuer = parsedUri.pathname.split("/")[1];
        this.issuerIcon = this.issuer.split("")[0].toUpperCase()

    }

    addPin (pin) {
        this.pin = pin;
        this.setWaitingForOtp();
    }
    generateOTP() {
        const milliseconds = Date.now();
        const actualTime = Math.floor((milliseconds/1000)/10).toString();
        let hash = CryptoJS
            .MD5(utf8.encode(actualTime + this.secret + this.pin))
            .toString()
            .substring(0, this.defaultDigits);

        this.resetOtpTime = this.resetOtpTime + 1;
        this.currentOTP = hash

        return hash;
    }

    getCurrentCountdownInSeconds () {
        const milliseconds = Date.now();
        const seconds = Math.floor((milliseconds/1000))

        return this.period - seconds % this.period;
    }
    setWaitingForPin() {
        this.waitingForPin = !this.waitingForPin;
    }
    setWaitingForOtp() {
        this.waitingForOtp = true;
        this.waitingForPin = false;
        this.isLongPressed = false;
    }

    setIsLongPressed() {
        this.isLongPressed = true;
        this.waitingForPin = false;
        this.pin = "";
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