<script setup>
import WorkerComponent from "./WorkerComponent.vue"
import SpanOptionComponent from "./SpanOptionComponent.vue"
import SpanSelectorComponent from "./SpanSelectorComponent.vue"
import FilterDropDownComponent from "./FilterDropDownComponent.vue"

import BookingService from "./services/BookingService.js"
import { format, getDate, eachDayOfInterval, addWeeks, getWeek, startOfWeek } from "date-fns"
</script>

<script>
export default {
    data() {
        return {
            bookingData: [],
            dateInterval: [],
            filterList: NodeList,
            startDate: String,
            endDate: String,
        }
    },

    methods: {
        moveAhead() {
            this.startDate = addWeeks(this.startDate, 4)
            this.endDate = addWeeks(this.startDate, 4)


            this.dateInterval = eachDayOfInterval({
                start: this.startDate,
                end: this.endDate
            })

            const noWeekends = this.dateInterval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

            this.dateInterval = noWeekends

            BookingService.getBookingData(this.startDate, this.endDate).then(data => this.bookingData = data)
        },

        moveBack() {
            this.startDate = addWeeks(this.startDate, -4)
            this.endDate = addWeeks(this.startDate, 4)


            this.dateInterval = eachDayOfInterval({
                start: this.startDate,
                end: this.endDate
            })

            const noWeekends = this.dateInterval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

            this.dateInterval = noWeekends

            BookingService.getBookingData(this.startDate, this.endDate).then(data => this.bookingData = data)
        },

        updateFilter(checks) {
            this.filterList = checks
        },

        sort() {
            this.bookingData.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }

                if (b.name > a.name) {
                    return -1
                }

                return 0
            })
        }
    },

    created() {
        this.startDate = startOfWeek(Date.now())
        this.endDate = addWeeks(this.startDate, 4)


        this.dateInterval = eachDayOfInterval({
            start: this.startDate,
            end: this.endDate
        })

        const noWeekends = this.dateInterval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        this.dateInterval = noWeekends

        BookingService.getBookingData(this.startDate, this.endDate).then(data => this.bookingData = data)
    }
}
</script>

<template>
    <div class="calendar">
        <div class="utility-bar">
            <div class="left-utility-bar">
                <input type="search" class="search">
                <button @click="sort" class="default-button inter-five">
                    <img src="../assets/sort.svg" alt="sort">
                    <span>Sortera</span>
                </button>
                <FilterDropDownComponent @save="updateFilter" />
            </div>

            <div class="month-text inter-five">
                {{ format(dateInterval[0], "MMM") }} - {{ format(dateInterval[dateInterval.length-1], "MMM") }} {{
                    format(dateInterval[9], "yyyy") }}
            </div>
            <div class="right-utility-bar">
                <SpanOptionComponent />
                <SpanSelectorComponent @forward="moveAhead" @back="moveBack">{{ getWeek(startDate) }} - {{
                    getWeek(endDate) - 1 }}
                </SpanSelectorComponent>
            </div>
        </div>
        <div class="calendar-top">
            <div class="name-top inter-five">Anställd hantverkare</div>

            <div v-for="day in dateInterval" class="date">
                <div class="date-text inter-seven">{{ format(day, "EEE") }}</div>
                <div class="date-circle">{{ getDate(day) }}</div>
            </div>
        </div>
        <WorkerComponent class="worker" v-for="worker in bookingData" :key="worker.name" :filters="filterList"
            :name="worker.name" :professions="worker.professions" :bookings="worker.bookings"></WorkerComponent>
    </div>
</template>

<style scoped>
.calendar {
    padding: 20px 0px 0px 0px;
    margin-top: 9px;

    width: 1440px;

    border: 1px solid #d9d9d9;
    border-radius: 10px;
}

.utility-bar {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
}

.left-utility-bar {
    display: flex;
    gap: 25px;
    margin-left: 30px;
}

.month-text {
    margin: 0px auto;

    font-size: 20px;
}

.right-utility-bar {
    display: flex;
    gap: 15px;

    margin-left: auto;
    margin-right: 20px;
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

    padding-left: 35px;
    padding-right: 10px;
}

.calendar-top {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;

    position: sticky;
    top: 0px;

    padding: 5px 20px 7px 0px;
    margin-bottom: 17px;

    background-color: #fff;

    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
}

.name-top {
    width: 210px;

    text-align: center;
    padding-top: 18px;

    font-size: 16px;
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

    font-size: 15px;
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