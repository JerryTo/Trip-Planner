// Duration of trip
export function tripDuration(firstDate, secondDate) {
    if (!firstDate || !secondDate) {
        return "—";
    }
    // Duration of trip
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date1 = new Date(firstDate);
    let date2 = new Date(secondDate);

    let lengthOfTrip = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay))) ;

    return lengthOfTrip;
}

// Get date in MM/DD/YYYY format (Ex: 12/31/2003)
export function getDateMMDDYYYY(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return month + "/" + day + "/" + year;
}