document.addEventListener("DOMContentLoaded", () => {
    const originURL = window.location.origin
    let data;

    async function getEntries() {
        if (data) return data
        try {
            const res = await fetch(`${originURL}/entries`)
            if (!res.ok) { throw new Error("Could not fetch data!") }
            data = await res.json()
            console.log(data);
            return data
        } catch (error) {
            console.error(error)
        }
    }

    getEntries()
})