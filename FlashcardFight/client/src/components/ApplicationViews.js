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
import BattleSet from "./battlesets/BattleSet";
import StudyResults from "./studysets/StudyResults";
import BattleResults from "./battlesets/BattleResults";
import FlashCardEdit from "./flashcardsets/FlashCardEdit";

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

        <Route path="/flashcards" exact>
          <FlashCardList/>
        </Route>

        <Route path="/flashcards/details/:id">
          <FlashCardEdit/>
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

        <Route path="/battle/:id" exact>
          <BattleSet/>
        </Route>

        <Route path="/battle/:id/results">
          <BattleResults/>
        </Route>

      </Switch>
    </main>
  );
};