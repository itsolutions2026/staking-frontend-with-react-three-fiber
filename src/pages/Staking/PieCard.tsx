// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import PieChart from './PieChart';
import { pieChartOptions } from './charts';
import { VSeparator } from './Separator';
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {userContractDankBalance, contractDankBalance, userState} from "../../atoms";

export const PieCard: React.FC = () => {

    // Chakra Color Mode

    const [user] = useRecoilState(userState);

    const userDankStakedBalance = useRecoilValue(userContractDankBalance);
    const contractDankStakedBalance = useRecoilValue(contractDankBalance);

    return (
        <Box alignItems='center' flexDirection='column' w='100%'
             background={"white"} padding={"15px"} borderRadius={"15px"}>

            <Flex
                px={{ base: '0px', '2xl': '10px' }}
                justifyContent='space-between'
                alignItems='center'
                w='100%'
                mb='8px'>
                <Text color={"#1b2559"} fontSize='md' fontWeight='700' mt='4px' ml={'5px'}>
                    Staked Dank Chart
                </Text>
            </Flex>
            { contractDankStakedBalance ?
                <PieChart h='100%' w='100%' chartData={[
                    (contractDankStakedBalance ? userDankStakedBalance / contractDankStakedBalance * 100 : 0),
                    (contractDankStakedBalance ? (contractDankStakedBalance - userDankStakedBalance) / contractDankStakedBalance * 100 : 0)
                ]} chartOptions={pieChartOptions}/>
                :
                // I want to display loading icon here in case contractDankStakedBalance is not yet loaded
                user.actor ?
                    <Text color={"rgba(76,94,142,0.87)"} fontSize='sm' fontWeight='700' mt='4px' ml={'5px'}>
                        Loading...
                    </Text>
                    :
                    <Text color={"#ff0000"} fontSize='sm' fontWeight='700' mt='4px' ml={'5px'}>
                        Connect your wallet to stake Dank
                    </Text>
            }
            <Flex
                bg={"white"}
                flexDirection='row'
                borderRadius={"10px"}
                boxShadow={"0px 18px 40px #7090b0"}
                w='100%'
                p='15px'
                px='20px'
                mt='15px'
                mx='auto'>
                <Flex direction='column' py='5px'>
                    <Flex align='center'>
                        <Box h='8px' w='8px' bg='#2f17bc' borderRadius='50%' me='4px' />
                        <Text fontSize='xs' color='#7090b0' fontWeight='700' mb='5px'>
                            Your staked dank
                        </Text>
                    </Flex>
                    <Text fontSize='lg' color={"#1b2559"} fontWeight='700'>
                        {userDankStakedBalance} ({ contractDankStakedBalance? (userDankStakedBalance/contractDankStakedBalance * 100).toFixed(4) : 0 } %)
                    </Text>
                </Flex>
                <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
                <Flex direction='column' py='5px' me='10px'>
                    <Flex align='center'>
                        <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
                        <Text fontSize='xs' color='#7090b0' fontWeight='700' mb='5px'>
                            Total staked dank
                        </Text>
                    </Flex>
                    <Text fontSize='lg' color={"#1b2559"} fontWeight='700'>
                        {contractDankStakedBalance}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}
