import { format, eachDayOfInterval, isAfter, isBefore, isEqual } from "date-fns"
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

            let workerList = this.createWorkerList(data)
            workerList = this.buildFullDates(workerList)
            return workerList
        } catch (err) {
            console.log(err)
        }
    },

    createWorkerList(data) {
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

            // Reformat dates 
            dates = this.formatDates(dates)

            let datesandprofs = this.deleteDuplicateDates(dates, acts, percentages, status)
            dates = datesandprofs[0]
            acts = datesandprofs[1]
            percentages = datesandprofs[2]
            status = datesandprofs[3]

            // console.log(dates)

            workerList = this.generateWorkers(workerList, person, dates, acts, percentages, status)
        }

        return workerList
    },

    formatDates(dates) {
        let arr = []
        for (let date of dates) {
            arr.push(format(date, "dd/MM/yyyy"))
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

    //implement date match to get 20 length arrays of dates for each person
    buildFullDates(workerList) {
        let completeWorkerList = []

        console.log("Building full dates...")
        //Loop through every worker
        for (let worker of workerList) {
            completeWorkerList.push(worker)
            if(worker.bookings.length === 20) {
                continue
            }
            // console.log(worker)
            for (let i = 0; i < 20; ++i) {
                let tempDate = this.matchDate(worker.bookings[i].date)
                if (!isEqual(tempDate, worker.bookings[i].date)) {
                    worker.bookings.push({
                        date: tempDate,
                        acts: [],
                        percentages: [0],
                        status: ["Free"]
                    })                    
                }
            }
            
        }
        // completeWorkerList.push({
        //     name: worker.name,
        //     professions: worker.professions,
        //     bookings: [
        //         {
        //             date: tempDate,
        //             acts: [],
        //             percentages: [0],
        //             status: ["Free"]
        //         }
        //     ]
        // })
        console.log(completeWorkerList)
        return completeWorkerList
    },

    matchDate(date) {

        let fullDates = eachDayOfInterval({
            start: new Date(2025, 2, 31),
            end: new Date(2025, 3, 25)
        }).filter(date => !(date.getDay() === 6 || date.getDay() === 0))

        fullDates = this.formatDates(fullDates)

        console.log(fullDates)

        for (const fdate of fullDates) {
            console.log(date + " " + fdate)
            if (isEqual(date, fdate)) {
                return fdate
            }
        }
        return date
    }
}

Object.freeze(BookingService)

export default BookingService

