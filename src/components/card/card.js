import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {Action, Auth, CardContainer, Header, Icon, Inner, Input, Issuer, Key, Label, PinContainer} from "./card.styles";
import Divider from "../divider/divider";
import {ProgressBar} from "./card.styles";
import Button from "../button";  
import React ,{useEffect, useState}from "react";


const Card = ({item, onPress, onLongPress, handlePinCode, handleCancel, handleDelete, handleReset, handleGenerateNextOtp}) => {
    const [value, setValue] = useState("");
    const [height, setHeight] = useState(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {

        if (item.waitingForOtp && counter < item.resetOtpTime) {
            progress(0, item.defaultPeriod);
        }else {
            handleReset(item)
            setValue("");
            setCounter(0);
        }

    }, [item.waitingForOtp, counter])
    const progress = (timeLeft, timeTotal) => {

        if (timeLeft <= timeTotal) {
            setTimeout(() => {
                setHeight(timeLeft * 100 / timeTotal)
                progress(timeLeft + item.defaultPeriod / 10, timeTotal)
            }, 1000)
        }
        if(timeLeft === timeTotal) {
            setValue("");
            handleGenerateNextOtp(item)
           setCounter((counter) => counter + 1)
        }

    }
    const onChangeText = (text) => {

        setValue(text);

        if(text.length === item.defaultDigits) {
            handlePinCode(text);
        }
    }

    return (
        <CardContainer onPress={onPress} onLongPress={onLongPress}>
            <Header isPressed={item.isLongPressed}>
              <Inner >
                  <Icon>{item.issuerIcon}</Icon>
                  <Issuer>{item.issuer}</Issuer>
                  {item.waitingForOtp && item.currentOTP !== "" && (
                      <ProgressBar>
                          <View style={{
                              height: `${height}%`,
                              width: "5px",
                              backgroundColor: "red",
                              borderTopLeftRadius: 2,
                              borderTopRightRadius: 2
                          }}
                          />
                      </ProgressBar>
                  )}

              </Inner>
                {item.waitingForOtp && item.currentOTP !== "" && (
                    <Auth><Key>OTP:</Key> {item.currentOTP}</Auth>
                )}

                {item.waitingForPin && item.currentOTP === "" && (

                        <PinContainer>
                            <Label>
                                Pin :
                            </Label>
                            <Input
                                maxLength={6}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                secureTextEntry={true}
                                name={item.secret}
                            />
                        </PinContainer>

                )}
            </Header>
            {item.isLongPressed && (
                <Action>
                    <Button
                        onPress={() => handleCancel(item)}
                        containerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: "grey",
                            borderWidth: 1,
                            borderStyle: "solid",
                            width: 90,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 4,
                            marginTop: 2
                        }}
                        label="Cancel"
                        labelStyle={{color: "green"}}
                        icon={false}
                    />
                    <Button
                        onPress={() => handleDelete(item)}
                        containerStyle={{
                            backgroundColor: "#FFF",
                            borderColor: "grey",
                            borderWidth: 1,
                            borderStyle: "solid",
                            width: 90,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 4,
                            marginTop: 2
                        }}
                        labelStyle={{color: "red"}}
                        label="Delete"
                        icon={false}
                    />

                </Action>
            )}

            <Divider dividerStyle={{
                textAlign: "center",
                height: 4,
                width: 280,
                marginTop: 20,
                marginLeft: 30,
                borderRadius: 20,
                backgroundColor: "grey",
            }}/>
        </CardContainer>
    )
}

export default Card;