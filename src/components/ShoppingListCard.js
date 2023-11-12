// components/ShoppingListCard.js
import React, { useState } from 'react';

const ShoppingListCard = ({ card, editShoppingCard, deleteShoppingCard, toggleArchive }) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(card.name);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedName(card.name);
  };

  const handleSaveEdit = () => {
    editShoppingCard(card.id, { ...card, name: editedName });
    setEditing(false);
  };

  const handleDeleteClick = () => {
    deleteShoppingCard(card.id);
  };

  const handleArchiveClick = () => {
    toggleArchive(card.id, !card.archived);
  };

  return (
    <div className={`shopping-card ${card.archived ? 'archived' : ''}`}>
      <div className="card-content">
        <div className="card-header">
          {editing ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <h3>{card.name}</h3>
          )}
        </div>
        <div className="action-buttons">
          <button onClick={handleEditClick}>Edit</button>
          <button
            onClick={handleArchiveClick}
            className={card.archived ? 'archive-button archived' : 'archive-button'}
          >
            {card.archived ? 'Unarchive' : 'Archive'}
          </button>
          <button onClick={handleDeleteClick} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;
