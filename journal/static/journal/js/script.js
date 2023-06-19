document.addEventListener("DOMContentLoaded", () => {

    // Redirect user to new entry page on button click
    document.addEventListener("click", (event) => {
        const element = event.target
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
                // todo: remove entry from DOM // get date from data-date
                getEntry(dateToDelete).then(data => displayDaysEntry(data, dateToDelete))

            }).catch(err => displayAlert("error", err))
        } else if (element.dataset.date) {
            const clickedDate = element.dataset.date
            getEntry(clickedDate).then(data => displayDaysEntry(data, clickedDate))
        }
    })

    // * gets today's entry when home page loaded
    getEntry(getNthDaysDate(currentDate.getDate())).then(data => {
        displayDaysEntry(data, dateObjToYYYYmmdd(currentDate))
    })


})