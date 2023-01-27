
export async function workTimeConversion(duration) {
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