import { Container } from "nes-react";
import {UserProfileContext} from '../../src/providers/UserProfileProvider'
import {ItemContext} from '../../src/providers/ItemProvider'
import React, {useContext, useState, useEffect} from "react";


const Home = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
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
                            <button>{item.name}</button>
                        )
                    })
                }
            </Container>
        </Container>
        
    )
}

export default Home;