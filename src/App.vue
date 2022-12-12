<template>
  <div class="app">
    <div v-if="user.tokenChecked">
      <NavBar />
      <main>
          <RouterView :key="$route.path" ></RouterView>
      </main>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { useUserStore } from './stores/UserStore'

export default {
  setup() {
    const user = useUserStore()
    return {user}
  },
  name: 'App',
  components: {
    NavBar
  }, 
  mounted: function() {
    const token = localStorage.getItem('token')
    if (token) {
      this.user.checkToken()
    }
  }
}
</script>

<style>

</style>
