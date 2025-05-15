<script>
export default {
    data() {
        return {
            percentageString: String,
            statOne: String,
        }
    },

    props: {
        activities: undefined,
        percentage: Number,
        stat: Object,
    },

    methods: {
        percentageNumberToString() {
            if (this.percentage === 100) {
                this.percentageString = "hundred"
            }
            if (this.percentage === 50) {
                this.percentageString = "fifty"
            }
            if (this.percentage === 0) {
                this.percentageString = "zero"
            }
        },
    },

    created() {
        this.percentageNumberToString()
    }
}
</script>

<template>
    <div v-if="percentage === 50" class="half-box" :class="[stat.stat1, stat.stat2, percentageString, activities]">
        <div class="top"> {{ percentage }}%</div>
        <div class="bottom"> {{ stat.stat1.slice(0, 4) }}. </div>
    </div>
    <div v-else class="day-box" :class="[stat.stat1, stat.stat2, percentageString, activities]">
        <span v-if="stat === 'Preliminary'">Prel.</span><span v-if="stat.stat1 != 'Absent' ">{{ percentage }}%</span>
    </div>
</template>

<style scoped>
.half-box {
    width: 48px;
    height: 63px;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: 400;

    border-radius: 10px;
    background: linear-gradient(#F6CA6C 50%, #FEE69B 50%);
}

.day-box {
    width: 48px;
    height: 63px;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: 400;

    border-radius: 10px;
    background-color: #ADE4C4;
}

.hundred {
    background-color: #E98C7B;
}

.fifty {
    background-color: #F6CA6C;
}

.Absent {
    background-color: #827DE7;
}

.Preliminary {
    background-color: #F6CA6C;
}
</style>