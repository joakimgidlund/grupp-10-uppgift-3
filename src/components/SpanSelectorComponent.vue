<script>
export default {
    emits: ["back", "forward"]
}
</script>

<template>
    <div>
        <button @click="$emit('back')"><img src="../assets/nav_arrow.svg" alt="left arrow"></button>
        <div class="week-box">
            <div class="inter-four">Vecka</div>
            <span class="inter-five">
                <slot></slot>
            </span>
        </div>
        <button @click="$emit('forward')"><img src="../assets/nav_arrow.svg" alt="right arrow" class="flip"></button>
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    gap: 10px;
    width: auto;
}

span {
    font-size: 25px;
}

.week-box {
    display: flex;
    flex-direction: column;
    width: 100px;
}

.week-box>div {
    margin: -10px;
    font-size: 12px;
}

button {
    all: unset;
}

button:hover {
    cursor: pointer;
    scale: 1.1;
}

button:active {
    scale: 0.9;
}

.flip {
    transform: rotate(180deg);
}
</style>