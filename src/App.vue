<template>
  <div class="app">
    <div class="in-app" v-if="user.tokenChecked">
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
      this.user.checkToken()
  }
}
</script>

<style>
body { 
  margin: 0;
  background-color: #F7F7F9;
}

* {
  font-family:Arial, Helvetica, sans-serif
}

button {
    border-width: 0;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.in-app {
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 100%;
}

main { 
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

</style>
