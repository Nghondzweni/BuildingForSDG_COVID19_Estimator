export default class SEVEREIMPACT {
    getCurrentlyInfected = (reportedCases) => {
        return (reportedCases * 50);
    }

    getInfectionsByRequestedTime = (data) => {
        var days;
        var factor;
        var infectionsByRequestedTime;

        if (data.periodType == "days") {
            days = data.timeToElapse;
        } 
        else if (data.periodType == "weeks") {
            days = (data.timeToElapse * 7);
        }
        else if (data.periodType == "months") {
            days = (data.timeToElapse * 31);
        } 
        else {
            return(-1);
        }

        factor = Math.round(days/3);
        infectionsByRequestedTime = (this.getCurrentlyInfected(data.reportedCases) * (2**factor));
        return (infectionsByRequestedTime); 
    }

    getSevereCasesByRequestedTime = (data) => {
        return ((15/100) * this.getInfectionsByRequestedTime(data));

    }

}