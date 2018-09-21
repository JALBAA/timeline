export type Coord = {
    x: number,
    y: number,
}
export default interface ICoordinate {
    x: number
    y: number
    height: number
    width: number
    children: ICoordinate[]
    cid: number
    parent: ICoordinate | null
    addChild (child: ICoordinate) : void
    removeChild (target: ICoordinate) : void
    getWorldCoord (): Coord
    getPos (): Coord
    setParent (parent: ICoordinate) : void
    setChildren (children: ICoordinate[]) : void
}