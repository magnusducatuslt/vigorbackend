import { Indicator } from "../domain/Indicator";
import { Title } from "../domain/title";

export interface IIndicatorRepo {
    exists(title: Title): Promise<boolean>;
    getIndicatorById(indicatorId: string): Promise<Indicator>;
    save(indicator: Indicator): Promise<Indicator>;
    populateIndicatorById(indicatorId: string): Promise<Indicator>;
}