<template>
  <div class="user">
    <h2>USER {{ userId }}</h2>
    <h3>
      <ul class="links">
        <li class="link">
          <router-link to="profile">profile</router-link>
        </li>
        <li class="link">
          <router-link to="posts">posts</router-link>
        </li>
      </ul>
    </h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    userId () {
      return this.$route.params.id
    }
  }
}
</script>

<style>

</style>
