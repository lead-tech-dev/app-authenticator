import React, {useState, useEffect} from "react";
export const useTimer = (item, handleGenerateNextOtp) => {
    const [time, setTime] = useState(0)
    const [intervalID, setIntervalID] = useState(null)
    const isTimerRunning = intervalID != null;


    const startTimer = () => {
        if (!isTimerRunning) {
            handleGenerateNextOtp(item)
            setTime(item.getCurrentCountdownInSeconds())
            setIntervalID(setInterval(() => {
                let current = item.getCurrentCountdownInSeconds()
                if (current === 10) {
                   setTime(current)
                   handleGenerateNextOtp(item)
                }else {
                    setTime(current)
                }
            }, 1000))
        }
    }
    const stopTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }


    useEffect(() => () => {
        clearInterval(intervalID)
    }, [])

    return {
        time,
        startTimer,
        stopTimer,
    }
}