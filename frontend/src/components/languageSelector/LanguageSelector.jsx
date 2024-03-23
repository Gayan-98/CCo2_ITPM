import React from 'react';
import './languageSelector.scss';
import { LANGUAGE_VERSIONS } from '../../data';

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="language-selector-container">
      <div className="language-selector-label">
        Language:
      </div>
      <div className="language-selector-menu">
        <button className="language-selector-button">{language}</button>
        <ul className="language-selector-list">
          {languages.map(([lang, version]) => (
            <li
              key={lang}
              className={`language-selector-item ${lang === language ? 'active' : ''}`}
              onClick={() => onSelect(lang)}
            >
              {lang} <span className="language-selector-version">({version})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
