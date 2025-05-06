<script>
export default {
    data() {
        return {
            workerList: [
                {name: "Johan Johansson", title: "Elektriker"},
                {name: "Anders Andersson", title: "Målare / Snickare"},                
            ],

            dateList: ["31", "1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4", "2", "3", "4"]
        }
    }
}
</script>

<template>
    <div class="calendar-grid">
        <div class="column-top">Anställd hantverkare</div>
        <div v-for="day in dateList" class="date">
            <div class="date-text">DAY</div>
            <div class="date-circle">{{ day }}</div>
        </div>
        <div class=""></div>
        <div v-for="worker in workerList" class="name-box"> 
            <div class="name"> {{ worker.name }} </div>
            <div class="title"> {{ worker.title }}</div>
        </div>
    </div>
</template>

<style scoped>
.calendar-grid {
    display: grid;
    grid-template-columns: 238px repeat(20, 58px);
    grid-template-rows: 58px auto(20px);

    text-align: center;
    align-items: center;
    justify-self: center;

    margin-top: 10px;

    border: 1px solid #D9D9D9;
    border-radius: 10px;
}

.column-top {
    border-bottom: 1px solid #D9D9D9;

    padding: 20px 0px 20px 0px;
}


.name-box {
    align-content: center;
    
    grid-column: 1;
}

.name {
    font-weight: 600;
}

.title {
    font-size: 13px;
    font-weight: 400;
    color: #5D5D5D;
}

.date {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    font-size: 10px;
    font-weight: 500;
    row-gap: 5px;

    padding: 5px 0px 6px 0px;

    border-bottom: 1px solid #D9D9D9;
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