export interface IDiploma {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: data[]
  metadata: metadata
}

export interface data {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
