// node_modules
import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box } from "@chakra-ui/react";


import BackgroundComponent from "../Background";
import HeaderComponent from "../Header";
import ControllerComponent from "../Controller";
import FooterComponent from "../Footer";


// context
import LoadingContext from "../../context/loadingContext";

import {PATH} from "../../consts";


interface LayoutProps {
    children: React.ReactNode;
}

const layoutComponent : React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    return (
        <LoadingContext>
            <BackgroundComponent></BackgroundComponent>
            <Box position={"fixed"} alignItems='center' width={"100%"} height={"100%"} overflow={"auto"}  top={"20px"} paddingBottom={"20px"}>
                <HeaderComponent></HeaderComponent>
                <ControllerComponent></ControllerComponent>
                <Grid
                    alignItems={"center"}
                    justifyContent={"center"}
                    w="100%"
                >
                    {children}
                </Grid>
                {location.pathname !== PATH.HOME && (
                    <FooterComponent></FooterComponent>
                )}
            </Box>
        </LoadingContext>
    )
}

export default layoutComponent;
