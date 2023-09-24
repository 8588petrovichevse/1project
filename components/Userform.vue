<template>
    <div>
        <v-text-field
      v-model="name"
      clearable
      label="Имя"
    ></v-text-field>
    <v-text-field
      v-model="family"
      clearable
      label="Фамилия"
    ></v-text-field>

    <v-btn @click=" addUser()">
       {{ mode == 'add' ? "Добавить пользователя" : "Редактировать"}}
    </v-btn>
    </div>
</template>

<script>

export default {
    name: 'UserForm',
    props: {
      user: {
        type: Object,
        default : () => {},
      },
      mode: {
        type: String,
        default: 'add',
      }

    },
    data () {
      return {
      name: '',
      family: '',
      id: 0,
      }
    },
    watch: {
      user: {
        deep: true,
        handler () {
        this.name = this.user.name;
        this.family = this.user.family;
        this.id = this.user.id;
        }
      }
    },
    mounted() {
      if (this.mode === 'edit') {
        this.name = this.user.name;
        this.family = this.user.family;
        this.id = this.user.id;
      }
    },
    methods: {
      addUser() {
        const payload = {id : this.id, name: this.name, family: this.family}
        this.mode === 'add' ? this.$emit('add', payload) : this.$emit('edit', payload)
      },
    }
  }
</script>