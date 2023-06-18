document.addEventListener("DOMContentLoaded", () => {

    // Redirect user to new entry page on button click
    document.addEventListener("click", (event) => {
        const element = event.target
        if (element.id === "newEntryBtn") {
            location.href = `${originURL}/create_entry`
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