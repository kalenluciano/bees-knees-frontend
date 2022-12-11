<template>
  <div class="app">
    <NavBar />
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { CheckSession } from './services/Auth'

export default {
  name: 'App',
  components: {
    NavBar
  }, 
  data: () => ({
    user: null,
    authenticated: false
  }),
  mounted: function() {
    const token = localStorage.getItem('token')
    if (token) {
      this.checkToken()
    }
  },
  methods: {
    setUser(user) {
      this.user = user
    },
    setAuthenticated(state) {
      this.authenticated = state
    },
    handleLogOut() {
      this.setUser(null)
      this.setAuthenticated(false)
      localStorage.clear()
    },
    async checkToken() {
      const user = await CheckSession()
      this.setUser(user)
      this.setAuthenticated(true)
    }
  }
}
</script>

<style>

</style>
