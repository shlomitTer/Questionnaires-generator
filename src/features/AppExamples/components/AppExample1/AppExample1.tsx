import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../app/store';
import { useApiData } from '../../../../shared/hooks/useApiData';

export const AppExample1 = () => {
    const { asyncData } = useAppSelector((store) => store.sharedStoreReducer);
    const { t } = useTranslation();

    // dispatch async events in other components and react to the fulfilled/pending/reject event in other component, similar to rxjs subscription
    useApiData(asyncData, {
        onFulfilled: (data) => {
        },
    });

    return (
        <div className="app-example-container">
            {!!asyncData && (
                <>
                    <h1>{asyncData.data?.header}</h1>
                    <p>{asyncData.data?.content}</p>
                    <p>
                        <strong>Translation test: </strong> {t('test')}
                    </p>
                </>
            )}
        </div>
    );
};
