import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../../store/reducers/filter'
import * as S from './styles'
import * as enums from '../../utils/enums/Contact'
import { RootReducer } from '../../store'

export type Props = {
  label: string
  criteria: 'priority' | 'status' | 'all'
  value?: enums.Priority | enums.Status
}

const CardFilter = ({ label, criteria, value }: Props) => {
  const dispatch = useDispatch()
  const { filter, contacts } = useSelector((state: RootReducer) => state)

  const checkIfActive = () => {
    const sameCriteria = filter.criteria === criteria
    const sameValue = filter.value === value

    return sameCriteria && sameValue
  }

  const contactCounter = () => {
    if (criteria === 'all') return contacts.items.length
    if (criteria === 'priority') {
      return contacts.items.filter((item) => item.priority === value).length
    }
    if (criteria === 'status') {
      return contacts.items.filter((item) => item.status === value).length
    }
    return 0
  }

  const filtered = () => {
    dispatch(
      changeFilter({
        criteria,
        value
      })
    )
  }
  const counter = contactCounter()
  const active = checkIfActive()

  return (
    <S.Card $active={active} onClick={filtered}>
      <S.Counter>{counter}</S.Counter>
      <S.Label>{label}</S.Label>
    </S.Card>
  )
}

export default CardFilter
