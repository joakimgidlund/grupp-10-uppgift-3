import { format, eachDayOfInterval, isBefore } from "date-fns"
import testdata from "./test_data/testdata.json"

const BookingService = {
    //Function for fetching data, implement custom dates later
    getBookingData() {
        try {
            // let res = await fetch("https://yrgo-web-services.netlify.app/bookings?start=2025-03-31&end=2025-04-25", {
            //     method: "GET"
            // })

            let res = testdata

            // Future code for custom dates
            // let res = await fetch("https://yrgo-web-services.netlify.app/bookings?start=" + startDate + "&end=" + endDate, {
            //     method: "GET"
            // })

            let data = res

            //Create a list of workers with fetched data
            let workerList = this.parseWorkerData(data)

            //Fill the workers' bookings with empty dates where there are no bookings
            workerList = this.buildFullDates(workerList)

            console.log(workerList)

            return workerList
        } catch (err) {
            console.log(err)
        }
    },

    //Creates a list of workers based on each person in fetched data
    //Creates an array of dates in each booking, iterates over it,
    //adding all details
    parseWorkerData(data) {
        let workerList = []

        for (const person of data) {

            let dates = []
            let acts = []
            let percentages = []
            let status = []

            for (const workPeriod of person.bookings) {
                let interval = eachDayOfInterval({
                    start: workPeriod.from,
                    end: workPeriod.to,
                })

                //This filters out all weekends
                interval = interval.filter(date => !(date.getDay() === 6 || date.getDay() === 0))

                // console.log(fullDates)
                // console.log(interval)

                for (const date of interval) {
                    if (isBefore(date, new Date(2025, 3, 27))) {
                        dates.push(date)
                        acts.push(workPeriod.activity)
                        percentages.push(workPeriod.percentage)
                        status.push(workPeriod.status)
                    }
                }
            }

            dates = this.formatDates(dates)

            let datesandprofs = this.deleteDuplicateDates(dates, acts, percentages, status)
            dates = datesandprofs[0]
            acts = datesandprofs[1]
            percentages = datesandprofs[2]
            status = datesandprofs[3]

            workerList = this.generateWorkers(workerList, person, dates, acts, percentages, status)
        }

        return workerList
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

    deleteDuplicateDates(dates, acts, percentages, status) {
        let newDates = []
        let newActs = []
        let newPerc = []
        let newStatus = []

        for (let i = 0; i < dates.length; ++i) {
            if (!newDates.includes(dates[i])) {
                newDates.push(dates[i])
                newPerc.push(percentages[i])

                newStatus.push(
                    { stat1: status[i] }
                )

                newActs.push(
                    { act1: acts[i] }
                )
            } else if (percentages[i] === 50) {
                newStatus = newStatus.map(stat => {
                    return {
                        stat1: stat.stat1,
                        stat2: status[i]
                    }
                })

                newActs = newActs.map(act => {
                    return {
                        act1: act.act1,
                        act2: acts[i]
                    }
                })
            }
        }

        // console.log(newActs)
        return [newDates, newActs, newPerc, newStatus]
    },

    generateWorkers(workerList, person, dates, acts, percentages, status) {

        for (let i = 0; i < dates.length; ++i) {
            // Look if this person exists in the list, if not, add all info, if they do, add only bookings
            let foundName = workerList.find(worker => worker.name === person.name)
            if (foundName === undefined) {
                workerList.push(
                    {
                        name: person.name,
                        professions: person.professions,
                        bookings: [
                            {
                                date: dates[i],
                                acts: acts[i],
                                percentage: percentages[i],
                                status: status[i]
                            }
                        ]
                    })
            } else {
                foundName.bookings.push({
                    date: dates[i],
                    acts: acts[i],
                    percentage: percentages[i],
                    status: status[i]
                })
            }
        }

        return workerList
    },

    //insert missing dates into every worker to make sure they each have 4 weeks
    //of weekdays in their bookings
    buildFullDates(workerList) {
        let completeWorkerList = []

        let fullDates = eachDayOfInterval({
            start: new Date(2025, 2, 31),
            end: new Date(2025, 3, 25)
        }).filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        fullDates = this.formatDates(fullDates)

        console.log("Building full dates...")
        //Loop through every worker
        for (let worker of workerList) {
            completeWorkerList.push(worker)

            //If bookings are already filled, skip this worker.
            //Hardcoded for now, easily changed if we want to show different time periods
            if (worker.bookings.length === 20) {
                continue
            }

            for (const date of fullDates) {
                let tempDate = worker.bookings.find(booking => {
                    return booking.date === date
                })
                if (tempDate === undefined) {
                    worker.bookings.push({
                        date: date,
                        acts: [],
                        percentage: [0],
                        status: ["Free"]
                    })
                }
            }

            worker.bookings.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            })
        }

        return completeWorkerList
    },
}

Object.freeze(BookingService)

export default BookingService

