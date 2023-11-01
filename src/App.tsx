import React  , {Fragment} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import LayoutComponent from "./components/Layout";
import { AnimatePresence } from "framer-motion";
import "./styles.css"

import {PATH} from "./consts";

import {ClaimingPage, HomePage, StakingPage} from "./pages";


const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Fragment>

              <LayoutComponent>
                  <AnimatePresence>
                      <Routes>
                          <Route path={PATH.HOME} exact element={<HomePage/>}/>
                          <Route path={PATH.STAKING} element={<StakingPage/>}/>
                          <Route path={PATH.CLAIMING} element={<ClaimingPage/>}/>
                      </Routes>
                  </AnimatePresence>
              </LayoutComponent>

          </Fragment>
      </BrowserRouter>
  )
}


export default  App;