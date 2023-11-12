// App.js
import React, { useState } from 'react';
import ShoppingListCard from './components/ShoppingListCard';
import './App.css';

const App = () => {
  const [shoppingCards, setShoppingCards] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [viewMode, setViewMode] = useState('list');

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
    <div className="app">
      <h1>React Shopping List App</h1>

      {/* Shopping Card Form */}
      <div className="form-container">
        <h2>Add Shopping Card</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addShoppingCard();
          }}
        >
          <input
            type="text"
            placeholder="Enter card name"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          />
          <button type="submit">Add Card</button>
        </form>

        {/* Archive Dropdown */}
        <div className="archive-dropdown">
          <label>Show: </label>
          <select
            onChange={() => toggleArchiveFilter()}
            value={showArchived ? 'archived' : 'unarchived'}
          >
            <option value="unarchived">Unarchived</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Toggle View Mode Button */}
        <button onClick={toggleViewMode} className="toggle-view-button">
          {viewMode === 'list' ? 'Switch to Tiles' : 'Switch to List'}
        </button>
      </div>

      {/* Render the shopping cards */}
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
    </div>
  );
};

export default App;
