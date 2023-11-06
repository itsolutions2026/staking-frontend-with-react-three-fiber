// node_modules
import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { AvatarComponent } from "./avatar";
// consts
import { PATH } from "../../consts";

// assets
import Logo from "../../assets/logo.png";

const HeaderComponent: React.FC = () => {

    return (
        <Flex
            padding={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"20px"}
        >
            <a href={"https://xprnetwork.org/"}>
            <Image src={Logo} width={"150px"} alt="logo" ml={"20px"}/>
            </a>
            <AvatarComponent/>
        </Flex>
    );
};

export default HeaderComponent;
