<template>
  <div class="user-profile">
    <h4 v-if="loading">loading profile data...</h4>
    <template v-else>
      <strong>Username: </strong>{{ profile.username }} <br>
      <strong>Name: </strong>{{ profile.name }} <br>
      <strong>Website: </strong>{{ profile.website }} <br>
      <strong>Telephone: </strong><input type="text" v-tel-mask v-model="form.phoneNumber"/> <br>
      <strong>Salary: </strong><input type="text" v-currency-mask="$" v-model="form.salary"/> <br>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      profile: null,
      form: {
        phoneNumber: '',
        salary: ''
      }
    }
  },

  created () {
    this.getUserProfile()
  },

  methods: {
    getUserProfile () {
      let id = this.$route.params.id
      this.$http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          this.profile = response.data
          this.loading = false
        }).catch(err => {
          console.log(`An error occured: ${err}`)
        })
    }
  },

  directives: {
    // for a real project, I'd just go for already existing plugins
    // rather than re-inventing the wheel, but since I understand that
    // this is a test, I decided to come up with my own little implementations
    'tel-mask': {
      bind (el) {
        let inputVal = ''
        let inputMasked = ''
        let mask = '(XXX)-XXX-XXX-XXXX'

        let updateInput = (e) => {
          let isBackspace = e.key === 'Backspace'
          let isMaxlen = inputMasked.length === mask.length
          let isNotNum = isNaN(parseInt(e.key))

          if (isBackspace) {
            inputVal = inputVal.slice(0, -1)
          } else if (isMaxlen || isNotNum) {
            el.value = inputMasked
            return
          } else {
            inputVal += e.key
          }

          inputMasked = ''
          for (let i = 0; i < inputVal.length; i++) {
            switch (i) {
              case 0:
                inputMasked += `(${inputVal[i]}`
                break
              case 3:
                inputMasked += `)-${inputVal[i]}`
                break
              case 6:
              case 9:
                inputMasked += `-${inputVal[i]}`
                break
              default:
                inputMasked += inputVal[i]
            }
          }
          el.value = inputMasked
        }

        el.setAttribute('placeholder', mask)
        el.setAttribute('maxLength', mask.length)
        el.addEventListener('keyup', updateInput)
      }
    },

    'currency-mask': {
      bind (el, binding) {
        let currency = binding.expression || '$'
        let inputVal = ''
        let inputMasked = ''

        let updateInput = (e) => {
          let isBackspace = e.key === 'Backspace'
          let isNotNum = isNaN(parseInt(e.key))

          if (isBackspace) {
            inputVal = inputVal.slice(0, -1)
          } else if (isNotNum) {
            el.value = inputVal.length === 0 ? '' : currency + inputMasked.join('')
            return
          } else {
            inputVal += e.key
          }

          inputMasked = inputVal.split('')
          if (inputVal.length > 3) {
            let lastIndex = inputMasked.length - 3
            for (let i = lastIndex; i > 0; i = i - 3) {
              inputMasked[i] = `,${inputMasked[i]}`
            }
          }
          el.value = inputVal.length === 0 ? '' : currency + inputMasked.join('')
        }

        el.addEventListener('keyup', updateInput)
      }
    }
  }
}
</script>

<style>

</style>
