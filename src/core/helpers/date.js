import {DateTime} from "luxon";

export const formatDate = (date, format) => {
    if(!date) return date;
    return DateTime.fromISO(date || '').toFormat(format)
}
