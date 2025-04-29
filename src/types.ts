export interface User {
  first_name: string
  last_name: string
  email?: string
  cell?: number
}
export interface UserWithId extends User {
  _id: string
  date: Date
}
