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

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

</style>
