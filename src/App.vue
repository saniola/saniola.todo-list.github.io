<template lang='pug'>

  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5.flex.flex-column

      template(
        v-for='(todo, i) in todos'
        v-if='todo.status === "new"'
      )

        div.c-pointer.flex.flex-row.ba.b--near-white.br2.pa2.shadow-3.mv2.tl(
          :class='{ "bg-washed-gray": todo.complete }'
          @click='check(todo.id)'
        )
          input.input-checkbox.ma2(
            v-model='todo.complete'
            type='checkbox'
            @click='check(todo.id)'
          )
          span.text.ml2.sans-serif.f4.lh-copy(:class='{ strike: todo.complete, gray: todo.complete }') {{ todo.title }}
          button.button-cross.bn.bg-white.sans-serif(
            :class='{ "bg-opa-gray": todo.complete }'
            @click.stop='remove(todo.id)'
          ) x

      input.input-text.mv2.ba.b--light-gray.br2.pa2.sans-serif(
        v-model='newTodoTitle'
        placeholder='New Todo'
        type='text'
        @keyup.enter='add'
      )

    template(v-if='archivedTodosLength')
      h1.tc.f5.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5.flex.flex-column

        template(v-for='(todo, i) in archivedTodos')
          div.c-pointer.flex.flex-row.ba.b--near-white.br2.pa2.shadow-3.mv2.tl(
            :class='{ "bg-washed-gray": todo.complete }'
            @click='check(todo.id)'
          )

            input.input-checkbox.ma2(
              v-model='todo.complete'
              type='checkbox'
              @click='check(todo.id)'
            )
            span.text.ml2.sans-serif.f4.lh-copy(:class='{ strike: todo.complete, gray: todo.complete }') {{ todo.title }}
            button.button-cross.bn.bg-white.sans-serif(
              :class='{ "bg-opa-gray": todo.complete }'
              @click.stop='remove(todo.id)'
            ) x

</template>

<script>

  import {mapState, mapGetters, mapMutations} from 'vuex'
  import Todo from './Todo'

  export default {
    components: {},
    data: () => ({
      newTodoTitle: null
    }),
    computed: {
      /**
       * state of todos
       */
      ...mapState([
        'todos'
      ]),
      /**
       * computes archivedTodos and it's length
       */
      ...mapGetters([
        'archivedTodos',
        'archivedTodosLength'
      ])
    },
    methods: {
      /**
       * calls mutation that pushes Todo into todo-list
       * clear input after
       */
      add () {
        this.pushTodo(new Todo(this.newTodoTitle, this.todos.length))
        this.newTodoTitle = null
      },
      /**
       * calls mutation that put Todo into archivedTodos and back
       */
      remove (id) {
        this.toggleStatus(id)
      },
      /**
       * calls mutation that cross off Todo and back
       */
      check (id) {
        this.toggleComplete(id)
      },
      /**
       * creates links for appropriate mutations
       */
      ...mapMutations([
        'pushTodo',
        'toggleStatus',
        'toggleComplete'
      ])
    }
  }

</script>

<style lang="stylus" scoped>

  .input-text
    outline: none

  .input-checkbox
    transform: scale(1.2)
    cursor: pointer

  .text
    flex: 1
    cursor: pointer

  .button-cross
    outline: none
    cursor: pointer

  .bg-washed-gray
    background-color: rgba(0, 0, 0, .1)

  .bg-opa-gray
    background-color: rgba(0, 0, 0, .007)

  .c-pointer
    cursor: pointer

</style>
