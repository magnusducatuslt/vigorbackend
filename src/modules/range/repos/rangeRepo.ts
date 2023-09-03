import { Range } from "../domain/Range";
import { Title } from "../domain/title";

export interface IRangeRepo {
    exists(title: Title): Promise<boolean>;
    getRangeById(indicatorId: string): Promise<Range>;
    save(range: Range): Promise<Range>;
    populateRangeByRangeId(rangeId: string): Promise<Range>;
}