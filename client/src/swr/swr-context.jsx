import React, { createContext, useContext } from 'react'
import axios from '../api'
import useSWR from 'swr'
import { useSelector } from 'react-redux'

export const SWRContext = createContext()

export const SWRProvider = ({ children }) => {
  const { id } = useSelector(state => state.user)
  const { code } = useSelector(state => state.room)

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
    : { data: [] }

  const { data: join } = id
    ? useSWR(`/room/join`, joinList)
    : { data: [] }

  return (
    <SWRContext.Provider value={{ room, join }}>
      {children}
    </SWRContext.Provider>
  )
}

export const useSWRContext = () => useContext(SWRContext)
