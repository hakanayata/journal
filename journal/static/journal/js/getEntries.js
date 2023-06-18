const originURL = window.location.origin
let data;

async function getEntries() {
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