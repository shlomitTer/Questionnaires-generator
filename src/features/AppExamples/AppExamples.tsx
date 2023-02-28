import './AppExamples.scss';
import { AppExample1 } from './components/AppExample1/AppExample1';
import { AppExample2 } from './components/AppExample2/AppExample2';

export const AppExamples = () => {
    return (
        <div className="app-examples-container">
            <h1>App Example 1 component</h1>
            <AppExample1 />
            <hr />
            <h1>App Example 2 component</h1>
            <AppExample2 />
        </div>
    );
};
