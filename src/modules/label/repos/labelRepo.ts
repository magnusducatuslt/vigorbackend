import { Label } from "../domain/Label";
import { Title } from "../domain/title";

export interface ILabelRepo {
    exists(title: Title): Promise<boolean>;
    getLabelById(labelId: string): Promise<Label>;
    save(label: Label): Promise<Label>;
    populateLabelById(labelId: string): Promise<Label>;
}