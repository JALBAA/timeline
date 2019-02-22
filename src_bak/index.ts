import Stage from "./Stage";
import { DebugGrid } from "./utils/Debug";
import { Table, Row } from "./Table";
import { LabourIcon, JobRailway, LineJob } from "./jobs/RenderableJob";
import { LabourType } from "./workers/Labour";
import Grid from "./grid";
import { DateToCoord, Time } from "./Time";

const body = document.querySelector('body')

const t = new Time
t.translate({
    x: t.coord.x,
    y: new Grid(0),
})
DateToCoord.globalTime = t

if (body) {
    const stage = new Stage(body, 500, 500)
    const debugGrid = new DebugGrid
    stage.addChild(debugGrid)
    const table = new Table
    table.coord.x = new Grid(1)
    stage.addChild(table)
    
    
    
    const row1 = new Row
    table.addRow(row1)
    const labour1 = new LabourIcon
    labour1.setLabourType(LabourType.Owner)
    labour1.name = 'zy'
    row1.addLabour(labour1)
    const rail = new JobRailway
    const job1 = new LineJob
    job1.devStart.addDays(1)
    job1.devEnd.addDays(10)
    // row1.addJobRailway(rail)


    const row2 = new Row
    table.addRow(row2)
    const labour2 = new LabourIcon
    labour2.setLabourType(LabourType.Owner)
    labour2.name = 'zy2'
    row2.addLabour(labour2)
    setTimeout(() => {
        stage.draw()
    })
}