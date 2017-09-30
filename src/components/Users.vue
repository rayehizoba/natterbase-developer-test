<template>
  <div class="users">
    <h4 v-if="loading">loading 50 users from mock JSON data api...</h4>
    <template v-else>
      <strong>Search: </strong>
      <input type="text" placeholder="search" v-model="search">
      <br>
      <br>
      <strong>Sort by: </strong>
      <input type="radio" id="name" value="name" v-model="sort">
      <label for="name">Name</label>
      <input type="radio" id="website" value="website" v-model="sort">
      <label for="website">Website</label>
      <br>
      <table>
        <thead>
          <tr>
            <th>
              <strong>#</strong>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link :to="`/user/${user.id}/profile`">{{ user.name }}</router-link>
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.website }}</td>
          </tr>
        </tbody>
      </table>
      <p v-show="filteredUsers.length === 0">
        <i>No users available :(</i>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      loading: true,
      search: '',
      sort: null
    }
  },

  computed: {
    filteredUsers () {
      return this.users.filter(user => {
        return user.name.toLowerCase().indexOf(this.search) >= 0
      })
    }
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    fetchUsers () {
      this.$http.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          this.users = response.data
          this.loading = false
        }).catch(err => {
          console.log(`An error occured: ${err}`)
        })
    }
  },

  watch: {
    sort () {
      if (this.sort === 'name') {
        this.users.sort((a, b) => {
          let nameA = a.name.toUpperCase() // ignore upper and lowercase
          let nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          // names must be equal
          return 0
        })
      } else if (this.sort === 'website') {
        this.users.sort((a, b) => {
          let websiteA = a.website.toUpperCase() // ignore upper and lowercase
          let websiteB = b.website.toUpperCase() // ignore upper and lowercase
          if (websiteA < websiteB) return -1
          if (websiteA > websiteB) return 1
          // websites must be equal
          return 0
        })
      }
    }
  }
}
</script>

<style>
table {
  display: inline-block;
  text-align: left;
  margin-top: 30px;
}

th,
td {
  padding: 0 15px;
}
</style>