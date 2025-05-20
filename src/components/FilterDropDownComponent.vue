<script>
export default {
    data() {
        return {
            isOpen: false,
        }
    },

    emits: ["save"],

    methods: {
        openAndClose() {
            this.isOpen = !this.isOpen

            const button = document.getElementById("filter")
            if (this.isOpen) {
                button.classList.add("open-menu")
            } else {
                button.classList.remove("open-menu")
            }
        },

        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isOpen = false
                document.getElementById("filter").classList.remove("open-menu")
            }
        },

        emitChecklist() {
            let checkboxes = document.querySelectorAll('input[class=check]:checked');

            this.$emit("save", checkboxes)
        }
    },

    created() {
        window.addEventListener('click', this.close)
    },

    beforeUnmount() {
        window.removeEventListener('click', this.close)
    },
}
</script>

<template>
    <div class="wrapper">
        <button @click="openAndClose" id="filter" class="default-button inter-five">
            <img src="../assets/filter.svg" alt="filter">
            <span>Filter</span>
        </button>

        <!-- Known bug. Strange behavior with checkboxes, temp fix by unchecking them all. Means we "lose"
         the current filter when the dropdown is opened again. No impact on functionality. -->
        <div v-if="isOpen" class="dropdown inter-four">
            <ul>
                <li>
                    <input class="check" type="checkbox" id="electrician" name="electrician" unchecked><label
                        for="electrician">Elektriker</label></input>
                </li>
                <li>
                    <input class="check" type="checkbox" id="painter" name="painter"><label for="painter" unchecked>Målare</label>
                </li>
                <li>
                    <input class="check" type="checkbox" id="mason" name="mason"><label for="mason" unchecked>Murare</label>
                </li>
                <li>
                    <input class="check" type="checkbox" id="plumber" name="plumber" unchecked><label
                        for="plumber">Rörmockare</label>
                </li>
                <li>
                    <input class="check" type="checkbox" id="carpenter" name="carpenter" unchecked><label
                        for="carpenter">Snickare</label>
                </li>
            </ul>
            <button @click="emitChecklist(); openAndClose()" class="save-button"><span>Spara</span></button>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    position: absolute;
    width: 155px;
    height: auto;
    margin-top: 2px;

    padding-bottom: 5px;

    background-color: white;
    z-index: 99;

    border: 1px solid #d9d9d9;
    border-radius: 5px;

    font-size: 12px;
}

input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: purple;

    margin-right: 10px;
}

li {
    list-style: none;
    display: flex;
    align-items: center;

    margin: 10px 0px 10px 10px;
}

li:hover {
    font-weight: 600;
}

.save-button {
    width: 83px;
    height: 22px;

    border: 0px;
    border-radius: 10px;

    background-color: #9AD89B;

    display: flex;
    align-items: center;

    gap: 5px;

    padding: 0px 28px;
    margin-left: auto;
    margin-right: 5px;

    background-image: url("../assets/check.svg");
    background-repeat: no-repeat;
    background-position-x: 8px;
    background-position-y: 50%;
}

.save-button:hover {
    cursor: pointer;
}

.save-button:active {
    color: white;
    background-image: url("../assets/white_check.svg");
}

.open-menu {
    background-color: #9f9e9e;
    border-color: #9f9e9e;
}
</style>