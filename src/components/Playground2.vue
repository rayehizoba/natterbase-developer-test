<template>
  <div class="playground">
    <h1>playground 2</h1>
    <input placeholder="type something here" type="number" v-model.number="num1"/>
    <input placeholder="type something here" type="number" v-model.number="num2"/>
    <input placeholder="type something here" type="number" v-model.number="num3"/>
    <input placeholder="the sum is displayed here" type="number" v-model.number="sum" ref="sum"/>
    <br>
    <br>
    <br>
    <h3>Value from passed from <router-link to="/playground1">Playground 1</router-link> = {{ getTestValue }}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      num1: null,
      num2: null,
      num3: null,
      sum: null
    }
  },

  computed: {
    ...mapGetters([ 'getTestValue' ])
  },

  mounted () {
    this.$refs.sum.onkeyup = this.spreadSum
  },

  methods: {
    calcSum () {
      this.sum = this.num1 + this.num2 + this.num3
    },

    spreadSum () {
      // Based on stackoverflow answer found here
      // https://stackoverflow.com/questions/18610483/divide-integer-number-into-3-parts-using-php
      let remainder = this.sum % 3
      let third = Math.floor(this.sum / 3)
      let lastBit = third + remainder

      this.num1 = third
      this.num2 = third
      this.num3 = lastBit
    }
  },

  watch: {
    num1 () {
      this.calcSum()
    },

    num2 () {
      this.calcSum()
    },

    num3 () {
      this.calcSum()
    }
  }
}
</script>

<style>

</style>
