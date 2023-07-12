// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy} from 'react';
import {AlertProvider} from "../Components/Providers/Alert/Alert.provider";
import {ConfirmationProvider} from "../Components/Providers/ConfirmDialog/ConfirmDialog.provider";
import {BoardsPage} from "./Private/Boards/Boards.page";
import {BoardPage} from "./Private/Boards/Board.page";
import PageFrame from "../Components/PageFrame/PageFrame";
import {AuthProvider, RequireAuth} from "../Components/Providers/Authorization/Authorization.provider";
import {ApisPage} from "./Private/Apis/Apis.page";


const Login = lazy(() => import("./Public/Login/Login.page"));
const Signup = lazy(() => import("./Public/Signup/Signup.page"));
const NoMatch = lazy(() => import("./NoMatch/NoMatch"));

const Routes = () => {
  return (
      <AuthProvider>
        <AlertProvider>
          <ConfirmationProvider>
            <BrowserRouter>
              <Router>
                <Route path="/" element={<Login/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="/app" element={
                  <PageFrame>
                    <RequireAuth>
                      <Outlet/>
                    </RequireAuth>
                  </PageFrame>
                }>
                  <Route path="boards" element={<BoardsPage/>}/>
                  <Route path="boards/:boardId" element={<BoardPage/>}/>
                  <Route path="boards/:boardId/edit" element={<BoardPage/>}/>
                  <Route path="apis" element={<ApisPage/>}>
                    <Route path=":apiId" element={<BoardsPage/>}/>
                  </Route>
                  <Route path="*" element={<NoMatch/>}/>
                </Route>
                <Route path="*" element={<NoMatch/>}/>
              </Router>
            </BrowserRouter>
          </ConfirmationProvider>
        </AlertProvider>
      </AuthProvider>
  )
      ;
}

export default Routes;
