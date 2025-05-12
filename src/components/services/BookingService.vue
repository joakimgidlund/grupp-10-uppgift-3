<script setup>

</script>

<script>
const BookingService = {
    data() {
        return {
            bookingData: String,
        }
    },

    async getBookingData() {
        try {
            let res = await fetch("https://yrgo-web-services.netlify.app/bookings", {
                method: "GET"
            })
            
            // ?start=" + start + "&end=" + end
            let data = await res.json()
            console.table(data)
        } catch (err) {
            console.log(err)
        }
    },

    created() {
        this.bookingData = getBookingData()
    }
}
</script>