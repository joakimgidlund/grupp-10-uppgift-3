<script setup>
import WorkerComponent from "./WorkerComponent.vue"
import BookingService from "./services/BookingService.js"
import { format, getDate, eachDayOfInterval } from "date-fns";
</script>

<script>
export default {
    data() {
        return {
            bookingData: [],
            dateInterval: [],
        }
    },

    methods: {

    },

    created() {
        this.dateInterval = eachDayOfInterval({
            start: new Date(2025, 2, 31),
            end: new Date(2025, 3, 25)
        })

        const noWeekends = this.dateInterval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        this.dateInterval = noWeekends

        this.bookingData = BookingService.getBookingData()
        // console.log(this.bookingData)
    }
}
</script>

<template>
    <div class="calendar">
        <div class="utility-bar">
            <input type="search" class="search">
            <button class="default-button">
                <img src="../assets/sort.svg" alt="sort">
                <span>Sortera</span>
            </button>
            <button class="default-button">
                <img src="../assets/filter.svg" alt="filter">
                <span>Filter</span>
            </button>

            <div>VECKA 2VECKOR MÅNAD</div>
            <div>
                < April 2025>
            </div>
        </div>
        <div class="calendar-top">
            <div class="name-top">Anställd hantverkare</div>
            <div v-for="day in dateInterval" class="date">
                <div class="date-text">{{ format(day, "EEE") }}</div>
                <div class="date-circle">{{ getDate(day) }}</div>
            </div>
        </div>
        <WorkerComponent class="worker" v-for="worker in bookingData" :key="worker.name" :name="worker.name"
            :professions="worker.professions" :bookings="worker.bookings"></WorkerComponent>
    </div>
</template>

<style scoped>
.calendar {
    border-top: 1px solid #D9D9D9;
    border-left: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 20px 0px 20px 0px;
}

.utility-bar {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-bottom: 20px;
}

.search {
    background-image: url("../assets/search.svg");
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 10px;

    height: 40px;
    width: 300px;

    border: 1px solid #5D5D5D;
    border-radius: 20px;

    padding-left: 10px;
}

.calendar-top {
    display: flex;
    gap: 10px;

    padding: 5px 0px 7px 0px;
    margin-bottom: 17px;

    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
}

.name-top {
    width: 230px;

    text-align: center;
    padding-top: 15px;
}

.date {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;

    width: 48px;

    font-size: 10px;
    font-weight: 500;
    row-gap: 5px;
}

.date-text {
    width: 100%;
}

.date-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    background-color: #5D5D5D;

    font-size: 15px;
    font-weight: 700;
    color: #fff;

    align-content: center;
}
</style>