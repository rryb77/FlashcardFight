import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import {CategoryProvider} from "./providers/CategoryProvider";
import {DifficultyProvider} from "./providers/DifficultyProvider";
import {QuestionProvider} from "./providers/QuestionProvider";
import {AnswerProvider} from "./providers/AnswerProvider";
import {FlashCardSetProvider} from "./providers/FlashCardSetProvider"

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <FlashCardSetProvider>
          <CategoryProvider>
            <DifficultyProvider>
              <QuestionProvider>
                  <AnswerProvider>
                    <Header />
                    <ApplicationViews />
                  </AnswerProvider>
                </QuestionProvider>
            </DifficultyProvider>
          </CategoryProvider>
        </FlashCardSetProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
