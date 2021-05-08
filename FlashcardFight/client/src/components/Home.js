import { Container } from "nes-react";
import {UserProfileContext} from '../../src/providers/UserProfileProvider'
import {ItemContext} from '../../src/providers/ItemProvider'
import {UserItemContext} from '../../src/providers/UserItemProvider'
import React, {useContext, useState, useEffect} from "react";
import './Home.css';


const Home = () => {
    const { getUserProfileById, updateUserCharacter } = useContext(UserProfileContext);
    const { getUserItems } = useContext(ItemContext);
    const { deleteUserItem } = useContext(UserItemContext);
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
            .then(() => deleteUserItem(item.userItemId))
            .then(getUserProfileById)
            .then(setCurrentUser)
    }

    return (
        <>
        <div className="homeContainer">
            <img className="studyHero" src={currentUser?.characterImage?.imageLocation} alt="Player hero"></img>        
        </div>

        <div className="footerContainer">
            <img className="studyHero" src={currentUser?.characterImage?.imageLocation} alt="Player hero"></img>              
            <Container className="heroFooterRight is-dark">
                <div className="footerStyle textSizer">
                    <div className="textPosition">
                        <text className="textSizer">
                        <b>Items:</b>
                        {
                            userItems.map(item => {
                                return (
                                    <button className="nes-btn" onClick={() => userItem(item)}>{item.name}</button>
                                )
                            })
                        }
                        </text>
                    </div>
                </div>
            </Container>
            <Container className="heroFooterLeft is-dark">
                
                <div className="footerStyle textSizer">
                    <div className="textPosition">  
                        
                        <text className="textSizer">
                            <h5 className="textSizer">{currentUser?.userName}</h5>
                            <b>HP:</b> {'  '} {currentUser.hp} <br></br>
                            <b>EXP:</b>  {currentUser.experience} <br></br>
                            <b>Level:</b>  {currentUser.level}
                        </text>
                    </div>
                </div>
            </Container>
        </div>
        {/* <div className="footerContainer">
            <Container className="heroFooterRight footerStyle is-dark">
            <b>Items:</b>
                {
                    userItems.map(item => {
                        return (
                            <button className="nes-btn" onClick={() => userItem(item)}>{item.name}</button>
                        )
                    })
                }
            </Container>
            <Container className="heroFooterLeft is-dark">
                <b>HP:</b> {'  '} {currentUser.hp} <br></br>
                <b>EXP:</b>  {currentUser.experience} <br></br>
                <b>Level:</b>  {currentUser.level}
            </Container>
        
        </div> */}
        </>
    )
}

export default Home;