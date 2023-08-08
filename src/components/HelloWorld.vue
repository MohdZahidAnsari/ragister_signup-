<template>
  <div>
    <h2>HelloWorld</h2>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/signin">Signin</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style>
/* Add styles for the HelloWorld component here */
</style>
