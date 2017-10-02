<template>
  <div class="playground">
    <h1>playground 1</h1>
    <input placeholder="type something here" type="text" ref="ref1" :maxlength="maxLen"/>
    <input placeholder="type something here" type="text" ref="ref2" :maxlength="maxLen"/>
    <input placeholder="type something here" type="text" ref="ref3" :maxlength="maxLen"/>
    <br>
    <br>
    <br>
    <h3>Example on how to pass a value between pages</h3>
    <input type="text" placeholder="enter a value here" v-model="testVal">
    <br> <p>This value will be displayed <router-link to="/playground2">here</router-link></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      maxLen: 5,
      testVal: null
    }
  },

  computed: {
    ...mapGetters([ 'getTestValue' ])
  },

  mounted () {
    this.$refs.ref1.onkeyup = () => {
      if (this.$refs.ref1.value.length === 0) {
        this.$refs.ref3.focus()
      }
      if (this.$refs.ref1.value.length === this.maxLen) {
        this.$refs.ref2.focus()
      }
    }
    this.$refs.ref2.onkeyup = () => {
      if (this.$refs.ref2.value.length === 0) {
        this.$refs.ref1.focus()
      }
      if (this.$refs.ref2.value.length === this.maxLen) {
        this.$refs.ref3.focus()
      }
    }
    this.$refs.ref3.onkeyup = () => {
      if (this.$refs.ref3.value.length === 0) {
        this.$refs.ref2.focus()
      }
      if (this.$refs.ref3.value.length === this.maxLen) {
        this.$refs.ref1.focus()
      }
    }

    this.testVal = this.getTestValue
  },

  watch: {
    testVal () {
      this.$store.commit('updateTestValue', this.testVal)
    }
  }
}
</script>
