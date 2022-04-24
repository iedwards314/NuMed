

export const apptTimeFunc = (docAvailArr) => {
    let checkArr = []
    const schedArr = [9, 10, 11, 13, 14, 15, 16] //normal times
    const schedObj = {
        "9": "9:00 AM to 10:00 AM",
        "10": "10:00 AM to 11:00 AM",
        "11": "11:00 AM to 12:00 PM",
        "13": "1:00 PM to 2:00 PM",
        "14": "2:00 AM to 3:00 PM",
        "15": "3:00 AM to 4:00 PM",
        "16": "4:00 PM to 5:00 PM"
    }

    for(let i = 0; i<docAvailArr?.length; i++){ //create test array
        let value = docAvailArr[i]?.start_time
        checkArr.push(value);
    }

    let resArr = []
    for(let i = 0; i < schedArr.length; i++){ //push in available slots in array
        let testTime = schedArr[i]
        if(!checkArr?.includes(testTime)){
            resArr.push(testTime)
        }
    }
    if(resArr.length > 0){
        return (
            <>
                {resArr?.map((time, idx) => <option key={idx} value={`${time}`}>{schedObj[time]}</option>)}
            </>
        )
    } else {
        return (
            <>
                <h3>No appointments available for this doctor, select a diffent day</h3>
            </>
        )
    }
}

export const dbDateFrontendFunc = (time) => {
    const schedObj = {
        "9": "9:00 AM CT",
        "10": "10:00 AM CT",
        "11": "11:00 AM CT",
        "13": "1:00 PM CT",
        "14": "2:00 PM CT",
        "15": "3:00 PM CT",
        "16": "4:00 PM CT"
    }
    let res = schedObj[time]
    return res;

}
