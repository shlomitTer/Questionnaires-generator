import { FunctionComponent, PropsWithChildren, useCallback, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useAppSelector } from '../../app/store';
import i18n from './i18n';

export const I18Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const { languageCode } = useAppSelector((store) => store.sharedStoreReducer);

    const initI18Next = useCallback((lng: string): void => {
        i18n.init({
            debug: false,
            lng: lng || 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            backend: {
                loadPath: './locales/{{lng}}.json',
            },
            react: {
                useSuspense: true,
            },
        });
    }, []);

    useEffect(() => {
        initI18Next(languageCode);
    }, [languageCode, initI18Next]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
