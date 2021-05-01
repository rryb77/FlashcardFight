import React, { useContext, useEffect, useState } from "react";
import { FlashCardSetContext } from '../../providers/FlashCardSetProvider';
import FlashCard from "./FlashCard";

const FlashCardUserList = () => {
  const { flashcards, setFlashcards, getAllUserFlashcards } = useContext(FlashCardSetContext);

  useEffect(() => {
    getAllUserFlashcards().then(setFlashcards)
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

export default FlashCardUserList;