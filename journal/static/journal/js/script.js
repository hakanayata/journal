document.addEventListener("DOMContentLoaded", () => {
    let calendarDayCells = document.querySelectorAll("td")
    const xd = document.getElementsByTagName("td")

    document.addEventListener("click", (event) => {
        const element = event.target
        // Redirect user to new entry page on button click
        if (element.id === "newEntryBtn") {
            const daysDateEl = document.getElementById("daysInvisDate")
            location.href = `${originURL}/create_entry/${daysDateEl.value}`
        } else if (element.id.startsWith("editBtn")) {
            const entryID = element.dataset.id
            const dateToUpdate = element.dataset.date
            location.href = `${originURL}/update_entry/${dateToUpdate}`
        } else if (element.id.startsWith("deleteBtn")) {
            const entryID = element.dataset.id
            const dateToDelete = element.dataset.date

            deleteEntry(entryID).then(res => {
                if (!res.ok) {
                    throw new Error("Oops! Something went wrong.")
                }
                displayAlert("success", "Entry deleted.")

                // Display entry view of deleted day
                getEntry(dateToDelete).then(data => displayDaysEntry(data, dateToDelete))

                // Remove highlighting
                calendarDayCells.forEach(boardCell => {
                    if (boardCell.dataset.date === dateToDelete) {
                        boardCell.style.backgroundColor = "#eee"
                    }
                })
            }).catch(err => displayAlert("error", err))

        } else if (element.dataset.date) {
            // Show day's entry that is being clicked
            const clickedDate = element.dataset.date
            getEntry(clickedDate).then(data => displayDaysEntry(data, clickedDate))
        }
    })

    // * gets today's entry when home page loaded
    getEntry(getNthDaysDate(currentDate.getDate())).then(data => {
        displayDaysEntry(data, dateObjToYYYYmmdd(currentDate))
    })


})