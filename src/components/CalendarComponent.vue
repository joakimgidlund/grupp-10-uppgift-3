<script setup>
import WorkerComponent from "./WorkerComponent.vue"
import BookingService from "./services/BookingService.js"
import { format, getDay, getDate, isWeekend, eachDayOfInterval, lightFormat } from "date-fns";
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

        // for(const date of this.dateInterval) {
        //     if(date.getDay() === 0 || date.getDay() === 6) {
        //         console.log("Delete: " + date)
        //         const index = this.dateInterval.indexOf(date)
        //         console.log(index)
        //         this.dateInterval.slice(index, index)
        //     }
        // }

        const noWeekends = this.dateInterval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        this.dateInterval = noWeekends

        BookingService.getBookingData()
    }
}
</script>

<template>
    <div class="calendar-top">
        <div class="name-top">Anställd hantverkare</div>
        <div v-for="day in dateInterval" class="date">
            <div class="date-text">{{ format(day, "EEE") }}</div>
            <div class="date-circle">{{ getDate(day) }}</div>
        </div>
        <!-- <div class=""></div> -->
    </div>
    <WorkerComponent v-for="booking in bookingData" :key="booking" :name="booking.name" :professions="booking.professions" :bookings="booking.bookings"></WorkerComponent>
</template>

<style scoped>
/* .calendar-grid {
    display: grid;
    grid-template-columns: 238px repeat(20, 58px);
    grid-template-rows: 58px auto(20px);
    row-gap: 43px;

    text-align: center;
    align-items: center;
    justify-self: center;

    margin-top: 10px;

    border: 1px solid #D9D9D9;
    border-radius: 10px;
} */

.calendar-top {
    display: flex;
    text-align: center;
    justify-content: space-evenly;

    margin-top: 10px;

    border-bottom: 1px solid #D9D9D9;
    border-top: 1px solid #D9D9D9;
}

.name-top {
    padding: 20px 0px 20px 30px;
    margin-right: 50px;

    text-align: center;
    text-wrap: nowrap;
}

.date {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    font-size: 10px;
    font-weight: 500;
    row-gap: 5px;

    padding: 5px 0px 6px 0px;

    /* border-bottom: 1px solid #D9D9D9; */
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