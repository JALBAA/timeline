import RenderableObject, { Renderable } from "./graphics/RenderableObject"
import { LabourIcon, LineJob, JobRailway } from "./jobs/RenderableJob";
import Container from "./graphics/Container";
import { LabourType } from "./workers/Labour";
import Grid from "./grid";

export class Table extends Container {
    rows: Row[] = []
    addRow (row: Row) {
        super.addChild(row)
        this.height = this.height.add(new Grid(1))
        row.coord.y = this.height
        row.coord.x = new Grid(-1)
        this.rows.push(row)
    }
    addChild (child: Renderable) {
        throw new Error('table dose not support addChild')
    }
}

export class Row extends Container {
    addLabour (node: LabourIcon) {
        if (node.type == LabourType.Owner){
            super.addChild(node)
        } else
            throw new Error('illegal labour type')
    }
    addJobRailway (railway: JobRailway) {
        super.addChild(railway)
    }
    addChild (child: Renderable) {
        throw new Error('row dose not support addChild')
    }
}