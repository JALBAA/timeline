import RenderableObject, { Renderable } from "./graphics/RenderableObject"
import { LabourIcon } from "./jobs/RenderableJob";
import Container from "./graphics/Container";
import { LabourType } from "./workers/Labour";
import Grid from "./grid";

export class Table extends Container {
    addLabour (node: LabourIcon) {
        if (node.type == LabourType.Owner){
            super.addChild(node)
            this.height = this.height.add(new Grid(1))
            node.coord.y = this.height
            node.coord.x = new Grid(-1)
        } else
            throw new Error('illegal type')
    }
    addChild (child: Renderable) {
        throw new Error('w')
    }
}
