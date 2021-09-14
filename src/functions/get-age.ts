import { differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

// Calculate the age of the article and return the highest order representation (year > month > day > hour > minute)
export function getAge(current: Date, old: Date): string {

    let years = differenceInYears(current, old);
    let months = differenceInMonths(current, old);
    let days = differenceInDays(current, old);
    let hours = differenceInHours(current, old);
    let minutes = differenceInMinutes(current, old);

    if(years > 0) {
        return `${years}y`;
    } else if(months > 0) {
        return `${months}mo`;
    } else if(days > 0) {
        return `${days}d`;
    } else if(hours > 0) {
        return `${hours}h`
    } else if(minutes > 0) {
        return `${minutes}min`;
    } else {
        return 'now';
    }
}