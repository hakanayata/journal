// todo: create select fields 1-12 for month, 2020 - current year + 1
const currDate = new Date()
const currentYear = currDate.getFullYear()
const currentMonth = currDate.getMonth() + 1

document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form")

    // Month
    const selectMonthEl = document.createElement("select")
    selectMonthEl.className = "form-select"
    selectMonthEl.name = "month"
    selectMonthEl.id = "month-filter"

    for (let i = 0; i < 13; i++) {
        const optionEl = document.createElement("option")
        if (i === 0) {
            optionEl.selected
            optionEl.innerHTML = "Month"
        } else {
            optionEl.value = i
            optionEl.innerHTML = i
        }
        selectMonthEl.appendChild(optionEl)
    }

    filterForm.appendChild(selectMonthEl)

    // Year 
    const selectYearEl = document.createElement("select")
    selectYearEl.className = "form-select"
    selectYearEl.name = "year"
    selectYearEl.id = "year-filter"

    for (let i = 2021; i < currentYear + 1; i++) {
        const optionEl = document.createElement("option")
        if (i === 2021) {
            optionEl.selected
            optionEl.innerHTML = "Year"
        } else {
            optionEl.value = i
            optionEl.innerHTML = i
        }
        selectYearEl.appendChild(optionEl)
    }

    filterForm.appendChild(selectYearEl)

    // Submit button
    const submitInput = document.createElement("input")
    submitInput.className = "btn btn-outline-primary btn-sm"
    submitInput.type = "submit"
    submitInput.value = "Apply Filters"

    filterForm.appendChild(submitInput)
})