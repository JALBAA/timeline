import Station from './Station'
export default class LabourStation<Labour> extends Station<Labour> {
    traverlers: Labour[] = []
}