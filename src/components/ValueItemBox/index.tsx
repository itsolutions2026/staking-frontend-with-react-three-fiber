// node_modules
import React from "react";
import { Grid, Heading, Text } from "@chakra-ui/react";

interface ValueItemProps {
    label: string;
    text: string;
}

const ValueItemBoxComponent: React.FC<ValueItemProps> = ({ label, text }) => {
    return (
        <>
            <Grid
                display={"grid"}
                alignItems={"center"}
                justifyContent={"center"}
                backgroundImage={"linear-gradient(90deg, rgb(17 80 106 / 61%) 0%, rgb(28 83 130 / 78%) 35%, rgb(65 115 133 / 61%) 100%)"}
                width={"350px"}
                height={"160px"}
                boxShadow={"0px 5px 10px 1px #203949"}
                margin={"20px"}
                borderRadius={"15px"}
                color={"white"}
            >
                <Heading
                    padding={"2px"}
                    margin={"0px"}
                    fontSize={"28px"}
                    textAlign={"center"}
                >
                    {label}
                </Heading>
                <Text
                    padding={"2px"}
                    margin={"0px"}
                    textAlign={"center"}
                    fontSize={"20px"}
                >
                    {text}
                </Text>
            </Grid>
        </>
    );
};

export default ValueItemBoxComponent;
