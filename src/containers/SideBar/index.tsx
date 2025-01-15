import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CardFilter from '../../components/CardFilter'
import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'

import * as S from './styles'
import * as enums from '../../utils/enums/Task'
import { Button, Field } from '../../styles'

type Props = {
  showFilteredResults: boolean
}

const SideBar = ({ showFilteredResults }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { term } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.Aside>
      <div>
        {showFilteredResults ? (
          <>
            <Field
              type="text"
              placeholder="Search"
              value={term}
              onChange={(event) => dispatch(changeTerm(event.target.value))}
            />
            <S.Filters>
              <CardFilter
                value={enums.Status.TO_DO}
                criteria="status"
                label="pendent"
              />
              <CardFilter
                value={enums.Status.DONE}
                criteria="status"
                label="done"
              />
              <CardFilter
                value={enums.Priority.URGENT}
                criteria="priority"
                label="urgent"
              />
              <CardFilter
                value={enums.Priority.IMPORTANT}
                criteria="priority"
                label="important"
              />
              <CardFilter
                value={enums.Priority.NORMAL}
                criteria="priority"
                label="regular"
              />
              <CardFilter criteria="all" label="all tasks" />
            </S.Filters>
          </>
        ) : (
          <Button onClick={() => navigate('/')}>Back to the tasks list</Button>
        )}
      </div>
    </S.Aside>
  )
}

export default SideBar
