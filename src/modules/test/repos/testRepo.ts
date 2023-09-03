import { Test } from "../domain/Test";
import { Title } from "../domain/title";

export interface ITestRepo {
    exists(title: Title): Promise<boolean>;
    getTestByTestId(testId: string): Promise<Test>;
    save(test: Test): Promise<Test>;
    populateTestByTestId(testId: string): Promise<Test>;
}