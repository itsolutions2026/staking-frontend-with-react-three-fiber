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

import {PieCard} from "./PieCard"


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
        <motion.div className={"balanceKeep"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Stack
                backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
                alignItems={"center"}
                marginTop={"20px"}
                width={"500px"}
                boxShadow={"0 0 3px 1px white"}
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
                <PieCard/>
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
                                    stakeAmountRef.current.value = totalStakedAmount;
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
                                    _hover={{bgColor: "#007a9d", color: "white"}}>
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
                                    stakeAmountRef.current.value = totalStakedAmount;
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
                                    _hover={{bgColor: "#007a9d", color: "white"}}>
                                Unstake
                            </Button>
                        </Flex>
                    </Box>
            </Stack>
        </motion.div>
    );
}

export default StakingPage;
