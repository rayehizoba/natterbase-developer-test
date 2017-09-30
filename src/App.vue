<template>
  <div id="app">
    <h3>NAVIGATION</h3>
    <ul class="links">
      <li class="link" v-for="link in links" :key="link.name">
        <router-link :to="link.url" active-class>{{ link.name }}</router-link>
      </li>
    </ul>
    <hr>
    <transition name="shuffle" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      links: [
        { name: 'HOME', url: '/' },
        { name: 'USERS', url: '/users' },
        { name: 'PLAYGROUND 1', url: '/playground1' },
        { name: 'PLAYGROUND 2', url: '/playground2' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul.links {
  list-style-type: none;
  padding: 0;
}

ul.links li.link {
  display: inline-block;
  margin: 0 10px;
}

.router-link-exact-active {
  font-weight: bold;
}

a {
  color: #42b983;
}

.shuffle-enter-active, .shuffle-leave-active {
  transition: all .3s
}
.shuffle-enter, .shuffle-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10%);
}
</style>
