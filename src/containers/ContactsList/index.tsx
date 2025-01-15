import { useSelector } from 'react-redux'

import Contact from '../../components/Contact'
import { MainContainer, Title } from '../../styles'
import { RootReducer } from '../../store'

const ContactsList = () => {
  const { items } = useSelector((state: RootReducer) => state.contacts)
  const { term, criteria, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  const contactsFilter = () => {
    let filteredContacts = items
    if (term !== undefined) {
      filteredContacts = filteredContacts.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )
      if (criteria === 'priority') {
        filteredContacts = filteredContacts.filter(
          (item) => item.priority === value
        )
      } else if (criteria === 'status') {
        filteredContacts = filteredContacts.filter(
          (item) => item.status === value
        )
      }
      return filteredContacts
    } else {
      return items
    }
  }

  const showFilteredResults = (quantity: number) => {
    let message = ''
    const complement =
      term !== undefined && term.length > 0 ? `e "${term}"` : ''

    if (criteria === 'all') {
      message = `${quantity} contact(s) found(s) as: all ${complement}`
    } else {
      message = `${quantity} contact(s) found(s) as: "${`${criteria}=${value}`}" ${complement}`
    }

    return message
  }

  const contacts = contactsFilter()
  const message = showFilteredResults(contacts.length)

  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {contacts.map((t) => (
          <li key={t.title}>
            <Contact
              id={t.id}
              description={t.description}
              title={t.title}
              status={t.status}
              priority={t.priority}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ContactsList
