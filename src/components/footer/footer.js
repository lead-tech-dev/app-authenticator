
import React from "react";
import {FooterContainer} from "./footer.styles";
import Button from "../button";
import Title from "../title";

const Footer = ({navigation, styleTitle, title, url, containerButtonStyle, iconData}) => {
    return (
        <FooterContainer>
            <Title
                title={title}
                titleStyle={{
                    ...styleTitle
                }}
            />
            <Button
                onPress={() => url === "Back" ? navigation.goBack() : navigation.navigate(url)}
                containerStyle={{...containerButtonStyle}}
                iconName={iconData.name}
                iconSize={iconData.size}
                iconColor={iconData.color}
                iconStyle={{...iconData.style}}
                icon={true}
            />

        </FooterContainer>
    )
}
export  default Footer;