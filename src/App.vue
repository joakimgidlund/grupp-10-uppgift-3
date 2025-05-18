<script setup>
import CalendarComponent from "./components/CalendarComponent.vue"
</script>

<template>
  <div class="main">
    <div class="header">
      <img src="./assets/logo_small.png" alt="logo">
      <div class="header-text montserrat-eight" f-weight="800">
        <div>SVENSSONS</div>
        <div class="light-font montserrat-five" f-weight="500">HANTVERK AB</div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="booking-text montserrat-six">
        Bokningssystem
      </div>
      <button class="default-button inter-four">
        <img src="./assets/plus.svg" alt="plus icon">
        <span>Boka hantverkare</span>
      </button>
    </div>
    <CalendarComponent />
  </div>
</template>

<style scoped>
.montserrat-five {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.montserrat-six {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.montserrat-eight {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
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
  font-size: 40px;
}

.default-button {
  height: 50px;
  align-self: flex-end;
  font-size: 22px;
}
</style>
