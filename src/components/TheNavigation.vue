<template>
  <nav id="nav">
    <p class="logo">The Travel App</p>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Home</router-link>
      </li>
      <li
        v-for="destination in destinations"
        :key="destination.name"
        class="links"
      >
        <router-link
          :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug },
          }"
          >{{ destination.name }}
        </router-link>
      </li>
      <li class="links">
        <router-link to="/user">Dashboard</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "../store.js";

export default {
  name: "TheNavigation",
  components: {},
  data() {
    return {
      destinations: store.destinations,
    };
  },
};
</script>


<style  scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}

#nav a {
  color: #2c3e50;
  text-decoratiion: none;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav a.vue-learn-active-class {
  color: #ab26ab;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 30px;
  color: purple;
  font-weight: bold;
}
</style>