export interface UserSchema {
  id?: number
  slug?: string
  nickname?: string
  avatar_source?: string
  total_likes_count?: number
  total_wordage?: number
  is_following_user?: boolean
}

export interface UsersRes {
  success: boolean,
  data?: UserSchema[]
  total?: number
  page?: number
}
