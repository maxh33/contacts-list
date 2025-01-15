import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import * as enums from '../../utils/enums/Task'

type TasksState = {
  items: Task[]
}

const initialState: TasksState = {
  items: [
    {
      id: 1,
      description: 'Python practice exercises',
      priority: enums.Priority.IMPORTANT,
      status: enums.Status.DONE,
      title: 'Python Task'
    },
    {
      id: 2,
      description: 'React practice exercises',
      priority: enums.Priority.NORMAL,
      status: enums.Status.TO_DO,
      title: 'React Task'
    },
    {
      id: 3,
      description: 'TypeScript practice exercises',
      priority: enums.Priority.URGENT,
      status: enums.Status.TO_DO,
      title: 'TypeScript Task'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.items = [
        ...state.items.filter((task) => task.id !== action.payload)
      ]
    },
    edit: (state, action: PayloadAction<Task>) => {
      const indexTask = state.items.findIndex((t) => t.id === action.payload.id)
      if (indexTask >= 0) {
        state.items[indexTask] = action.payload
      }
    },
    insert: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const taskAlreadyExists = state.items.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (taskAlreadyExists) {
        alert('Task already exists')
      } else {
        const lastTask = state.items[state.items.length - 1]
        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.items.push(newTask)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; done: boolean }>
    ) => {
      const indexTask = state.items.findIndex((t) => t.id === action.payload.id)
      if (indexTask >= 0) {
        state.items[indexTask].status = action.payload.done
          ? enums.Status.DONE
          : enums.Status.TO_DO
      }
    }
  }
})

export const { remover, edit, insert, changeStatus } = tasksSlice.actions

export default tasksSlice.reducer
