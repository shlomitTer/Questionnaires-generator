import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, } from 'react';
import { APP_ROUTING_PATHS } from './app/constants';
import { I18Provider } from './shared/i18/i18nProvider';
import { AppLayout } from './app/AppLayout/AppLayout';
import AddQuestion from './comps/quiz/addQuestion/AddQuestion';
import List from './comps/listOfQuizzes/List';
import CreateQuiz from './comps/quiz/CreateQuiz/CreateQuiz';
import Quiz from './comps/quiz/quiz/Quiz';
import Home from './comps/home/Home';
import Results from './comps/quiz/results/Results';

function App() {

    return (
        <div className="App">
            <Suspense fallback="loading">
                <I18Provider>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path={APP_ROUTING_PATHS.HOME} element={<Home />} />
                            <Route path={APP_ROUTING_PATHS.CREATE} element={<CreateQuiz />} />
                            <Route path={APP_ROUTING_PATHS.ADD_QUESTION + '/:idQuiz'} element={<AddQuestion />} />
                            <Route path={APP_ROUTING_PATHS.ALL_QUIZZES} element={<List />} />
                            <Route path={APP_ROUTING_PATHS.VOTE + '/:idQuiz'} element={<Quiz />} />
                            <Route path={APP_ROUTING_PATHS.RESULTS + '/:idQuiz'} element={<Results />} />
                            <Route path="*" element={<Navigate to={APP_ROUTING_PATHS.REDIRECT} replace />} />
                        </Route>
                    </Routes>
                </I18Provider>
            </Suspense>
        </div>
    );
}

export default App;
