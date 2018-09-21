import Station from './Station'
export default class JobStation<Job> extends Station<Job> {
    traverlers: Job[] = []
}