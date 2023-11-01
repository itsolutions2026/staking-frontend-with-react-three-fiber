// node_modules
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

// consts
import { PATH } from "../../consts";

const ControllerComponent: React.FC = () => {
    const location = useLocation();

    return (
        <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            mb={"10px"}
        >
            <Link to={PATH.HOME}>
                <Button
                    backgroundColor={
                        location.pathname === PATH.HOME
                            ? "#126d92"
                            : "white"
                    }
                    color={location.pathname === PATH.HOME
                        ? "white"
                        : "black"}
                    borderRadius={"none"}
                    _hover={{ bgColor: "#126d92", color: "white"}}
                    width={"150px"}
                    height={"40px"}
                    position={"relative"}
                    borderTopLeftRadius={"10px"}
                    borderBottomLeftRadius={"10px"}
                    borderRight={"1px solid black"}
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            width: "100px",
                        },
                    }}
                >
                    Home
                </Button>
            </Link>
            <Link to={PATH.STAKING}>
                <Button
                    backgroundColor={
                        location.pathname === PATH.STAKING
                            ? "#126d92"
                            : "white"
                    }
                    color={location.pathname === PATH.STAKING
                        ? "white"
                        : "black"}
                    borderRadius={"none"}
                    _hover={{ bgColor: "#126d92", color: "white"}}
                    width={"150px"}
                    height={"40px"}
                    position={"relative"}
                    borderLeft={"1px solid black"}
                    borderRight={"1px solid black"}
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            width: "100px",
                        },
                    }}
                >
                    Staking
                </Button>
            </Link>
            <Link to={PATH.CLAIMING}>
                <Button
                    backgroundColor={
                        location.pathname === PATH.CLAIMING
                            ? "#126d92"
                            : "white"
                    }
                    color={location.pathname === PATH.CLAIMING
                        ? "white"
                        : "black"}
                    borderRadius={"none"}
                    _hover={{ bgColor: "#126d92", color: "white"}}
                    width={"150px"}
                    height={"40px"}
                    position={"relative"}
                    borderTopRightRadius={"10px"}
                    borderBottomRightRadius={"10px"}
                    borderLeft={"1px solid black"}
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            width: "100px",
                        },
                    }}
                >
                    Claiming
                </Button>
            </Link>
        </Flex>
    );
};

export default ControllerComponent;
