export default function getDaysOfCurMonth() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    // parameter "0" gives us the last day of prev. month 
    const daysCurrentMonth = new Date(currentYear, currentMonth, 0).getDate()
    return daysCurrentMonth
}

