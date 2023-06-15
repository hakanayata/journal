document.addEventListener("DOMContentLoaded", () => {
    if (document.body.contains(document.querySelector("#alert"))) {
        setTimeout(() => {
            const alertDiv = document.querySelector("#alert")
            alertDiv.style.display = "none"
        }, 1800);
    }
})