export default class SEVEREIMPACT {
    constructor(data) {
        this.data = data;

        this.severeImpact = {
            currentlyInfected : this.getCurrentlyInfected(),
            infectionsByRequestedtime : this.getInfectionsByRequestedTime(),
            severeCasesByRequestedTime : this.getSevereCasesByRequestedTime(),
            hospitalBedsByRequestedTime : this.getHospitalBedsByRequestedTime(),
            casesForICUByRequestedTime : this.getCasesForICUByRequestedTime(),
            casesForVentilatorsByRequestedTime : this.getCasesForVentilatorsByRequestedTime(),
            dollarsInFlight : this.getDollarsInFlight()
        }
    }

    getCurrentlyInfected = () => {
        return (this.data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      reportedCases * 50);
    }

    getInfectionsByRequestedTime = () => {
        var days;
        var factor;
        var infectionsByRequestedTime;

        if (this.data.periodType === "days") {
            days = this.data.timeToElapse;
        } 
        else if (this.data.periodType === "weeks") {
            days = (this.data.timeToElapse * 7);
        }
        else if (this.data.periodType === "months") {
            days = (this.data.timeToElapse * 30);
        } 
        else {
            return(-1);
        }

        factor = parseInt(days/3);
        infectionsByRequestedTime = (this.getCurrentlyInfected(this.data.reportedCases) * (2**factor));
        return (infectionsByRequestedTime); 
    }

    getSevereCasesByRequestedTime = () => {
        return ((15/100) * this.getInfectionsByRequestedTime());
    }

    getHospitalBedsByRequestedTime = () => {
        return(((35 * this.data.totalHospitalBeds)/100) - this.getSevereCasesByRequestedTime())
    }

    getCasesForICUByRequestedTime = () => {
        return ((5/100) * this.getInfectionsByRequestedTime());
    }

    getCasesForVentilatorsByRequestedTime = () => {
        return ((2/100) * this.getInfectionsByRequestedTime());
    } 

    getDollarsInFlight = () => {
        return(parseInt(((this.getInfectionsByRequestedTime() * 0.65) * 1.5) / 30));
    }
}