import { create } from 'zustand'

export const useLoadingState = create(set => {
  return {
    isLoading: false,
    loadingSet: () =>
      set(() => {
        return {
          isLoading: true,
        }
      }),
    loadingUnset: () =>
      set(() => {
        return {
          isLoading: false,
        }
      }),
  }
})
