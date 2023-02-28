import React from 'react';
import { useAppDispatch } from '../../app/store';
import { i18LanguageCode } from '../../shared/i18/i18n.codes';
import { setLanguageCode } from '../../shared/store/shared.store';
import './LanguageSelector.scss';

export const LanguageSelector = () => {
    const dispatcher = useAppDispatch();
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatcher(setLanguageCode(e.target.value as i18LanguageCode));
    };

    return (
        <div className="language-selector-container">
            <label htmlFor="langSelector">Select Language</label>
            <select name="language-selector" id="langSelector" defaultValue={'en'} onChange={handleOnChange}>
                <option value="en">English</option>
                <option value="de">German</option>
            </select>
        </div>
    );
};
