<script setup>
</script>

<template>
  <div class="main">
    <div class="header">
      <img src="./assets/logo_small.png" alt="logo">
      <div class="header-text">
        <div>SVENSSONS</div>
        <div class="light-font">HANTVERK AB</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Montserrat-light";
  src: url("./assets/Montserrat-Light.ttf");
}

@font-face {
  font-family: "Montserrat-bold";
  src: url("./assets/Montserrat-ExtraBold.ttf");
}

.header {
  color: #3A464B;
  font-family: Montserrat-bold, sans-serif;
  font-size: 50px;

  display: flex;
  align-items: center;
  margin-top: 10px;
}

.light-font {
  font-family: Montserrat-light;
}

.header-text {
  display: flex;
  margin-top: 5px;
  gap: 20px;
}
</style>
