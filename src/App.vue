<template>
  <div class="badass-todo">

    <div class="title has-text-centered">
      Badass Todo
    </div>

    <form @submit.prevent="addTodo">

      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
          <button type='submit' class="button is-info" :disabled='!addTodo'>
            Add
          </button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="todo in todos" :class="{ 'has-background-success-light': todo.done }">
      <div class="card-content">
        <div class="content">

          <div class="columns is-moblie is-vcentered">
            <div class="column" :class="{ 'column has-text-success line-through': todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button" :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)">&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger">&cross;</button>
            </div>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/'
import { collection, addDoc, onSnapshot, 
        deleteDoc, updateDoc, doc,
        query, orderBy, limit
      } from "firebase/firestore";


const todos = ref()
const firebaseCollection = collection(db, 'todos')
const firebaseCollectionQuery = query(firebaseCollection, orderBy('date', 'desc'))

// Receber dados da coleçao

onMounted(async () => {
  //   const querySnapshot = await getDocs(collection(db, "todos"))
  //   let fbTodos = []
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, doc.data())
  //     const todo = {
  //       id: doc.id,
  //       content: doc.data().content,
  //       done: doc.data().done
  //     }
  //     fbTodos.push(todo)
  //   })
  //   todos.value = fbTodos

  // ler dados
  onSnapshot(firebaseCollectionQuery, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })

})

// Adicionando dados a coleçao

const newTodoContent = ref()
const addTodo = () => {
  addDoc(firebaseCollection,
    {
      content: newTodoContent.value,
      done: false,
      date: Date.now()
    })
    newTodoContent.value = ''
}


// Excluindo tarefa
const deleteTodo = id => {
  // todos.value = todos.value.filter(todo => todo.id !== id)

  deleteDoc(doc(firebaseCollection, id))
}


// update collection
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  // todos.value[index].done = !todos.value[index].done

updateDoc(doc(firebaseCollection, id), {
    done: !todos.value[index].done
  })
}
</script>


<style>
@import "bulma/css/bulma.min.css";




.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>