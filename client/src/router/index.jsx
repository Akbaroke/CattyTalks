import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../page/login/Login';
import Home from '../page/home/Home';
import * as Middleware from '../middlewares';
import { SWRProvider } from '../swr/swr-context'
import Chat from '../page/chat/chat'

export default function root() {
  return (
    <Middleware.User>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <Middleware.Auth>
                <Login />
              </Middleware.Auth>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Middleware.Auth>
                <SWRProvider>
                  <Home />
                </SWRProvider>
              </Middleware.Auth>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/chat/:code"
            element={
              <Middleware.Auth>
                <SWRProvider>
                  <Chat />
                </SWRProvider>
              </Middleware.Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Middleware.User>
  )
}
