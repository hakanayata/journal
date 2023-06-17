document.addEventListener('DOMContentLoaded', () => {
    const boardHead = document.getElementById("boardHead")
    const activityBoard = document.getElementById("activityBoard")
    let numberOfDays;
    let currentDate = new Date()
    const getDaysOfCurMonth = () => {
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1

        // parameter "0" gives us the last day of prev. month 
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        return daysInCurrentMonth
    }
    numberOfDays = getDaysOfCurMonth()
    // if Thursday, getDay() returns 4, it's one-based instead of zero
    const startsAtNthDay = new Date(new Date().setDate(1)).getDay()
    // get zero-based index (0 - 6) of starting day of this month
    const indexOfStartAtNthDay = startsAtNthDay - 1
    numberOfDays += indexOfStartAtNthDay
    const daysInLastWeek = numberOfDays % 7 === 0 ? 7 : numberOfDays % 7
    const numberOfWeeks = Math.ceil(numberOfDays / 7)
    // console.log(numberOfDays, numberOfWeeks, daysInLastWeek);

    const boardBody = document.createElement("tbody")
    boardBody.className = "d-flex flex-column gap-2"

    for (let i = 0; i < numberOfWeeks; i++) {
        const newRow = document.createElement("tr")
        if (i === 0) {
            newRow.className = "d-flex align-items-center justify-content-end gap-2"
            for (let j = indexOfStartAtNthDay; j < 7; j++) {
                const newCell = document.createElement("td")
                newRow.appendChild(newCell)
            }
            boardBody.appendChild(newRow)
        } else if (i === numberOfWeeks - 1) {
            newRow.className = "d-flex align-items-center justify-content-start gap-2"
            for (let k = 0; k < daysInLastWeek; k++) {
                const newLastWeeksCell = document.createElement("td")
                newRow.appendChild(newLastWeeksCell)
            }
            boardBody.appendChild(newRow)
        } else {
            newRow.className = "d-flex align-items-center justify-content-center gap-2"
            for (let l = 0; l < 7; l++) {
                const newCell = document.createElement("td")
                newRow.appendChild(newCell)
            }
            boardBody.appendChild(newRow)
        }

    }

    boardHead.insertAdjacentElement("afterend", boardBody)
    let calendarDayCells = document.getElementsByTagName("td")

    console.log(currentDate);
    const dayOfTheMonth = currentDate.getDate()
    // first 7 cells are labels
    const todaysCellIndex = dayOfTheMonth + 6
    console.log(todaysCellIndex);
    calendarDayCells[todaysCellIndex].setAttribute("style", "border: 3px #faf solid")

})










// // most basic version of month view
// for (let i = 0; i < numberOfWeeks; i++) {
//     const newRow = document.createElement("tr")
//     if (i === 4) {
//         for (let k = 0; k < daysInLastWeek; k++) {
//             const newLastWeeksCell = document.createElement("td")
//             newRow.appendChild(newLastWeeksCell)
//         }
//         activityBoard.appendChild(newRow)
//     } else {
//         for (let j = 0; j < 7; j++) {
//             const newCell = document.createElement("td")
//             newRow.appendChild(newCell)
//         }
//         activityBoard.appendChild(newRow)
//     }

// }

// todaysEntryDiv.insertAdjacentElement("afterend", activityBoard)