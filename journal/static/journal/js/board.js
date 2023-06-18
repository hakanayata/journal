document.addEventListener('DOMContentLoaded', () => {
    const boardHead = document.getElementById("boardHead")
    const currentDate = new Date()
    // first day of the month in ISO format e.g. "2023-06-18"
    const nthDaysDate = (n) => new Date(new Date().setDate(n)).toISOString().slice(0, 10)
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

    const boardBody = document.createElement("tbody")
    boardBody.className = "d-flex flex-column gap-2"

    let n = 0;
    while (n < daysInCurMonth) {
        for (let i = 0; i < numberOfWeeks; i++) {
            const newRow = document.createElement("tr")
            if (i === 0) {
                newRow.className = "d-flex align-items-center justify-content-end gap-2"
                for (let j = indexOfStartAtNthDay; j < 7; j++) {
                    const newCell = document.createElement("td")
                    newCell.role = "button"
                    newCell.dataset["date"] = nthDaysDate(n + 1)
                    n++
                    newRow.appendChild(newCell)
                }
                boardBody.appendChild(newRow)
            } else if (i === numberOfWeeks - 1) {
                newRow.className = "d-flex align-items-center justify-content-start gap-2"
                for (let k = 0; k < daysInLastWeek; k++) {
                    const newLastWeeksCell = document.createElement("td")
                    newLastWeeksCell.role = "button"
                    newLastWeeksCell.dataset["date"] = nthDaysDate(n + 1)
                    n++
                    newRow.appendChild(newLastWeeksCell)
                }
                boardBody.appendChild(newRow)
            } else {
                newRow.className = "d-flex align-items-center justify-content-center gap-2"
                for (let l = 0; l < 7; l++) {
                    const newCell = document.createElement("td")
                    newCell.role = "button"
                    newCell.dataset["date"] = nthDaysDate(n + 1)
                    n++
                    newRow.appendChild(newCell)
                }
                boardBody.appendChild(newRow)
            }

        }

    }


    boardHead.insertAdjacentElement("afterend", boardBody)
    let calendarDayCells = document.getElementsByTagName("td")

    const todaysNumber = currentDate.getDate()
    // first 7 cells are labels
    const todaysCellIndex = todaysNumber + 6
    calendarDayCells[todaysCellIndex].setAttribute("style", "border: 3px #d7f solid")

    // * Highlight active days
    getEntries().then(data => {
        const entries = data
        entries.forEach(entry => {
            // console.log(entry.created_at);
            // console.log(new Date(entry.created_at).getDate());
            const activeDay = new Date(entry.created_at).getDate()
            // first 7 cells (6 indexes) are labels
            const indexOfDayToHighlight = activeDay + 6
            // in case multiple entries on the same day //! delete after adding 'date' field  
            if (calendarDayCells[indexOfDayToHighlight].style.backgroundColor !== "#afac") {
                calendarDayCells[indexOfDayToHighlight].style.backgroundColor = "#afac"
            }
        })
    })

})



