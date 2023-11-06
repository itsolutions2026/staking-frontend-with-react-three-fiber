import {useRecoilState, useRecoilValue} from "recoil";
import {userAvatar, userState} from "../../atoms";
import * as SDK from "../../util/webSdk"
import {Button, Avatar, Flex, Text, useToast} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {motion} from "framer-motion";

export const AvatarComponent = () => {
    const [user, setUser] = useRecoilState(userState);
    const avatar = useRecoilValue(userAvatar)
    const toast = useToast()

    const clear = () => setUser({
        actor: '',
        permission: '',
        accountData: undefined,
        metadata: {}
    })

    const login = async (reconnect: boolean = false) => {

        clear()

        try{
            if (reconnect) {
                await SDK.reconnect()
            } else {
                await SDK.login()
            }
            if (SDK.session && SDK.session.auth) {

                const loadDataPromise = SDK.loadData(setUser)

                toast.promise(loadDataPromise, {
                    success: {
                        title: 'Success',
                        description: 'User data is loaded successfully',
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
                        title: 'Login Success',
                        description: 'Loading user data...',
                        position: "bottom-left"
                    }
                })
            }
        }
        catch (e) {
            console.log(e.message)
        }

    }

    const logout = async () => {
        await SDK.logout()
        clear()
    }

    useEffect(()=>{
        login(true);
    },[])

    if (!user.actor) {
        return (
            <motion.div className={"home"} initial={{ opacity: 0}} animate={{opacity : 1}} exit={{opacity: 0}}>
            <Button
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"150px"}
                height={"60px"}
                overflow={"hidden"}
                boxShadow={"0 0 4px 1px #e0f1ff"}
                bg={"none"}
                _hover={{
                    backgroundImage:"linear-gradient(20deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)",
                    color: "#add0e3",}}
                color={"white"}
                fontSize={"md"}
                border={"none"}
                mr={"20px"}
                onClick={() => login()}
            >
                Connect Wallet
            </Button>
            </motion.div>
        )
    }

    return (
        <motion.div className={"home"} initial={{ opacity: 0}} animate={{opacity : 1}} exit={{opacity: 0}}>
        <Flex
            alignItems='center'
            flexDirection='row'
            bg={"none"}
            boxShadow={"0 0 4px 1px #e0f1ff"}
            _hover={{
                backgroundImage:"linear-gradient(20deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)",
                color: "#add0e3",}}
            flexWrap={'wrap'}
            p='10px'
            borderRadius='10px'
            cursor={'pointer'}
            onClick={()=> logout()}
        >
            <Flex
                display={'flex'}
                borderRadius='10px'
                ms='auto'
                p='6px'
                align='center'
                me='6px'>
                <Text w='max-content' color={"white"} fontSize='md' fontWeight='700' me='6px'>
                    {user.actor}
                </Text>
            </Flex>
            <Avatar size={"sm"} src={avatar}/>
        </Flex>
        </motion.div>
    );
}
