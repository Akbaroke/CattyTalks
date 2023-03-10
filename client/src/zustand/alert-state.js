import { create } from 'zustand'
import globalType from '../globalType'

export const useAlertState = create(set => {
  return {
    isOpen: false,
    type: null,
    message: null,
    alertOpenSuccess: message =>
      set(() => {
        return {
          isOpen: true,
          type: globalType.SUCCESS,
          message: message,
        }
      }),
    alertOpenError: message =>
      set(() => {
        return {
          isOpen: true,
          type: globalType.ERROR,
          message: message,
        }
      }),
    alertClose: () =>
      set(() => {
        return {
          isOpen: false,
          type: null,
          message: null,
        }
      }),
  }
})
