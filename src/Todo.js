export default class Todo {
  constructor (title, id) {
    this.title = title
    this.id = id
    this.complete = false
    this.status = 'new'
  }
}
