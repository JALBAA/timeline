import Stage from "./Stage";
import { DebugGrid } from "./utils/Debug";
import { Table } from "./Table";
import { LabourIcon } from "./jobs/RenderableJob";
import { LabourType } from "./workers/Labour";
import Grid from "./grid";

const body = document.querySelector('body')

if (body) {
    const stage = new Stage(body, 500, 500)
    const debugGrid = new DebugGrid
    // stage.addChild(debugGrid)
    const table = new Table
    table.coord.x = new Grid(1)
    stage.addChild(table)
    const labour1 = new LabourIcon
    labour1.setLabourType(LabourType.Owner)
    table.addLabour(labour1)
    const labour2 = new LabourIcon
    labour2.setLabourType(LabourType.Owner)
    table.addLabour(labour2)
    setTimeout(() => {
        stage.draw()
    })
}