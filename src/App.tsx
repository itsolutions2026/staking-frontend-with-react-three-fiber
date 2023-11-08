import React  , {Fragment} from "react";
import { Route, Routes, BrowserRouter , Navigate} from "react-router-dom";
import { RecoilRoot } from "recoil";
import LayoutComponent from "./components/Layout";
import { AnimatePresence } from "framer-motion";
import "./styles.css"

import {PATH} from "./consts";

import {ClaimingPage, HomePage, StakingPage} from "./pages";


const App: React.FC = () => {
  return (
      <RecoilRoot>
          <BrowserRouter>
              <Fragment>
                  <LayoutComponent>
                      <AnimatePresence>
                          <Routes>
                              <Route path={PATH.HOME} exact element={<HomePage/>}/>
                              <Route path={PATH.STAKING}  element={<StakingPage/>}/>
                              <Route path={"*"}  element={<HomePage/>}/>
                          </Routes>
                      </AnimatePresence>
                  </LayoutComponent>
              </Fragment>
          </BrowserRouter>
      </RecoilRoot>
  )
}

export default  App;
