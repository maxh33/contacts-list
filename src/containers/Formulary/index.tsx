import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MainContainer, SaveButton, Title } from '../../styles'
import { Field } from '../../styles'
import { Form, Options, Option } from './styles'

import * as enums from '../../utils/enums/Task'
import { insert } from '../../store/reducers/tasks'

const Formulary = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const taskRegister = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      insert({
        title,
        priority,
        description,
        status: enums.Status.TO_DO
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title>New Task</Title>
      <Form onSubmit={taskRegister}>
        <Field
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Title"
        />
        <Field
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Task Description"
        />
        <Options>
          <p>Priority</p>
          {Object.values(enums.Priority).map((priority) => (
            <Option key={priority}>
              <input
                value={priority}
                name="priority"
                type="radio"
                onChange={(event) =>
                  setPriority(event.target.value as enums.Priority)
                }
                id={priority}
                defaultChecked={priority === enums.Priority.NORMAL}
              />{' '}
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
        </Options>
        <SaveButton type="submit">Add Task</SaveButton>
      </Form>
    </MainContainer>
  )
}

export default Formulary
