import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      id: 0,
      title: 'One',
      complete: false,
      status: 'new'
    }]
  },
  getters: {
    archivedTodos: state => state.todos.filter(todo => todo.status === 'archived'),
    archivedTodosLength: (state, getters) => getters.archivedTodos.length
  },
  mutations: {
    pushTodo (state, todo) {
      state.todos.push(todo)
    },
    toggleComplete (state, id) {
      state.todos.forEach(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete
        }
      })
    },
    toggleStatus (state, id) {
      state.todos.forEach(todo => {
        if (todo.id === id) {
          todo.status === 'archived' ? todo.status = 'new' : todo.status = 'archived'
        }
      })
    }
  },
  actions: {}
})
