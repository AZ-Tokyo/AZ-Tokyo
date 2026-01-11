import type { GormModel, User } from '../types/model'

const API_BASE = '/api/users'

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_BASE)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export const getUser = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export type CreateUserPayload = Omit<User, keyof GormModel>

export const createUser = async (user: CreateUserPayload): Promise<User> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  return response.json()
}
