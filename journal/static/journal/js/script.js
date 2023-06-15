document.addEventListener("DOMContentLoaded", () => {
    const originURL = window.location.origin
    const todaysEntryParentDiv = document.getElementById("todaysEntry")
    const now = new Date()
    console.log("now: ", now);
    console.log(new Date(now.setHours(0, 0, 0, 0)));
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))
    const endOfDay = new Date(now.setHours(23, 59, 59, 999))
    console.log(startOfDay, endOfDay);

    // Spinner div
    const spinnerDiv = document.createElement("div")
    spinnerDiv.className = "d-flex justify-content-center w-100"
    const spinnerInnerDiv = document.createElement("div")
    spinnerInnerDiv.className = "spinner-border text-primary"
    spinnerInnerDiv.role = "status"
    const spinner = document.createElement("span")
    spinner.className = "visually-hidden"
    spinner.textContent = "Loading..."
    spinnerInnerDiv.appendChild(spinner)
    spinnerDiv.appendChild(spinnerInnerDiv)
    todaysEntryParentDiv.insertAdjacentElement("afterbegin", spinnerDiv)

    // Redirect user to new entry page on button click
    document.addEventListener("click", (event) => {
        const element = event.target
        if (element.id === "newEntryBtn") {
            location.href = `${originURL}/create_entry`
        }
    })

    fetch(`${originURL}/entries`)
        .then(res => {
            res.json()
            console.log(res);
            if (!res.ok) {
                throw new Error("Something went wrong.")
            }
        })
        .then(entries => {
            console.log("entries: ", entries)
            if (entries === undefined || entries.length === 0) {
                // Show msg when no entry
                const noEntryParEl = document.createElement("p")
                noEntryParEl.className = "lead my-0"
                noEntryParEl.textContent = "No entry to show."
                // New entry button and its div
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

                // remove spinner before showing msg
                setTimeout(() => {
                    spinnerDiv.remove()

                    newEntryBtnDiv.appendChild(newEntryBtn)
                    todaysEntryParentDiv.insertAdjacentElement("afterend", newEntryBtnDiv)
                    todaysEntryParentDiv.appendChild(noEntryParEl)
                }, 200);

                // todaysEntryParentDiv.insertAdjacentElement("afterend", newEntryBtn)
            } else {
                // remove spinner before showing today's entry
                entries.forEach(entry => console.log(entry.created_at))
                const todaysEntry = entries.filter(entry => entry.created_at > startOfDay && entry.created_at < endOfDay)[0]
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
                    todaysEntryDiv.appendChild(tagsDiv)
                }

                setTimeout(() => {
                    spinnerDiv.remove()
                    todaysEntryDiv.appendChild(tagsDiv)
                    todaysEntryParentDiv.insertAdjacentElement("beforeend", todaysEntryDiv)
                }, 200);
            }

        })
        .catch(err => {
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