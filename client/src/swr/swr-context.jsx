import React, { createContext, useContext } from 'react'
import axios from '../api'
import useSWR from 'swr'
import { useSelector } from 'react-redux'

export const SWRContext = createContext()

export const SWRProvider = ({ children }) => {
  const { id } = useSelector(state => state.user)

  const roomList = async () => {
    const { data } = await axios.get(`/room/${id}`)
    return data
  }

  const joinList = async () => {
    const { data } = await axios.get(`/room/join/${id}`)
    return data
  }

  const { data: room } = id
    ? useSWR(`/room/${id}`, roomList)
    : []

  const { data: join } = id
    ? useSWR(`/room/join`, joinList)
    : []

  return (
    <SWRContext.Provider value={{ room, join }}>
      {children}
    </SWRContext.Provider>
  )
}

export const useSWRContext = () => useContext(SWRContext)
