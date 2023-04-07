// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy} from 'react';
import {AlertProvider} from "../Components/Providers/Alert/Alert.provider";
import {ConfirmationProvider} from "../Components/Providers/ConfirmDialog/ConfirmDialog.provider";
import {BoardsPage} from "./Private/Boards/Boards.page";


const Login = lazy(() => import("./Public/login/login.page"));
const NoMatch = lazy(() => import("./NoMatch/NoMatch"));

const Routes = () => {
  return (
    <AlertProvider>
      <ConfirmationProvider>
        <BrowserRouter>
          <Router>
            <Route path="/" element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="/app" element={<Outlet/>}>
              <Route path="boards" element={<BoardsPage/>}>
                <Route path=":boardId" element={<>board</>}/>
                <Route path=":boardId/edit" element={<>board edit</>}/>
              </Route>
              <Route path="*" element={<NoMatch/>}/>
            </Route>
            <Route path="/app/settings" element={<></>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Router>
        </BrowserRouter>
      </ConfirmationProvider>
    </AlertProvider>
  );
}

export default Routes;
