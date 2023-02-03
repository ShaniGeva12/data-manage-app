export interface Tag {
  id: string,
  color: string,
  name: string,
  description: string,
  createDate: Date,
  lastUpdate?: Date,
  createdBy: string
}

export interface AddTagRequest {
  color: string,
  name: string,
  description: string,
  createDate: Date,
  lastUpdate?: Date,
  createdBy: string
}
