export interface Label {
  id: number,
  name: string,
  color: string
}

export interface User {
  login: string, 
  avatar_url: string 
}
export interface Issue {
  id: number, 
  title: string, 
  number: number
  user: object,
  body: string, 
  lables: [], 
  comments_url: string, 
  state: 'open' | 'closed', 
  comments: number

}