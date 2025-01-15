import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MainContainer, SaveButton, Title } from '../../styles'
import { Field } from '../../styles'
import { Form, Options, Option } from './styles'

import * as enums from '../../utils/enums/Contact'
import { insert } from '../../store/reducers/contacts'

const Formulary = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(enums.Priority.OTHERS)

  const contactRegister = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      insert({
        title,
        priority,
        description,
        email,
        phone,
        status: enums.Status.TO_DO
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title>New Contact</Title>
      <Form onSubmit={contactRegister}>
        <Field
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <Field
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
        />
        <Field
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          type="tel"
          placeholder="Phone"
        />
        <Field
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Contact Description"
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
                defaultChecked={priority === enums.Priority.OTHERS}
              />{' '}
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
        </Options>
        <SaveButton type="submit">Add Contact</SaveButton>
      </Form>
    </MainContainer>
  )
}

export default Formulary
