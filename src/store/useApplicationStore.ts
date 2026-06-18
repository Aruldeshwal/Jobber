import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApplicationState {
  searchQuery: string
  statusFilter: string
  setSearchQuery: (query: string) => void
  setStatusFilter: (filter: string) => void
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      searchQuery: '',
      statusFilter: 'all',
      setSearchQuery: (query) => set({ searchQuery: query }),
      setStatusFilter: (filter) => set({ statusFilter: filter }),
    }),
    {
      name: 'application-storage',
    }
  )
)
