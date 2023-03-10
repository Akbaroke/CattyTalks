import { create } from 'zustand'
import globalType from '../globalType'

export const useFormModal = create(set => {
  return {
    isOpen: false,
    type: null,
    createSet: () =>
      set(() => {
        return {
          isOpen: true,
          type: globalType.CREATE,
        }
      }),
    joinSet: () =>
      set(() => {
        return {
          isOpen: true,
          type: globalType.JOIN,
        }
      }),
    unSet: () =>
      set(() => {
        return {
          isOpen: false,
          type: null,
        }
      }),
  }
})
