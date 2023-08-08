import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue'; // Update the import to use the correct file name
import Home from './components/Home.vue';

const routes = [
  {
    path: '/',
    component: HelloWorld,
    children: [
      { path: 'signup', component: SignUp },
      { path: 'signin', component: SignIn },
      { path: 'home/:userName', name: 'HomeWelcome', component: Home },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
