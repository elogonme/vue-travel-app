<template>
  <div>
    <h1>Not Found</h1>
    <p>
      Oops we couldn't find that page. Try goiing
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </p>
  </div>
</template>