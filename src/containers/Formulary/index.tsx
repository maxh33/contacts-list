import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MainContainer, SaveButton, Title } from '../../styles'
import { Field } from '../../styles'
import { Form, Label, Options, Option } from './styles'

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
  const [hasWhatsApp, setHasWhatsApp] = useState(true)

  const contactRegister = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      insert({
        title,
        priority,
        description,
        email,
        phone,
        status: hasWhatsApp
          ? enums.Status.WHATSAPP_CONTACT
          : enums.Status.NON_WHATSAPP
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
        <Label>
          <input
            type="checkbox"
            checked={hasWhatsApp}
            onChange={(event) => setHasWhatsApp(event.target.checked)}
          />
          Has Whats App
        </Label>
        <Options>
          <Label>Category</Label>
          {Object.values(enums.Priority).map((priority) => (
            <Option key={priority}>
              <input
                value={priority}
                name="Category"
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
