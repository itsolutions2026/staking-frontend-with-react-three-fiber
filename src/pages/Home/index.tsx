// node_modules
import React, { useState, useContext, useCallback, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
// components
import { ValueItemBoxComponent } from "../../components";


const HomePage: React.FC = () => {
    const [SATsBalance, setSATsBalance] = useState<string>("0");
    const [SATsPrice] = useState<string>("0");
    const [treasuryBalance] = useState<string>("0");
    const [burnedTokens] = useState<string>("0");

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
                    label={"Your Balance"}
                    text={`${SATsBalance} Danks`}
                />
                <ValueItemBoxComponent
                    label={"Dank Price"}
                    text={`${SATsPrice}$`}
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
                    label={"Treasury Balance"}
                    text={`${treasuryBalance} $`}
                />
                <ValueItemBoxComponent
                    label={"Burned Tokens"}
                    text={`${burnedTokens} Danks`}
                />
            </Flex>
        </motion.div>
    );
};

export default HomePage;