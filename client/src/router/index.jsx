import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Login from '../page/login/Login'
import Home from '../page/home/Home'
import * as Middleware from '../middlewares'
import { SWRProvider } from '../swr/swr-context'
import Chat from '../page/chat/Chat'

export default function root() {
  return (
    <Middleware.User>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
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
          <Route
            exact
            path="/chat"
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
