export const permitZoneColour = (start, end) => {
    const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
    const now = timeToDecimal(currentTimeStringFormat)
    //console.log(timeToDecimal("17:26"))
    if (currentDecimalTime >= start && currentDecimalTime < end) {
        return "rgba(238, 22, 22, 0.12)" // red - cannot paork
    } 
    else if (start == 0 && end ==0 ) {
        return "rgba(39, 245, 50, 0.14)" // green - can park
    }
    return "rgba(39, 245, 50, 0.14)" // green - can park
}

export const checkIfPermitZonesApplies = (start, end) => {
    const currentTimeStringFormat = `${new Date().getHours()}:${new Date().getMinutes()}`
    const now = timeToDecimal(currentTimeStringFormat)
    if (now >= start && now < end) {
        return true
    } 
    return false
}

export function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseInt((arr[1]/6)*10, 10);

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
} 

export function decimalToHourMinsConverter(time) {
    var n = new Date(0,0);
    n.setMinutes(+time * 60);
    return n.toTimeString().slice(0, 5);
}