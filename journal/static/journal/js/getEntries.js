let daysView
let daysEntryParentDiv
let daysHeadingEl
let newEntryBtnDiv
let data
const originURL = window.location.origin

document.addEventListener("DOMContentLoaded", () => {
    daysView = document.getElementById("daysView")
    daysEntryParentDiv = document.getElementById("daysEntry")
    daysHeadingEl = document.getElementById("daysHeading")
    newEntryBtnDiv = document.getElementById("newEntryBtnDiv")
})

const dateObjToYYYYmmdd = (date) => {
    const dt = new Date(date)
    const year = dt.getFullYear()
    const month = String(dt.getMonth() + 1).padStart(2, '0')
    const day = String(dt.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

async function getEntries() {
    // once run, do not fetch data again
    if (data) return data
    try {
        const res = await fetch(`${originURL}/entries`)
        if (!res.ok) { throw new Error("Could not fetch data!") }
        data = await res.json()
        // console.log("getEntries: ", data);
        return data
    } catch (error) {
        console.error(error)
        const alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger shadow-lg")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "position: fixed; right: 10px; top: 10px; z-index: 2; max-width: 320px !important;")
        alertDiv.innerHTML = `${error.message}`
        document.body.appendChild(alertDiv)
        setTimeout(() => {
            alertDiv.remove()
        }, 2500);
    }
}

// * returns entry on specific date
async function getEntry(date = null) {
    try {
        const res = await fetch(`${originURL}/entry_on/${date}`)
        // console.log(res);
        if (!res.ok) { throw new Error("Could not fetch data.") }
        const data = await res.json()
        // console.log(data);
        return data
    }
    catch (error) {
        const alertDiv = document.createElement("div")
        alertDiv.setAttribute("class", "alert alert-danger shadow-lg")
        alertDiv.setAttribute("role", "alert")
        alertDiv.setAttribute("style", "position: fixed; right: 10px; top: 10px; z-index: 2; max-width: 320px !important;")
        alertDiv.innerHTML = `${error.message}`
        document.body.appendChild(alertDiv)
        setTimeout(() => {
            alertDiv.remove()
        }, 2500);
    }
}


// * displays specific day's entry
const displayDaysEntry = (entry, date) => {
    // console.log(entry);
    // * clean everything in daysEntry
    daysEntryParentDiv.innerHTML = ""
    newEntryBtnDiv.innerHTML = ""

    const invisDateInput = document.createElement("input")
    invisDateInput.style.display = "none"
    invisDateInput.disabled = true
    invisDateInput.type = "text"
    invisDateInput.value = date
    invisDateInput.id = "daysInvisDate"
    daysEntryParentDiv.appendChild(invisDateInput)

    if (date === dateObjToYYYYmmdd(new Date())) {
        daysHeadingEl.textContent = "Today"
    } else {
        // todo: get date from dataset
        daysHeadingEl.textContent = new Date(date).toLocaleDateString()
    }

    if (entry.error === "No entry on this day.") {
        // Message
        const noEntryParEl = document.createElement("p")
        noEntryParEl.className = "lead my-0"
        noEntryParEl.textContent = "No entry to show."
        // Button
        // const newEntryBtnDiv = document.createElement("div")
        // newEntryBtnDiv.className = "d-grid gap-2 col-12 mx-auto mb-3"
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
        // daysEntryParentDiv.insertAdjacentElement("afterend", newEntryBtnDiv)
        daysEntryParentDiv.appendChild(noEntryParEl)
    } else {
        // * today's entry exists
        const daysEntryDiv = document.createElement("div")
        daysEntryDiv.innerHTML = entry.content

        const tagsDiv = document.createElement("div")
        tagsDiv.className = "border-top d-flex gap-2 pt-2 pb-0"

        for (const tag of entry.tags) {
            // console.log(tag);
            const tagEl = document.createElement("span")
            tagEl.className = "badge text-bg-secondary rounded-pill"
            tagEl.textContent = tag
            tagsDiv.appendChild(tagEl)
            daysEntryDiv.insertAdjacentElement("beforeend", tagsDiv)
        }

        daysEntryDiv.appendChild(tagsDiv)
        daysEntryParentDiv.insertAdjacentElement("beforeend", daysEntryDiv)

    }
}