import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Dimensions, View, Text} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Svg, Defs, Rect, Mask } from "react-native-svg";
import { SafeArea } from "../components/utility/safe-area.component";
import Header from "../components/header/header";
import Divider from "../components/divider/divider";
import {Camera} from "expo-camera";
import {MoptToken} from "../services/moptToken";
import {MoptTokenContext} from "../services/mopt-token.context";
import Button from "../components/button";
import Title from "../components/title";
import styled from "styled-components/native";
import urlParse from "url-parse";


const { width, height } = Dimensions.get("screen");

const Label1 = styled.Text`
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  align-items: center;
`;

const Label2 = styled.Text`
  
`;

const CameraContainer = styled.View`
  flex-grow: 1;
`;

const CameraInner = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;



export const ScannerScreen = ({ navigation }) => {
    const { addToMoptTokens, setError } = useContext(MoptTokenContext);
    const [isScanned, setIsScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        requestsCameraPermission();
    }, []);

    const cameraRef = useRef();
    const handleBarCodeScanned = ({ type, data }) => {
        setIsScanned(true);
        if (data !== "") {
            const parsedUri = urlParse(data);
            if(parsedUri.host !== "motp") {
                setError("Incorrect token type!")
            }else {
                addToMoptTokens(new MoptToken(parsedUri))
            }
            navigation.navigate("TokenList")
        }
    };

    const requestsCameraPermission = useCallback(async () => {
        await (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);


    function CameraFrame() {
        return (
            <Svg height="100%" width="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                        <Rect height="100%" width="100%" fill="#fff" />
                        <Rect x="16%" y="30%" width="250" height="250" fill="black" />
                    </Mask>
                </Defs>

                <Rect
                    width="100%"
                    height="100%"
                    fill="rgba(0,0,0,0.8)"
                    mask="url(#mask)"
                />
                <Rect
                    x="17%"
                    y="30%"
                    width="250"
                    height="250"
                    strokeWidth="5"
                    stroke="#fff"
                    fill="rgba(0,0,0,0.0)"
                />
            </Svg>
        );
    }

    function renderCamera() {
        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <CameraContainer>
                <Camera
                    style={{ flex: 1 }}
                    ref={(camera) => (cameraRef.current = camera)}
                    type={Camera.Constants.Type.back}
                    isActive={true}
                    enableZoomGesture
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
                />
                    <CameraInner>
                        {CameraFrame()}

                        <Label1>
                            <Title titleStyle={{ fontSize: 18, lineHeight: 36, color: "rgba(255, 255, 255, 1)" }}>Scan a QR code ...</Title>
                        </Label1>

                        <Text
                            style={{
                                position: "absolute",
                                top: height * 0.3 + 220,
                                left: 0,
                                right: 0,
                                alignItems: "center"
                            }}
                        >
                            <Title titleStyle={{ fontSize: 16, lineHeight: 36,  color: "rgba(255, 255, 255, 1)" }}>
                                Align the code to be in the middle of the box
                            </Title>
                        </Text>
                    </CameraInner>

                <Button
                    onPress={() => navigation.goBack() }
                    containerStyle={{
                        backgroundColor: "#259712",
                        color: "#259712",
                        width: 70,
                        height: 70,
                        borderRadius: 100,
                        position: "absolute",
                        bottom: 20,
                        right: 30
                    }}
                    iconName="close"
                    iconSize={40}
                    iconColor="#fff"
                    iconStyle={{alignSelf:'center', marginTop: 15}}
                    icon={true}
                />
            </CameraContainer>
        );
    }

  return (
    <SafeArea>
      <Header/>
      <Divider/>

      {renderCamera()}

    </SafeArea>
  );
};
