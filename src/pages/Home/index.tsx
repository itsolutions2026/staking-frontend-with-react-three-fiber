// node_modules
import React from "react";
import {useRecoilValue} from "recoil";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

import {userDankBalance, contractXPRBalance, userNewReward, contractSettingRewardRate} from "../../atoms";

// components
import { ValueItemBoxComponent } from "../../components";
import { TOKEN} from "../../consts";

const HomePage: React.FC = () => {

    const dankBalance = useRecoilValue(userDankBalance);
    const xprBalance = useRecoilValue(contractXPRBalance);
    const reward = useRecoilValue(userNewReward);
    const rewardRate = useRecoilValue(contractSettingRewardRate)

    return (
        <motion.div className={"home"} initial={{ opacity: 0}} animate={{opacity : 1}} exit={{opacity: 0}}>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 800px)": {
                        display: "grid",
                    },
                }}
            >
                <ValueItemBoxComponent
                    label={"Wallet Dank Balance"}
                    text={`${dankBalance} ${TOKEN.DANKTOKEN}`}
                />

                <ValueItemBoxComponent
                    label={"Available Rewards"}
                    text={`${reward} XPR`}
                />

            </Flex>
            <Flex
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    "@media only screen and (max-width: 800px)": {
                        display: "grid",
                    },
                }}
            >
                <ValueItemBoxComponent
                    label={"Contract XPR Amount"}
                    text={`${xprBalance} XPR`}
                />

                <ValueItemBoxComponent
                    label={"Reward Rate"}
                    text={`${Math.round(parseFloat(rewardRate) * 100000000) / 100000000}`}
                />
            </Flex>
        </motion.div>
    );
};

export default HomePage;
