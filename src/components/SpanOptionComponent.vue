<template>
    <div>
        <button class="inter-five left">Vecka</button>
        <button class="inter-five">2 veckor</button>
        <button class="inter-five right">Månad</button>
    </div>
</template>

<style scoped>
div {
    margin: 0;
    padding: 0;
}

button {
    padding: 10px 16px;
    margin: 0;

    background-color: #fff;

    border: 0px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;

    font-size: 16px;
}

button:hover {
    cursor: pointer;
    background-color: #D9D9D9;
    border-color: #D9D9D9;
}

button:active {
    background-color: #9F9E9E;
    border-color: #9F9E9E;
}

.left {
    border: 1px solid #d9d9d9;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.right {
    border: 1px solid #d9d9d9;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>