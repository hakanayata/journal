document.addEventListener("DOMContentLoaded", () => {
    if (document.body.contains(document.querySelector("#alert"))) {
        const alertDiv = document.getElementById("alert")

        if (alertDiv.textContent.trim().startsWith("Entry already exists on")) {
            const localeDate = new Date(alertDiv.textContent.trim().split("Entry already exists on")[1]).toLocaleDateString()
            alertDiv.textContent = `Entry already exists on ${localeDate}.`
        }
        setTimeout(() => {
            alertDiv.style.display = "none"
        }, 2500);
    }
})