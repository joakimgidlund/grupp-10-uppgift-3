<script setup>
import CalendarComponent from "./components/CalendarComponent.vue"
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
    <div class="header-bottom">
      <div class="booking-text">
        Bokningssystem
      </div>
      <button class="default-button">
        <img src="./assets/plus.svg" alt="plus icon">
        <span>Boka hantverkare</span>
      </button>
    </div>
    <CalendarComponent/>
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

.main {
  padding: 10px 10px 10px 25px;
}

.header {
  color: #3A464B;
  font-family: Montserrat-bold, sans-serif;
  font-size: 50px;

  margin-left: -20px;

  display: flex;
  align-items: center;
}

.light-font {
  font-family: Montserrat-light, sans-serif;
}

.header-text {
  display: flex;
  margin-top: 5px;
  gap: 20px;
}

.header-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin-top: 22px;
}

.booking-text {
  color: #49454F;
  font-family: Montserrat-light, sans-serif;
  font-size: 40px;
  font-weight: 600;
}

.default-button {
  height: 50px;
  align-self: flex-end;
}
</style>
