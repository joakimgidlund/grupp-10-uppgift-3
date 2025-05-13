import { format, eachDayOfInterval, isAfter, isBefore, isEqual } from "date-fns"

class Worker {
    constructor(name, details) {
        this.name = name
        this.details = details
    }
}

const workerList = []

const BookingService = {
    async getBookingData() {
        try {
            let res = await fetch("https://yrgo-web-services.netlify.app/bookings?start=2025-03-31&end=2025-04-25", {
                method: "GET"
            })

            // ?start=" + start + "&end=" + end
            let data = await res.json()
            // console.table(data)
            // console.log(data[0].bookings)
            this.createWorkerList(data)

        } catch (err) {
            console.log(err)
        }
    },

    createWorkerList(data) {
        // All days in the range, since API can send data that misses days
        let fullDates = eachDayOfInterval({
            start: new Date(2025, 2, 31),
            end: new Date(2025, 3, 27)
        })

        // Filter out weekends
        fullDates = fullDates.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        for (const d of data) {
            // let tempDetails = []

            let dates = []
            let acts = []

            for (const period of d.bookings) {
                let interval = eachDayOfInterval({
                    start: period.from,
                    end: period.to,
                })

                interval = interval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

                // console.log(fullDates)
                // console.log(interval)

                for (const date of interval) {
                    if (isBefore(date, new Date(2025, 3, 25))) {
                        // tempDetails.push(
                        //     {
                        //         act: period.activity,
                        //         date: date
                        //     })
                        dates.push(date)
                        acts.push(period.activity)
                    }
                }
            }

            console.log(dates)
            console.log(acts)
            dates = this.formatDates(dates)
            dates = this.deleteDuplicateDates(dates, acts)

            workerList.push({
                name: d.name,
                dates: dates,
            })

            // const index = workerList.findIndex(worker => worker.name === d.name)
            // console.log("Name search: " + d.name + " Found: " + index)
        }
        console.log(workerList)
    },

    checkMatch(date, interval) {
        for (const i of interval) {
            if (isEqual(i, date)) {
                // console.log(i + " " + date)
                return true
            }
        }
        return false
    },

    formatDates(dates) {
        let arr = []
        for(let date of dates) {
            arr.push(format(date, "dd/MM/yyyy"))
        }
        console.log(arr)
        return arr
    },

    deleteDuplicateDates(dates, acts) {
        let newDates = []
        let newActs = []

        for(let i = 0; i < dates.length; ++i) {
            if(!newDates.includes(dates[i])) {
                newDates.push(dates[i])
                newActs.push(acts[i])
            }
        }

        console.log(newActs)
        return newDates
    }
}

// Object.freeze(BookingService)

export default BookingService

