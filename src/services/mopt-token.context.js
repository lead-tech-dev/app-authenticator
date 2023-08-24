import React, {useState, createContext} from "react";

export const MoptTokenContext = createContext();

export const MoptTokenContextProvider = ({ children }) => {
    const [moptTokens, setMoptToken] = useState([]);
    const [error, setError] = useState("");

    const add = (moptToken) => {
       let existMoptToken = moptTokens.find(item => item.secret === moptToken.secret);
       if (existMoptToken){
           setError("MoptToken already exists!")
       }else {
           setMoptToken([...moptTokens, moptToken]);
       }
    };

    const updateWaitingForPin = (moptToken) => {
        let localMoptTokens = [...moptTokens];

        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.setWaitingForPin();
            }
        })

        setMoptToken(localMoptTokens)
    };

    const updateWaitingForOtp = (moptToken) => {
        let localMoptTokens = [...moptTokens];

        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.setWaitingForOtp();
            }
        })

        setMoptToken(localMoptTokens)
    };

    const resetMoptToken = (moptToken) => {
        let localMoptTokens = [...moptTokens];

        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.reset();
            }
        })

        setMoptToken(localMoptTokens)
    };

    const generateOtp = (moptToken, pin) => {
        let localMoptTokens = [...moptTokens];
        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.generateOTP(pin);
            }
        })

        setMoptToken(localMoptTokens)
    };

    const generateNextOtp = (moptToken) => {
        let localMoptTokens = [...moptTokens];
        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.generateNextOtp();
            }
        })

        setMoptToken(localMoptTokens)
    };

    const setIsLongPressed = (moptToken) => {
        let localMoptTokens = [...moptTokens];
        localMoptTokens.forEach((item, index) => {
            if (item.secret === moptToken.secret) {
                item.setIsLongPressed();
            }
        })

        setMoptToken(localMoptTokens)
    };


    const remove = (moptToken) => {
        const newMoptToken = moptTokens.filter((item) => item.secret !== moptToken.secret);

        setMoptToken(newMoptToken);
    };



    return (
        <MoptTokenContext.Provider
            value={{
                moptTokens,
                addToMoptTokens: add,
                removeFromMoptTokens: remove,
                updateWaitingForPin,
                updateWaitingForOtp,
                resetMoptToken,
                generateOtp,
                generateNextOtp,
                setIsLongPressed,
                error,
                setError
            }}
        >
            {children}
        </MoptTokenContext.Provider>
    );
};