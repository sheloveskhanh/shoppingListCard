// App.js
import React, { useState } from 'react';
import ShoppingListCard from './components/ShoppingListCard';
import './App.css';

const App = () => {
  const [shoppingCards, setShoppingCards] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');


  const translations = {
    en: {
      appTitle: 'React Shopping List App',
      addCard: 'Add Shopping Card',
      switchArchive: 'Switch Archive',
      switchViewMode: 'Switch View Mode',
      switchLanguage: 'Switch to Czech',
    },
    cz: {
      appTitle: 'React Nakupovací Seznam',
      addCard: 'Přidat nákupní kartu',
      switchArchive: 'Přepnout archiv',
      switchViewMode: 'Přepnout zobrazení',
      switchLanguage: 'Switch to English',
    },
  };
  
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'cz' : 'en'));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addShoppingCard = () => {
    if (newCardName.trim() !== '') {
      const newCard = {
        id: Date.now(),
        name: newCardName,
        archived: false,
      };

      setShoppingCards((prevCards) => [...prevCards, newCard]);
      setNewCardName('');
    }
  };

  const editShoppingCard = (id, updatedCard) => {
    setShoppingCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? updatedCard : card))
    );
  };

  const deleteShoppingCard = (id) => {
    setShoppingCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const toggleArchive = (id, shouldArchive) => {
    setShoppingCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, archived: shouldArchive } : card
      )
    );
  };

  const toggleArchiveFilter = () => {
    setShowArchived(!showArchived);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'tiles' : 'list'));
  };

  const filteredShoppingCards = showArchived
    ? shoppingCards.filter((card) => !card.archived)
    : shoppingCards.filter((card) => card.archived);

   return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>{translations[language].appTitle}</h1>

      <div className="form-container">
        <h2>{translations[language].addCard}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addShoppingCard();
          }}
        >
          <input
            type="text"
            placeholder={translations[language].enterCardName}
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          />
          <button type="submit">{translations[language].addCard}</button>
        </form>

       
        <div className="archive-dropdown">
          <label>{translations[language].switchArchive}</label>
          <select
            onChange={() => toggleArchiveFilter()}
            value={showArchived ? 'archived' : 'unarchived'}
          >
            <option value="unarchived">{translations[language].unarchived}</option>
            <option value="archived">{translations[language].archived}</option>
          </select>
        </div>

        
        <button onClick={toggleViewMode} className="toggle-view-button">
          {translations[language].switchViewMode}
        </button>
      </div>

      <div className={`shopping-cards-container ${viewMode}`}>
        {filteredShoppingCards.map((card) => (
          <ShoppingListCard
            key={card.id}
            card={card}
            editShoppingCard={editShoppingCard}
            deleteShoppingCard={deleteShoppingCard}
            toggleArchive={toggleArchive}
          />
        ))}
      </div>

    
      <button onClick={toggleLanguage} className="toggle-language-button">
        {translations[language].switchLanguage}
      </button>
    </div>
  );
};

export default App;
