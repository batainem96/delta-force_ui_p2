// Calculate the age of the article and return the highest order representation (year > month > day > hour > minute)
export function getAge(current: Date, old: Date): string {

    let years = current.getFullYear() - old.getFullYear(); // i.e. 2021 - 2020 = 1 year
    let months = current.getMonth() - old.getMonth(); // i.e. June (6) - February (2) = 4 months (note: if this is < 0, subtract 1 year [i.e. January (1) 2021 - December (12) 2020 is not a year!])
    if(months < 0) {
        years--;
        months *= -1; // The year rolled over, thus the months passed are out of order (1 - 12 = -11... not likely!)
    }
    let days = current.getDay() - old.getDay(); // ditto
    if(days < 0) {
        months--;
        days *= -1;
    }
    let hours = current.getHours() - old.getHours(); // ditto
    if(hours < 0) {
        days--;
        hours *= -1;
    }
    let minutes = current.getMinutes() - old.getMinutes(); // ditto
    if(minutes < 0) {
        hours--;
        minutes *= -1;
    }

    let age = '';
    if(years > 0) {
        age += `${years}y`;
    } else if(months > 0) {
        age += `${months}mo`;
    } else if(days > 0) {
        age += `${days}d`;
    } else if(minutes > 0) {
        age += `${minutes}min`;
    } else {
        age = 'now';
    }

    return age;
}