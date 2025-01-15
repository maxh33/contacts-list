import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, edit, changeStatus } from '../../store/reducers/contacts'
import ContactClass from '../../models/Contact'
import { Button, SaveButton } from '../../styles'

import * as enums from '../../utils/enums/Contact'

type Props = ContactClass

const Contact = ({
  description: originalDescription,
  priority,
  status,
  title,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (originalDescription.length > 0) {
      setDescription(originalDescription)
    }
  }, [originalDescription])

  function cancelEdit() {
    setIsEditing(false)
    setDescription(originalDescription)
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
      <S.Description
        disabled={!isEditing}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <S.ActionBar>
        {/* Ternary operator render buttons based on isEditing state */}
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
                    id
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
