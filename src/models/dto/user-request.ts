export default interface UserRequest {
  username: string
  password: string
  email: string
  role: string
  picture_url: string
  picture_id: string
  created_at: Date
  updated_at: Date
  status: string
}