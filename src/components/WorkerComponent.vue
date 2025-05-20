<script setup>
import DayComponent from "./DayComponent.vue"
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
        filters: undefined,
    },

    methods: {
        checkFilters() {
            if(this.filters.length === 0) {
                return true
            }
            for (const filter of this.filters) {
                for (const prof of this.professions) {
                    if (filter.name.toLowerCase() === prof.toLowerCase()) {
                        return true;
                    }
                }
            }
            return false;
        },

        numberToString(percentage) {
            if(percentage === 100) {
                return "hundred"
            }
            
            if(percentage === 50) {
                return "fifty"
            }

            return "zero"
        }
    },
}
</script>

<template>
    <div class="worker-row" v-if="checkFilters()">
        <div class="worker">
            <div class="name-box inter-six">
                <div>
                    {{ name }}
                </div>
                <div v-if="professions.length === 2" class="professions inter-four">
                    {{ professions[0] }} / {{ professions[1] }}
                </div>
                <div v-else class="professions inter-four">
                    {{ professions[0] }}
                </div>
            </div>
        </div>
        <DayComponent v-for="day of bookings" :percentageString="numberToString(day.percentage)" :percentage="day.percentage" :stat="day.status"
            :activities="day.activities"></DayComponent>
    </div>
</template>

<style scoped>
.worker-row {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    flex-shrink: 1;
    margin-bottom: 43px;
    padding-right: 20px;
}

.name-box {
    width: 210px;
    padding-top: 13px;

    text-align: center;
    font-size: 16px;
}

.professions {
    font-size: 13px;
    color: #5D5D5D;
}
</style>