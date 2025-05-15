<script setup>
import { isAfter, compareAsc, eachDayOfInterval } from "date-fns"
import DayComponent from "./DayComponent.vue"
import BookingService from "./services/BookingService.js"
</script>

<script>
export default {
    data() {
        return {
        }
    },

    props: {
        name: String,
        professions: Array,
        bookings: Array,
    },

    methods: {
        // parseBookingData() {
        //     for (const booking of this.bookings) {
        //         const start = new Date(booking.from)
        //         const end = new Date(booking.to)

        //         const bookingInterval = eachDayOfInterval({
        //             start: start,
        //             end: end
        //         }).filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        //         for (const date of bookingInterval) {
        //             if (!isAfter(date, new Date(2025, 3, 25))) {

        //                 // if (this.details.includes(date)) {
        //                 //     console.log("Found date")
        //                 //     const index = this.details.indexOf(date);
        //                 //     this.details[index].activity.push(booking.activity)
        //                 //     return
        //                 // }

        //                 this.details.push(
        //                     {
        //                         activity: booking.activity,
        //                         date: date,
        //                         percentage: booking.percentage
        //                     }
        //                 )
        //             }
        //         }
        //     }

        //     console.log(this.details)
        // }

    },

    // checkDate(day) {
    //     // for (const i of this.interval[0]) {
    //     //     if (compareAsc(i, day) === 0) {
    //     //         this.hundred = true
    //     //     }
    //     // }
    // }

    created() {
        // this.details = BookingService.getBookingData()
        // console.log(this.details)

        // this.dates = eachDayOfInterval({
        //     start: new Date(2025, 2, 31),
        //     end: new Date(2025, 3, 25)
        // })

        // this.dates = this.dates.filter(date => !(date.getDay() === 6 || date.getDay() === 0))
    }

}
</script>

<template>
    <div class="worker-row">
        <div class="worker">
            <div class="name-box">
                {{ name }}
            </div>
            <div v-if="professions.length === 2" class="professions">
                {{ professions[0] }} / {{ professions[1] }}
            </div>
            <div v-else class="professions">
                {{ professions[0] }}
            </div>
        </div>
        <DayComponent v-for="day of bookings"></DayComponent>
    </div>
</template>

<style scoped>
.worker-row {
    display: grid;
    grid-template-columns: 238px repeat(20, 48px);
    grid-template-rows: 63px;
    column-gap: 10px;
    align-items: center;
    text-align: center;

    margin: 30px 0px 30px 0px;
}

.worker {
    grid-column-start: 1;
    grid-row-start: 1;

    text-align: center;
    width: 200px;

    margin-right: 26px;
}

.name-box {
    grid-column: 1;
}

.name {
    font-weight: 600;
}

.professions {
    font-size: 13px;
    font-weight: 400;
    color: #5D5D5D;
}
</style>