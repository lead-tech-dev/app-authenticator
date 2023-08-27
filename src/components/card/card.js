import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {Action, Auth, CardContainer, Header, Icon, Inner, Input, Issuer, Key, Label, PinContainer} from "./card.styles";
import Divider from "../divider/divider";
import {ProgressBar} from "./card.styles";
import Button from "../button";  
import React ,{useEffect, useState}from "react";


const Card = ({item, onPress, onLongPress, handlePinCode, handleCancel, handleDelete,height, timeOver, handleReset, handleGenerateNextOtp, length}) => {
    const [value, setValue] = useState("");

    useEffect(() => {

        if (item.pin !== "" && timeOver) {
            handleGenerateNextOtp(item)
        }

        if(item.resetOtpTime === 4 ) {
            handleReset(item)
        }

    }, [timeOver, item.resetOtpTime, item.pin])


    const onChangeText = (text) => {

        setValue(text);

        if(text.length === item.defaultDigits) {
            handlePinCode(text);
            setValue("")
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

            {length > 1 && (
                <Divider dividerStyle={{
                    textAlign: "center",
                    height: 4,
                    width: 280,
                    marginTop: 20,
                    marginLeft: 30,
                    borderRadius: 20,
                    backgroundColor: "grey",
                }}/>
            )}
        </CardContainer>
    )
}

export default Card;