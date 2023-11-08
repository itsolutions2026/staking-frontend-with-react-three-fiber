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
    Box,
    useToast,
    Stack,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import * as SDK from "../../util/webSdk"
import {PieCard} from "./PieCard"
import {useRecoilState, useRecoilValue} from "recoil";
import {userContractDankBalance, userDankBalance, userState} from "../../atoms";
import {stakeDank} from "../../util/webSdk";
import {TOKEN} from "../../consts";


const StakingPage: React.FC = () => {

    const toast = useToast();
    const [user, setUser] = useRecoilState(userState);


    const stakeAmountRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const unstakeAmountRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    const dankBalance = useRecoilValue(userDankBalance);
    const userDankStakedBalance = useRecoilValue(userContractDankBalance);

    const refreshData = async () => {
        const loadDataPromise = SDK.loadData(setUser)

        toast.promise(loadDataPromise, {
            success: {
                title: 'Success',
                description: 'User data is refreshed successfully',
                isClosable: true,
                position: "bottom-left"
            },
            error: {
                title: 'Error',
                description: 'User data loading is failed',
                isClosable: true,
                position: "bottom-left"
            },
            loading: {
                title: 'Refreshing Data',
                description: 'Loading updated user data...',
                position: "bottom-left"
            }
        })
    }
    const stake = async () => {
        if (user.actor) {
            if (stakeAmountRef.current.value) {
                const amount = parseFloat(stakeAmountRef.current.value);
                if (amount > 0) {
                    const result = SDK.stakeDank(amount);

                    toast.promise(result, {
                        success: {
                            title: 'Success',
                            description: `Staked ${amount} ${TOKEN.DANKTOKEN} successfully!`,
                            isClosable: true,
                            position: "bottom-left",
                            onCloseComplete: () => {
                                refreshData();
                            }
                        },
                        error: {
                            title: 'Error',
                            description: `Stake ${amount} ${amount} failed!`,
                            isClosable: true,
                            position: "bottom-left"
                        },
                        loading: {
                            title: 'Staking Dank',
                            description: 'Please wait while stake your DANK...',
                            position: "bottom-left"
                        }
                    })

                } else {
                    toast({
                        title: `Please insert correct amount!`,
                        status: "error",
                        isClosable: true,
                        duration: 3000,
                        position: "bottom-left"
                    });
                }
            } else {
                toast({
                    title: `Please insert correct amount!`,
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                    position: "bottom-left"
                });
            }
        }else{
            toast({
                title: `Please connect your wallet!`,
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "bottom-left"
            });
        }
    }

    const unstake = async () => {
        if (user.actor) {
            if(unstakeAmountRef.current.value){
                const amount = parseFloat(unstakeAmountRef.current.value);
                if(amount > 0){
                    const result = SDK.unstakeDank(amount);

                    toast.promise(result, {
                        success: {
                            title: 'Success',
                            description: `Unstaked ${amount} ${TOKEN.DANKTOKEN} successfully!`,
                            isClosable: true,
                            position: "bottom-left",
                            onCloseComplete: () => {
                                refreshData();
                            }
                        },
                        error: {
                            title: 'Error',
                            description: `Unstake ${amount} ${amount} failed!`,
                            isClosable: true,
                            position: "bottom-left"
                        },
                        loading: {
                            title: 'Unstaking Dank',
                            description: 'Please wait while unstake your DANK...',
                            position: "bottom-left"
                        }
                    })
                }
                else{
                    toast({
                        title: `Please insert correct amount!`,
                        status: "error",
                        isClosable: true,
                        duration: 3000,
                        position: "bottom-left"
                    });
                }
            }
        }
        else{
            toast({
                title: `Please connect your wallet!`,
                status: "error",
                isClosable: true,
                position: "bottom-left",
                duration: 3000,
            });
        }
    }
    return (
        <motion.div className={"balanceKeep"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Stack
                backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
                flexDirection={"row"}
                alignItems={"center"}
                marginTop={"20px"}
                boxShadow={"0 0 3px 1px white"}
                borderRadius={"10px"}
                maxWidth={"900px"}
                sx={{
                    "@media only screen and (max-width: 900px)": {
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        flexDirection: "column"
                    },
                }}
                padding={"30px"}
            >
                <PieCard/>
                <Stack padding={"0px"} margin={"0px"} width={"600px"}
                       sx={{
                           "@media only screen and (max-width: 600px)": {
                               width: "100%",
                           },
                       }}>
                    <Box
                        padding={"10px 15px 10px 15px"}
                        borderRadius={"10px"}
                        width={"100%"}
                        m={1}
                        component="fieldset"
                        boxShadow={"0px 5px 10px 1px #203949"}
                        backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
                    >
                        <legend style={{color: "white", marginLeft: "5px", fontWeight: "400"}}>Stake amount</legend>
                        <InputGroup color={"black"} mt={"5px"} >
                            <Input
                                ref={stakeAmountRef}
                                backgroundColor={"white"}
                                borderRadius={"10px 0 0 10px"}
                            />
                            <InputRightAddon
                                onClick={() => {
                                    stakeAmountRef.current.value = dankBalance;
                                }}
                                background={"#007a9d"}
                                border={"none"}
                                color={"white"}
                                cursor={"pointer"}
                                children="MAX"
                                borderRadius={"0 10px 10px 0"}
                                _hover={{bgColor: "black", color: "white"}}
                            />
                        </InputGroup>
                        <Flex alignItems={"center"} justifyContent={"left"} mt={"20px"} mb={"20px"}>
                            <Button width={"160px"}
                                    bg={"none"}
                                    boxShadow={"0 0 3px 1px white"}
                                    color={"white"}
                                    borderRadius={"10px"}
                                    _hover={{bgColor: "#007a9d", color: "white"}}
                                    onClick={stake}
                            >
                                Stake
                            </Button>
                        </Flex>
                    </Box>
                    <Box padding={"10px 15px 10px 15px"}
                         borderRadius={"10px"}
                         width={"100%"}
                         m={1}
                         component="fieldset"
                         boxShadow={"0px 5px 10px 1px #203949"}
                         backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
                    >
                        <legend style={{color: "white", marginLeft: "5px", fontWeight: "400"}}>Unstake amount</legend>
                        <InputGroup color={"black"} mt={"5px"} >
                            <Input
                                ref={unstakeAmountRef}
                                backgroundColor={"white"}
                                borderRadius={"10px 0 0 10px"}
                            />
                            <InputRightAddon
                                onClick={() => {
                                    unstakeAmountRef.current.value = userDankStakedBalance;
                                }}
                                background={"#007a9d"}
                                border={"none"}
                                color={"white"}
                                cursor={"pointer"}
                                borderRadius={"0 10px 10px 0"}
                                children="MAX"
                                _hover={{bgColor: "black", color: "white"}}
                            />
                        </InputGroup>
                        <Flex alignItems={"center"} justifyContent={"left"} mt={"20px"} mb={"20px"}>
                            <Button width={"160px"}
                                    bg={"none"}
                                    boxShadow={"0 0 3px 1px white"}
                                    color={"white"}
                                    borderRadius={"10px "}
                                    _hover={{bgColor: "#007a9d", color: "white"}}
                                    onClick={unstake}
                            >
                                Unstake
                            </Button>
                        </Flex>
                    </Box>
                </Stack>
            </Stack>
        </motion.div>
    );
}

export default StakingPage;
