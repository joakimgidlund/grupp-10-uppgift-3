import { format, eachDayOfInterval, isBefore, formatDate } from "date-fns"
import testdata from "./test_data/testdata.json"
import oscar from "./test_data/oscar.json"

const BookingService = {
    async getBookingData(start, end) {
        try {
            let from = formatDate(start, "yyyy-MM-dd")
            let to = formatDate(end, "yyyy-MM-dd")

            let res = await fetch("https://yrgo-web-services.netlify.app/bookings?start=" + from + "&end=" + to, {
                method: "GET"
            })

            let data = await res.json()

            let workerList = BookingPipeline.parseWorkerData(data, start, end)

            console.log(workerList)

            return workerList
        } catch (err) {
            console.log(err)
        }
    },
}

//Pipeline handling all data so we can't call it accidentally
const BookingPipeline = {
    parseWorkerData(data, start, end) {
        let workerList = []

        for (const worker of data) {

            const mappedWorker = this.mapWorkerData(worker, start, end)

            workerList.push(mappedWorker)
        }

        return workerList
    },

    mapWorkerData(worker, start, end) {

        let workerData = {
            name: worker.name,
            professions: worker.professions,
            bookings: []
        }

        for (let booking of worker.bookings) {
            let interval = eachDayOfInterval({
                start: booking.from,
                end: booking.to,
            }).filter(date => !(date.getDay() === 6 || date.getDay() === 0))

            interval = this.formatDates(interval)

            let arr = []
            for (const date of interval) {
                if (isBefore(date, new Date(end)))
                    arr.push({
                        date: date,
                        activities: booking.activity,
                        percentage: booking.percentage,
                        status: { stat1: booking.status, stat2: "" }
                    })
            }

            workerData.bookings.push(...arr)
        }

        workerData = this.duplicateDateRemap(workerData)
        workerData = this.buildFullDates(workerData, start, end)

        return workerData
    },

    //Merges two overlapping dates into one
    duplicateDateRemap(workerData) {

        //Asc. sorting before merging logic
        workerData.bookings.sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
        })

        for (let i = 1; i < workerData.bookings.length; ++i) {
            let currentWorker = workerData.bookings[i]
            let prevWorker = workerData.bookings[i - 1]

            if (prevWorker.date === currentWorker.date) {
                prevWorker.activities = { act1: prevWorker.activities, act2: currentWorker.activities }
                prevWorker.status = { stat1: prevWorker.status.stat1, stat2: currentWorker.status.stat1 }
                workerData.bookings.splice(i, 1)
            }
        }

        return workerData
    },

    //Format to an easily sorted ISO format
    //Since we dont handle time we don't have to think about timezones
    formatDates(dates) {
        let arr = []
        for (let date of dates) {
            arr.push(format(date, "yyyy/MM/dd"))
        }
        // console.log(arr)
        return arr
    },

    //Insert missing days into the worker's bookings for rendering
    buildFullDates(workerData, start, end) {

        //An array of all days in the interval
        let fullDates = eachDayOfInterval({
            start: start,
            end: end
        }).filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        fullDates = this.formatDates(fullDates)

        console.log("Building full dates...")

        for (const date of fullDates) {
            let tempDate = workerData.bookings.find(booking => {
                return booking.date === date
            })

            if (tempDate === undefined) {
                workerData.bookings.push({
                    date: date,
                    activities: "None",
                    percentage: 0,
                    status: { stat1: "Free", stat2: "" }
                })
            }

            workerData.bookings.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            })
        }
        
        return workerData
    }
}

Object.freeze(BookingService)

export default BookingService

