import Job from "../jobs/Job";

export enum Sex {
    Man,
    Woman,
}
export interface Labourable {

}
export default class Labour implements Labourable{
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