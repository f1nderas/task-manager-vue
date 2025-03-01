export interface IColumn {
  id: number
  name: string
  tasks: ITask[]
}

export interface ITask {
  id: number
  text: string
}

export interface INotification {
  id: number
  title: string
  text: string
}
