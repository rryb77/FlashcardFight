import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import FlashCardForm from "./flashcardsets/FlashCardForm"
import QuestionForm from "./questions/QuestionForm"
import FlashCardList from "./flashcardsets/FlashCardList"
import FlashCardUserList from "./flashcardsets/FlashCardUserList";
import StudySet from "./studysets/StudySet";
import StudyResults from "./studysets/StudyResults";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/create/questions">
          <QuestionForm/>
        </Route>

        <Route path="/create" exact>
          <FlashCardForm/>
        </Route>

        <Route path="/flashcards">
          <FlashCardList/>
        </Route>

        <Route path="/mysets">
          <FlashCardUserList/>
        </Route>
        
        <Route path="/study/:id" exact>
          <StudySet/>
        </Route>

        <Route path="/study/:id/results">
          <StudyResults/>
        </Route>
      </Switch>
    </main>
  );
};