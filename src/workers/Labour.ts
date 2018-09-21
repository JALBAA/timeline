import Job from "../jobs/Job";

export enum Sex {
    Man,
    Woman,
}

export default abstract class Labour {
    // jobs
    jobs: Job[] = []
    name: string = ''
    givenName: string = ''
    familyName: string = ''
    sex: Sex = Sex.Man

    addJob () {

    }
    removeJob () {
        
    }
}