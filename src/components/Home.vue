<template>
  <div>
    <h2>Welcome, {{ userName }}!</h2>
  </div>
</template>

<script>
export default {
  name: 'HomeWelcome', // Change the component name to 'HomeWelcome'
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* Add styles for the Home component here */
</style>
