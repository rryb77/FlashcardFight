import React, { useContext, useEffect, useState } from "react";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import FlashCard from "./FlashCard";

const FlashCardList = () => {
  const { flashcards, setFlashcards, getAllFlashcards } = useContext(FlashCardSetContext);

  useEffect(() => {
    getAllFlashcards().then(setFlashcards)
  }, []);

  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                {
                    flashcards.map((flashcard) => (
                        <FlashCard key={flashcard.id} flashcard={flashcard} />
                    ))
                }
                </div>
            </div>
        </div>
    </>
  );
};

export default FlashCardList;