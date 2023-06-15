document.addEventListener('DOMContentLoaded', () => {
    let numberOfDays;
    const getDaysOfCurMonth = () => {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1

        // parameter "0" gives us the last day of prev. month 
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
        return daysInCurrentMonth
    }
    numberOfDays = getDaysOfCurMonth()
    console.log(numberOfDays);


})