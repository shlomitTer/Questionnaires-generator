import { notification } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../comps/footer/Footer';
import Header from '../../comps/header/Header';
import { LanguageSelector } from '../../features/LanguageSelector/LanguageSelector';
import { useAppSelector } from '../store';
import './AppLayout.scss';

export const AppLayout: FunctionComponent = () => {
    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)
    const quizError = useAppSelector(state => state.quizSlice.error);
    const { newQuestionId } = useAppSelector(state => state.questionSlice);
    const { newQuizId } = useAppSelector(state => state.quizSlice);
    const questionError = useAppSelector(state => state.questionSlice.error);

    useEffect(() => {
        if (quizError.code > 0)
            notification.error({
                placement: 'topLeft',
                message: 'ERROR',
                description: quizError.message,
            });
        else if (questionError.code > 0)
            notification.error({
                placement: 'topLeft',
                message: 'ERROR',
                description: questionError.message,
            });
    }, [quizError, questionError])

    useEffect(() => {
        if (newQuestionId > 0)
            notification.success({
                placement: 'topLeft',
                message: 'SUCCESS',
                description: "The question has been successfully added",
            });
        else if (newQuizId > 0)
            notification.success({
                placement: 'topLeft',
                message: 'SUCCESS',
                description: "The quiz has been successfully added",
            });

    }, [newQuestionId, newQuizId])
    return (
        <div className="layout-container" onClick={() => {
            setIsActiveMenu(false)
        }}>
            <Header setIsActiveMenu={setIsActiveMenu} isActiveMenu={isActiveMenu} />
            <div className="main-layout">
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};
