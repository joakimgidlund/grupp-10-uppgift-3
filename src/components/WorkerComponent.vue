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
    },

    created() {
    }

}
</script>

<template>
    <div class="worker-row">
        <div class="worker">
            <div class="name-box">
                <div>
                    {{ name }}
                </div>
                <div v-if="professions.length === 2" class="professions">
                    {{ professions[0] }} / {{ professions[1] }}
                </div>
                <div v-else class="professions">
                    {{ professions[0] }}
                </div>
            </div>
        </div>
        <DayComponent v-for="day of bookings" :percentage="day.percentage" :stat="day.status" :activities="day.activities"></DayComponent>
    </div>
</template>

<style scoped>
.worker-row {
    display: flex;
    gap: 10px;
    margin-bottom: 43px;
}

.name-box {
    width: 230px;
    text-align: center;
    padding-top: 13px;
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