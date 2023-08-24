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
        setMoptToken, moptTokens, generateNextOtp, resetMoptToken, setIsLongPressed, updateWaitingForPin, updateWaitingForOtp, removeFromMoptTokens, generateOtp, error, setError } = useContext(MoptTokenContext);

    const [height, setHeight] = useState(0);
    const [counter, setCounter] = useState(0);
    const [nextOtp, setNextOtp] = useState(false);
    const [reset, setReset] = useState(false);
    const [timer, setTimer] = useState(false);
    const defaultPeriod = 10;
    const resetOtpTime = 3;

    useEffect(() => {

          if (timer && counter < resetOtpTime) {
              setReset(false)
              setNextOtp(false);
              progress(0, defaultPeriod);
          }else {
              setReset(true)
              setCounter(0);
              setNextOtp(false);
          }

    }, [counter, timer])
    const progress = (timeLeft, timeTotal) => {

        if (timeLeft <= timeTotal) {
            setTimeout(() => {
                setHeight(timeLeft * 100 / timeTotal)
                progress(timeLeft + defaultPeriod / 10, timeTotal)
            }, 1000)
        }
        if(timeLeft === timeTotal) {
            setNextOtp(true);
            setCounter((counter) => counter + 1)
        }

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
        setTimer(true);
    }

    const handleReset = (item) => {
        resetMoptToken(item);
        setTimer(false)
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
                              handleGenerateNextOtp={(item) => generateNextOtp(item)}
                              nextOtp={nextOtp}
                              reset={reset}
                              height={height}
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

