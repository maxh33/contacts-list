import * as enums from '../utils/enums/Contact'

class Contact {
  title: string
  priority: enums.Priority
  status: enums.Status
  description: string
  email: string
  phone: string
  id: number

  constructor(
    title: string,
    priority: enums.Priority,
    status: enums.Status,
    description: string,
    email: string,
    phone: string,
    id: number
  ) {
    this.title = title
    this.priority = priority
    this.status = status
    this.email = email
    this.phone = phone
    this.id = id
    this.description = description
  }
}

export default Contact
