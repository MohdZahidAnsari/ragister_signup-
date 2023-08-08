<template>
  <div>
    <h2>Signin</h2>
    <form @submit.prevent="signin">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Signin</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      message: '',
    };
  },
  methods: {
    async signin() {
      try {
        const response = await axios.post('http://localhost:3000/api/signin', {
          email: this.email,
          password: this.password,
        });

        // Check if response is not undefined and contains data
        if (response && response.data) {
          this.error = '';
          this.message = response.data.message;
          this.clearForm();
          this.$router.push({ name: 'HomeWelcome', params: { userName: response.data.user.name } }); // Redirect to the home page after a successful signin
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    clearForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style>
/* Add styles for the Signin component here */
</style>
