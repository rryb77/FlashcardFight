import { Container } from "nes-react";
import {UserProfileContext} from '../../src/providers/UserProfileProvider'
import {ItemContext} from '../../src/providers/ItemProvider'
import React, {useContext, useState, useEffect} from "react";


const Home = () => {
    const { getUserProfileById, updateUserCharacter } = useContext(UserProfileContext);
    const { getUserItems } = useContext(ItemContext);
    const [currentUser, setCurrentUser] = useState({})
    const [userItems, setUserItems] = useState([])

    useEffect(() => {
        getUserProfileById()
            .then(setCurrentUser)
    },[])

    useEffect(() => {
        if(currentUser.id !== undefined)
        {
            getUserItems(currentUser.id)
                .then(setUserItems)
        }
    },[currentUser])

    const userItem = (item) => {
        console.log(currentUser)

        let newHp = currentUser.hp + item.hpBoost
        if(newHp > currentUser.maxHP)
        {
            newHp = currentUser.maxHP
        }

        currentUser.hp = newHp
        updateUserCharacter(currentUser)
            .then(getUserProfileById)
            .then(setCurrentUser)
    }

    return (
        
        <Container className="heroContainer">
            <img className="playerHero" src={currentUser?.characterImage?.imageLocation} alt="Player hero"></img>
            <Container>
                <b>HP:</b> {currentUser.hp} <br></br>
                <b>EXP:</b> {currentUser.experience} <br></br>
                <b>Level:</b> {currentUser.level}
            </Container>

            <Container>
                <b>Items:</b>
                {
                    userItems.map(item => {
                        return (
                            <button onClick={() => userItem(item)}>{item.name}</button>
                        )
                    })
                }
            </Container>
        </Container>
        
    )
}

export default Home;