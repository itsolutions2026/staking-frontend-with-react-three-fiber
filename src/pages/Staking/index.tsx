// node_modules
import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useCallback,
} from "react";

import {
    Grid,
    InputGroup,
    Input,
    InputLeftAddon,
    InputRightAddon,
    Button,
    Flex,
    Text,
    useToast,
    Stack,
} from "@chakra-ui/react";



const StakingPage: React.FC = () => {

    const toast = useToast();

    const [allowance, setAllowance] = useState<string>("0");
    const [totalStakedAmount, setTotalStakedAmount] = useState<string>("0");
    const [stakingPoolPercent, setStakingPoolPercent] = useState<string>("0");
    const [totalUnstakedAmount, setTotalUnstakedAmount] = useState<string>("0");

    const stakeAmountRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const unstakeAmountRef =
        useRef() as React.MutableRefObject<HTMLInputElement>;

    return (
        <Stack
            backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
            alignItems={"center"}
            marginTop={"20px"}
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
                    children="Total Staked Amount"
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
                    background={"#007a9d"}
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
                    {totalStakedAmount}
                </Text>
            </InputGroup>
            <InputGroup color={"black"} mt={"5px"} sx={{
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <InputLeftAddon
                    children="% Staking Pool"
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
                    background={"#007a9d"}
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
                    {stakingPoolPercent}
                </Text>
            </InputGroup>
            <InputGroup color={"black"} mt={"5px"} sx={{
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <Input
                    placeholder="Staking Amount of Dank"
                    ref={stakeAmountRef}
                    backgroundColor={"white"}
                    borderRadius={"5px 0 0 5px"}
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            borderBottom: "1px solid black",
                            borderRadius: "5px 5px 0 0",
                            fontSize: "12px",
                        },
                    }}

                />
                <InputRightAddon
                    onClick={() => {
                        stakeAmountRef.current.value = totalStakedAmount;
                    }}
                    background={"#007a9d"}
                    border={"none"}
                    color={"white"}
                    cursor={"pointer"}
                    children="MAX"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            borderRadius: "0 0 5px 5px ",
                            fontSize: "12px",
                        },
                    }}
                    _hover={{ bgColor: "black", color: "white"}}
                />
            </InputGroup>
            <Stack alignItems={"center"} justifyContent={"space-between"} mt={"5px"} sx={{
                width: "100%",
                flexDirection: "row",
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <Button
                    width={"160px"}
                    background={"white"}
                    color={"#126d92"}
                    _hover={{ bgColor: "black", color: "white"}}>
                    Approve
                </Button>

                <Button
                    width={"160px"}
                    background={"white"}
                    color={"#126d92"}
                    _hover={{ bgColor: "black", color: "white"}}
                    disabled={allowance === "0"}
                >
                    Stake
                </Button>
            </Stack>

            <InputGroup color={"black"} mt={"5px"} sx={{
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <InputLeftAddon
                    children="Total Untaked Amount"
                    background={"#007a9d"}
                    color={"white"}
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
                />
                <Text pl={"10px"} display={"flex"} alignItems={"center"} width={"100%"} backgroundColor={"white"} borderRadius={"0 5px 5px 0"} sx={{
                    "@media only screen and (max-width: 600px)": {
                        fontSize: "12px",
                        padding: "4px 8px",
                        width: "100%",
                        borderRadius: "0px 0px 5px 5px",
                    },
                }}>
                    {totalUnstakedAmount}
                </Text>
            </InputGroup>

            <InputGroup color={"black"} mt={"5px"} sx={{
                "@media only screen and (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}>
                <Input
                    placeholder="Unstaking Amount of Dank "
                    ref={unstakeAmountRef}
                    backgroundColor={"white"}
                    borderRadius={"5px 0 0 5px"}
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                            borderBottom: "1px solid black",
                            borderRadius: "5px 5px 0 0",
                        },
                    }}

                />
                <InputRightAddon
                    onClick={() => {
                        stakeAmountRef.current.value = totalStakedAmount;
                    }}
                    background={"#007a9d"}
                    border={"none"}
                    color={"white"}
                    cursor={"pointer"}
                    children="MAX"
                    sx={{
                        "@media only screen and (max-width: 600px)": {
                            fontSize: "12px",
                            borderRadius: "0 0 5px 5px ",
                        },
                    }}
                    _hover={{ bgColor: "black", color: "white"}}
                />
            </InputGroup>
            <Flex alignItems={"center"} justifyContent={"center"} mt={"20px"}>
                <Button width={"160px"}
                        background={"white"}
                        color={"#126d92"}
                        _hover={{ bgColor: "black", color: "white"}}>
                    Unstake
                </Button>
            </Flex>
        </Stack>
    );
}

export default StakingPage;