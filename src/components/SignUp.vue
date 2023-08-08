<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <input type="text" v-model="name" placeholder="Name" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
      <button type="submit">Signup</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      message: '',
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Check if response.data is not undefined before accessing its properties
        if (response?.data) {
          this.error = '';
          this.message = response.data.message;
          this.clearForm();
          // Save the user name and authentication token in cookies
          this.$cookies.set('userName', response.data.user.name);
          this.$cookies.set('authToken', response.data.user.token);
          // Redirect to the home page after a successful signup
          this.$router.push({ name: 'HomeWelcome', params: { userName: response.data.user.name } });
        }
      } catch (error) {
        if (error?.response?.data?.error) {
          this.error = error.response.data.error;
        } else {
          this.error = 'An error occurred.';
        }
      }
    },
    clearForm() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
  },
};
</script>

<style>
/* Add styles for the SignUp component here */
</style>
