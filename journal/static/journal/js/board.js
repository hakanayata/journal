const currentDate = new Date()
const curYearAndMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`
// returns "YYYY-mm-dd" of given day
const getNthDaysDate = (n) => new Date(new Date().setUTCDate(n)).toISOString().substring(0, 10)

// Returns number of days of the current month
const getDaysOfCurMonth = () => {
    const currentYear = currentDate.getFullYear()
    const nextMonth = currentDate.getMonth() + 1

    // parameter "0" gives us the last day of prev. month 
    const daysInCurrentMonth = new Date(currentYear, nextMonth, 0).getDate()
    return daysInCurrentMonth
}

const daysInCurMonth = getDaysOfCurMonth()
// if Thursday, getDay() returns 4, it's one-based instead of zero
const startsAtNthDay = new Date(new Date().setDate(1)).getDay()
// get zero-based index (0 - 6)
const indexOfStartAtNthDay = startsAtNthDay - 1
const totalDaysIncludingOffset = daysInCurMonth + indexOfStartAtNthDay
const daysInLastWeek = totalDaysIncludingOffset % 7 === 0 ? 7 : totalDaysIncludingOffset % 7
const numberOfWeeks = Math.ceil(totalDaysIncludingOffset / 7)

document.addEventListener("DOMContentLoaded", () => {
    const boardHead = document.getElementById("boardHead")

    // * create table body
    const boardBody = document.createElement("tbody")
    boardBody.className = "d-flex flex-column gap-2"

    // * create calendar-like monthly activity board
    let n = 0;
    while (n < daysInCurMonth) {
        for (let i = 0; i < numberOfWeeks; i++) {
            const newRow = document.createElement("tr")
            if (i === 0) {
                newRow.className = "d-flex align-items-center justify-content-end gap-2"
                for (let j = indexOfStartAtNthDay; j < 7; j++) {
                    const newCell = document.createElement("td")
                    newCell.role = "button"
                    newCell.dataset["date"] = getNthDaysDate(n + 1)
                    newCell.textContent = n + 1
                    n++
                    newRow.appendChild(newCell)
                }
                boardBody.appendChild(newRow)
            } else if (i === numberOfWeeks - 1) {
                newRow.className = "d-flex align-items-center justify-content-start gap-2"
                for (let k = 0; k < daysInLastWeek; k++) {
                    const newCell = document.createElement("td")
                    newCell.role = "button"
                    newCell.dataset["date"] = getNthDaysDate(n + 1)
                    newCell.textContent = n + 1
                    n++
                    newRow.appendChild(newCell)
                }
                boardBody.appendChild(newRow)
            } else {
                newRow.className = "d-flex align-items-center justify-content-center gap-2"
                for (let l = 0; l < 7; l++) {
                    const newCell = document.createElement("td")
                    newCell.role = "button"
                    newCell.dataset["date"] = getNthDaysDate(n + 1)
                    newCell.textContent = n + 1
                    n++
                    newRow.appendChild(newCell)
                }
                boardBody.appendChild(newRow)
            }

        }

    }


    boardHead.insertAdjacentElement("afterend", boardBody)
    let calendarDayCells = document.getElementsByTagName("td")

    // * highlight today
    const todaysNumber = currentDate.getDate()
    // first 7 cells are labels
    const todaysCellIndex = todaysNumber + 6
    calendarDayCells[todaysCellIndex].setAttribute("style", "border: 3px #d7f solid")

    // * Highlight active days of this month
    getEntries().then(entries => {
        // filter first 7 chars of date e.g. "2023-06"
        const thisMonthsEntries = entries.filter(entry => entry.date.slice(0, 7) === curYearAndMonth)
        thisMonthsEntries.forEach(entry => {
            const activeDay = new Date(entry.date).getDate()
            // first 7 cells (6 indexes) are labels
            const indexOfDayToHighlight = activeDay + 6
            calendarDayCells[indexOfDayToHighlight].style.backgroundColor = "#afac"

        })
    })


})