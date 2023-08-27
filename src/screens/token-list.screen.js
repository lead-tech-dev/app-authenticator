import React, {useContext, useEffect, useState} from "react";
import Divider from "../components/divider/divider"
import { SafeArea } from "../components/utility/safe-area.component";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Card from "../components/card/card";
import {MoptTokenContext} from "../services/mopt-token.context";
import {Alert, ScrollView} from "react-native";
import {table} from "../data/mopt-token-data";
import urlParse from "url-parse";
import {MoptToken} from "../services/moptToken";

export const TokenListScreen = ({ navigation }) => {
    const {
        setMoptToken, moptTokens, resetMoptToken, setIsLongPressed, updateWaitingForPin, updateWaitingForOtp, removeFromMoptTokens, generateOtp, error, setError } = useContext(MoptTokenContext);

    const [height, setHeight] = useState(0);
    const [timer, setTimer] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [counter, setCounter] = useState(0);
    const [endTimer, setEndTimer] = useState(0);
    const defaultPeriod = 10;

    useEffect(() => {
        let setTimeoutId
        if (timer && counter !== 0){
           setTimeoutId =  progress(0, defaultPeriod);
        }

        return () => clearTimeout(setTimeoutId)
    }, [counter, timer])
    const progress = (timeLeft, timeTotal) => {
        let setTimeoutId;
        if (timeLeft <= timeTotal) {
            setTimeoutId = setTimeout(() => {
                setHeight(timeLeft * 100 / timeTotal)
                progress(timeLeft + defaultPeriod / 10, timeTotal)
            }, 1000)
        }else{
            setHeight(0)
        }
        if(timeLeft === timeTotal) {
            setCounter((counter) => counter + 1);
            setTimeOver(true)
        }
        return setTimeoutId
    }

    useEffect(() => {
        let localMoptTokens = [];
            table.map(item => {
                const parsedUri = urlParse(item);
                if(parsedUri.host !== "motp") {
                    setError("Incorrect token type!")
                }else {
                    localMoptTokens.push(new MoptToken(parsedUri))
                }
            })

        setMoptToken([...localMoptTokens])

    }, [])

    useEffect(() => {
        if (error){
            Alert.alert(error)

            setTimeout(() => {
                setError("")
            }, 1000)
        }
    }, [error])

    const handlePinCode = (item, text) => {
        generateOtp(item, text);
        setTimer(true)
        setEndTimer((endTimer) => endTimer + 1)
        setCounter(1 );
    }

    const handleReset = (item) => {
        resetMoptToken(item);
        if (endTimer === 1) {
            setCounter(0)
            setEndTimer(0)
        }else  {
            setEndTimer((endTimer) => endTimer - 1)
        }
    }

    const handleGenerateNextOtp = (item) => {
        generateOtp(item)
        setTimeOver(false)
    }

  return (
      <SafeArea>
         <Header/>
         <Divider dividerStyle={{
             width: "100%",
             height: 3,
             backgroundColor: "green",
             marginBottom: 10
         }}/>
          <ScrollView contentInsetAdjustmentBehavior="automatic"
          style={{flexGrow: 1}}
          >

                  {moptTokens.map((item, index) => {
                      return (
                          <Card
                              key={index}
                              item={item}
                              onPress={() => updateWaitingForPin(item)}
                              onLongPress={() => setIsLongPressed(item)}
                              handlePinCode={(value) => handlePinCode(item, value)}
                              handleCancel={(item) => updateWaitingForOtp(item)}
                              handleDelete={(item) => removeFromMoptTokens(item)}
                              handleReset={(item) => handleReset(item)}
                              handleGenerateNextOtp={(item) => handleGenerateNextOtp(item)}
                              timeOver={timeOver}
                              height={height}
                              length={moptTokens.length}
                          />
                      );
                  })}

          </ScrollView>
          <Footer
            navigation={navigation}
            url="Scanner"
            styleTitle={{
                fontSize: 12,
                marginRight: 60,
                backgroundColor: "transparent",
                color: "#259712"
               }}
            title="Press + to add a token"
            containerButtonStyle={{
                  backgroundColor: "#259712",
                  color: "#259712",
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                }}
            iconData={{
                  name: "add",
                  size: 40,
                  color: "#ffffff",
                  style: {alignSelf:'center', marginTop: 15}
                }}
            footerStyle={{paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20}}
          />
      </SafeArea>
  );
};

