// node_modules
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useMemo,
} from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Image } from "@chakra-ui/react";



// consts
import { PATH } from "../../consts";



// assets
import Logo from "../../assets/logo.png";

const HeaderComponent: React.FC = () => {
    const [provider, setProvider] = useState<any>(null);
    const [account, setAccount] = useState<string>("");


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
            <Button
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"150px"}
                height={"60px"}
                overflow={"hidden"}
                bgColor={"#126d92"}
                boxShadow={"0 0 4px 1px #e0f1ff"}
                _hover={{ bgColor: "white", color: "#5498b4", boxShadow: "0 0 4px 1px #126d92" }}
                color={"white"}
                fontSize={"14px"}
                border={"none"}
                mr={"20px"}
                onClick={() => {
                }}
            >
                {!account ? "Connect Wallet" : account}
            </Button>
        </Flex>
    );
};

export default HeaderComponent;
