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
    <div v-if="stat.stat1 != stat.stat2 && stat.stat2 != ''" class="day-box inter-four" :class="stat.stat1 + '-half'">
        <div> {{ stat.stat1.slice(0, 4) }}. </div>
        <div> {{ stat.stat2.slice(0, 4) }}. </div>
    </div>
    <div v-else-if="percentage === 50" class="day-box inter-four" :class="[stat.stat1, stat.stat2, percentageString, activities.act1]">
        <div> {{ percentage }}%</div>
        <div> {{ stat.stat1.slice(0, 4) }}. </div>
    </div>
    <div v-else-if="percentage === 100 || percentage === 0" class="day-box inter-four" :class="[stat.stat1, stat.stat2, percentageString]">
        <span v-if="stat === 'Preliminary'">Prel.</span><span v-if="stat.stat1 != 'Absent' ">{{ percentage }}%</span>
    </div>
</template>

<style scoped>
.day-box {
    width: 48px;
    height: 63px;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;
    font-size: 17px;
    
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

.Preliminary-half {
    background: linear-gradient(#F6CA6C 50%, #FEE69B 50%);
}

.Booked-half {
    background: linear-gradient(#FEE69B 50%, #F6CA6C 50% );
}
</style>