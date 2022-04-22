
export const tomorrowFunc = () => {
    // configuring date logic
    const today = new Date()
    const tomorrow = new Date(today)
    // compute tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1)

    //convert to local time
    const tomorrowStr = new Date(tomorrow.toLocaleDateString('en-US'));
    return tomorrowStr

}

export const maxDateFunc = () => {
    const today = new Date()
    const max = new Date(today)
    // 2 month selection window
    max.setDate(max.getDate()+60)
    const maxPlaceholder = new Date(max.toLocaleDateString('en-US'));
    return maxPlaceholder;
}

export const stringCalenderDateFunc = (apptDate) => {
    let submissionDate;
    const year = parseInt(apptDate.getFullYear())
    const day = parseInt(apptDate.getDate())
    const month = parseInt(apptDate.getMonth())+1 //the getMonth is indexed
    // console.log("month in string cal date func is...", month)
    if(month >= 10 && day >= 10){
        submissionDate = `${year}-${month}-${day}`
    } if( month >= 10 && day < 10 ){
        submissionDate = `${year}-${month}-0${day}`
    }
    if(month < 10 && day >= 10){
        submissionDate = `${year}-0${month}-${day}`
    }
    else {
        submissionDate = `${year}-0${month}-0${day}`
    }
    return submissionDate;
}

export const userFormatCalendarDateFunc = (apptDate) => {
    if(apptDate === undefined) return
    let res;
    let strArr = apptDate.split(' ');
    let weekDay = strArr[0];
    let day = strArr[1];
    let month = strArr[2];
    let year = strArr[3];
    res = `${weekDay} ${month} ${day}, ${year}`
    return res;
}
