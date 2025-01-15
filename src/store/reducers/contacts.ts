import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contact from '../../models/Contact'
import * as enums from '../../utils/enums/Contact'

type ContactsState = {
  items: Contact[]
}

const initialState: ContactsState = {
  items: [
    {
      id: 1,
      description: '+55 43 99999-9999',
      priority: enums.Priority.WORK,
      status: enums.Status.DONE,
      title: 'Maria Carla'
    },
    {
      id: 2,
      description: '+55 13 99999-9999',
      priority: enums.Priority.OTHERS,
      status: enums.Status.TO_DO,
      title: 'Pedro Paulo'
    },
    {
      id: 3,
      description: '+55 11 99999-9999',
      priority: enums.Priority.FAMILY,
      status: enums.Status.TO_DO,
      title: 'Rafael Silva'
    }
  ]
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.items = [
        ...state.items.filter((contact) => contact.id !== action.payload)
      ]
    },
    edit: (state, action: PayloadAction<Contact>) => {
      const indexContact = state.items.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexContact >= 0) {
        state.items[indexContact] = action.payload
      }
    },
    insert: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      const ContactAlreadyExists = state.items.find(
        (contact) =>
          contact.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (ContactAlreadyExists) {
        alert('Contact already exists')
      } else {
        const lastContact = state.items[state.items.length - 1]
        const newContact = {
          ...action.payload,
          id: lastContact ? lastContact.id + 1 : 1
        }
        state.items.push(newContact)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; done: boolean }>
    ) => {
      const indexContact = state.items.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexContact >= 0) {
        state.items[indexContact].status = action.payload.done
          ? enums.Status.DONE
          : enums.Status.TO_DO
      }
    }
  }
})

export const { remover, edit, insert, changeStatus } = contactsSlice.actions

export default contactsSlice.reducer
