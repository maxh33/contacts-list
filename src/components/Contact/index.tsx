import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, edit, changeStatus } from '../../store/reducers/contacts'
import ContactClass from '../../models/Contact'
import { Button, Field, SaveButton } from '../../styles'

import * as enums from '../../utils/enums/Contact'

type Props = ContactClass

const Contact = ({
  description: originalDescription,
  priority,
  status,
  title,
  id,
  email: originalEmail,
  phone: originalPhone
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (originalDescription.length > 0) {
      setDescription(originalDescription)
    }
    if (originalEmail.length > 0) {
      setEmail(originalEmail)
    }
    if (originalPhone.length > 0) {
      setPhone(originalPhone)
    }
  }, [originalDescription, originalEmail, originalPhone])

  function cancelEdit() {
    setIsEditing(false)
    setDescription(originalDescription)
    setEmail(originalEmail)
    setPhone(originalPhone)
  }

  function changeStatusContact(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      changeStatus({
        id,
        done: event.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          type="checkbox"
          id={title}
          checked={status === enums.Status.DONE}
          onChange={changeStatusContact}
        />
        <S.Title>
          {isEditing && <em>Editing: </em>}
          {title}
        </S.Title>
      </label>
      <S.Tag $parameter="priority" $priority={priority}>
        {priority}
      </S.Tag>
      <S.Tag $parameter="status" $status={status}>
        {status}
      </S.Tag>
      <Field
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Email"
        disabled={!isEditing}
      />
      <Field
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        type="tel"
        placeholder="Phone Number"
        disabled={!isEditing}
      />
      <S.Description
        disabled={!isEditing}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <S.ActionBar>
        {isEditing ? (
          <>
            <SaveButton
              onClick={() => {
                dispatch(
                  edit({
                    description,
                    priority,
                    status,
                    title,
                    id,
                    email,
                    phone
                  })
                )
                setIsEditing(false)
              }}
            >
              Save
            </SaveButton>
            <S.CancelButton onClick={cancelEdit}>Cancel</S.CancelButton>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <S.CancelButton onClick={() => dispatch(remover(id))}>
              Remove
            </S.CancelButton>
          </>
        )}
      </S.ActionBar>
    </S.Card>
  )
}

export default Contact
