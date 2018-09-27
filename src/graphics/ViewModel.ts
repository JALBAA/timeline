import RenderableObject from "./RenderableObject";
import Model from "../Model";

export abstract class ViewModel {
    view: RenderableObject | null = null
    model: Model | null = null
}