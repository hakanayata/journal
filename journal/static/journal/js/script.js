console.log(getNthDaysDate(currentDate.getDate()))
document.addEventListener("DOMContentLoaded", () => {
    const todaysEntryParentDiv = document.getElementById("todaysEntry")
    const now = new Date()
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString()
    // console.log("start: ", startOfDay, "\nend: ", endOfDay);

    // Redirect user to new entry page on button click
    document.addEventListener("click", (event) => {
        const element = event.target
        if (element.id === "newEntryBtn") {
            location.href = `${originURL}/create_entry`
        }
    })

    getEntries().then(data => {
        const entries = data
        console.log("entries (script.js): ", entries);
        // const [todaysEntry] = entries?.filter(entry => entry.created_at > startOfDay && entry.created_at < endOfDay) // ! OLD filter
        const [todaysEntry] = entries?.filter(entry => entry.date === getNthDaysDate(currentDate.getDate()))

        if (todaysEntry === undefined) {
            // Message
            const noEntryParEl = document.createElement("p")
            noEntryParEl.className = "lead my-0"
            noEntryParEl.textContent = "No entry to show."
            // Button
            const newEntryBtnDiv = document.createElement("div")
            newEntryBtnDiv.className = "d-grid gap-2 col-12 mx-auto mb-3"
            const newEntryBtn = document.createElement("button")
            newEntryBtn.id = "newEntryBtn"
            newEntryBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>New Entry
                `
            newEntryBtn.className = "btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2 rounded-3"

            newEntryBtnDiv.appendChild(newEntryBtn)
            todaysEntryParentDiv.insertAdjacentElement("afterend", newEntryBtnDiv)
            todaysEntryParentDiv.appendChild(noEntryParEl)
        } else {
            // * today's entry exists
            console.log("today's entry: ", todaysEntry);
            // todo: create div for today's entry
            const todaysEntryDiv = document.createElement("div")
            todaysEntryDiv.innerHTML = todaysEntry.content

            const tagsDiv = document.createElement("div")
            tagsDiv.className = "border-top d-flex gap-2 pt-2 pb-0"

            for (const tag of todaysEntry.tags) {
                console.log(tag);
                const tagEl = document.createElement("span")
                tagEl.className = "badge text-bg-secondary rounded-pill"
                tagEl.textContent = tag
                tagsDiv.appendChild(tagEl)
                todaysEntryDiv.insertAdjacentElement("beforeend", tagsDiv)
            }

            todaysEntryDiv.appendChild(tagsDiv)
            todaysEntryParentDiv.insertAdjacentElement("beforeend", todaysEntryDiv)
        }

    }).catch(err => {
        // hide entry div
        todaysEntryParentDiv.classList.replace("d-flex", "d-none")
        console.error(`• ERROR: ${err}`)
        const alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger shadow-lg")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "position: fixed; right: 10px; top: 10px; z-index: 2; max-width: 320px !important;")
        alertDiv.innerHTML = `${err.message}`
        document.body.appendChild(alertDiv)
        setTimeout(() => {
            alertDiv.remove()
        }, 2500);
    })

})