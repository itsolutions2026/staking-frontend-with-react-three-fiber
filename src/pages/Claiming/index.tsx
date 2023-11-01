// node_modules
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    Grid,
    InputGroup,
    InputLeftAddon,
    Button,
    Flex,
    Text,
    useToast, Stack,
} from "@chakra-ui/react";



const ClaimingPage: React.FC = () => {

    const toast = useToast();

    const [stakingRewardAmount, setStakingRewardAmount] = useState<string>("0");
    const [availableRewardAmount, setAvailableRewardAmount] =
        useState<string>("0");


    return (
        <Stack
            backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
            alignItems={"center"}
            marginTop={"30px"}
            marginBottom={"30px"}
            width={"500px"}
            borderRadius={"10px"}
            sx={{
                "@media only screen and (max-width: 600px)": {
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                },
            }}
            padding={"30px"}
        >
            <InputGroup color={"black"} sx={{
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <InputLeftAddon
                    children="Claimed XPR Rewards"
                    sx={{
                        width: "200px",
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                            width: "100%",
                            borderRadius: "5px 5px 0 0",
                            height: "2.3em",
                            textAlign: "center",
                            display: "block",
                            padding: "4px 8px",

                        },
                    }}
                    border={"none"}
                    background={"#126d92"}
                    color={"white"}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"} width={"100%"} backgroundColor={"white"} borderRadius={"0 5px 5px 0"} sx={{
                    "@media only screen and (max-width: 600px)": {
                        fontSize: "12px",
                        padding: "4px 8px",
                        width: "100%",
                        borderRadius: "0px 0px 5px 5px",
                    },
                }}>
                    {stakingRewardAmount}
                </Text>
            </InputGroup>
            <InputGroup color={"black"} sx={{

                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <InputLeftAddon
                    children="Available XPR Rewards"
                    sx={{
                        width: "200px",
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                            width: "100%",
                            borderRadius: "5px 5px 0 0",
                            height: "2.3em",
                            textAlign: "center",
                            display: "block",
                            padding: "4px 8px",

                        },
                    }}
                    border={"none"}
                    background={"#126d92"}
                    color={"white"}
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"} width={"100%"} backgroundColor={"white"} borderRadius={"0 5px 5px 0"} sx={{
                    "@media only screen and (max-width: 600px)": {
                        fontSize: "12px",
                        padding: "4px 8px",
                        width: "100%",
                        borderRadius: "0px 0px 5px 5px",
                    },
                }}>
                    {availableRewardAmount}
                </Text>
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"200px"}
                        background={"white"}
                        color={"#126d92"}
                        _hover={{ bgColor: "black", color: "white"}}>
                    Claim XPR
                </Button>
            </Flex>
        </Stack>
    );
}

export default ClaimingPage;