const BookingService = {
    async getBookingData() {
        try {
            let res = await fetch("https://yrgo-web-services.netlify.app/bookings?start=2025-03-31&end=2025-04-25", {
                method: "GET"
            })
            
            // ?start=" + start + "&end=" + end
            let data = await res.json()
            // console.table(data)
            return data
        } catch (err) {
            console.log(err)
        }
    },
}

Object.freeze(BookingService)

export default BookingService

