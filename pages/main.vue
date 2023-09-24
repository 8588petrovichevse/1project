<template>
  <v-img
   :height = "650"
   aspect-ratio="16/9"
   cover
    src="https://cdn.boon.hu/2022/11/MbnjNZo9jNtwbjxbf--_-LvPkqaDnhfGINN56K8Mobk/fill/850/478/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50LzMyMTE5Mjg0YWE4ZTQxMWRiNWZhOTQ1ZWQ3ZTUzMTZh.jpg"
  >
    <div>
      <h1>Личный кабинет пользователя</h1>
      <ul>
        <li v-for="_user in users" :key= "_user.id">
          {{ _user.name }}  {{ _user.family }}
          <v-btn
            class = "mx-2"
            fab
            dark
            color = "grey-lighten-5"
            small
            @click = "sendUser(_user.id)"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </li>
      </ul>
      <user-form
      :user = "user"
      mode = "mode"
      @add = " addUser"
      @edit ="editUser">
      </user-form>
    </div>
  </v-img>
  </template>
  <script>
import UserForm from '../components/Userform';
  export default {
    name: 'MainPage',
    components: {
      UserForm,
    },
    data () {
      return {
        user: {
          name: '',
          family: '',
          id: 0,
        },
      users: [
      {
        id: 1,
        name: 'Светлана',
        family: 'Петровичева'
      } 
    ],
      filter: '',
      mode: 'add'
     }
    },
    computed: {
      filteredUsers() {
        const fil = new RegExp(this.filter, 'i');
        return this.filter ? this.users.filter(val => val.match(fil)) : this.users;
      }
    },
    methods: {
      addUser(data) {
        this.users.push(data.name + ' ' + data.family);
      },
      sendUser(id) {
       const user = this.users.find(user => user.id ===id);
       this.mode = 'edit';
       this.user = user;
      },
      editUser() {
       
      }
    }

  }
  </script>
  <style>
   p {
    color: rgb(23, 194, 26);
   }
  </style>
  