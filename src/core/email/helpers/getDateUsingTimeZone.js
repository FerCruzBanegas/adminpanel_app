import moment from 'moment';
import countriesDB from 'countries-db'
import momentTimeZone from 'moment-timezone';

export function getDateUsingTimeZone(country, date) {
    if (!country) return moment(date).format('dddd, DD-MM-YYYY / hh:mm A');
    else {
        let convertedDate;
        const timezones = countriesDB && countriesDB.getCountry(country, 'timezones');
        if (timezones && timezones.length > 0) {
            convertedDate = (timezones && timezones.length > 0) ? momentTimeZone.tz(date, timezones[0]) : null;
        }
        if (convertedDate && convertedDate != null) {
            return moment(convertedDate).format('dddd, DD-MM-YYYY / hh:mm A');
        } else {
            return moment(date).format('dddd, DD-MM-YYYY / hh:mm A');
        }
    }
}

export function getTimeZone(country) {
    if (!country) return null;
    else {
        const timezones = countriesDB && countriesDB.getCountry(country, 'timezones');
        if (timezones && timezones.length > 0) {
            return timezones[0];
        } else {
            return null
        }
    }
}

export function workTimeConversion(duration) {
    duration = duration.toFixed(2);
    duration = duration.toString();
    if (duration >= 60) {
        var totalHour = (duration / 60);
        var splitArr = totalHour.split(".");
        return splitArr[0] + "h " + splitArr[1] + "m";
    } else if (duration >= 1 && duration < 60) {
        var totalMin = duration;
        var splitArr = totalMin.split(".");
        return splitArr[0] + "m " + splitArr[1] + "s";
    } else {
        var totalSec = duration;
        var splitArr = totalSec.split(".");
        if (parseInt(splitArr[1]) >= 10) {
            return splitArr[1] + "s";
        } else {
            return splitArr[1][1] + "s";
        }
    }
}