import { Container } from "nes-react";
import {UserProfileContext} from '../../src/providers/UserProfileProvider'
import {ItemContext} from '../../src/providers/ItemProvider'
import {UserItemContext} from '../../src/providers/UserItemProvider'
import React, {useContext, useState, useEffect} from "react";
import './Home.css';
import { Progress } from 'reactstrap';

const Home = () => {
    const { getUserProfileById, updateUserCharacter, getLeaderboard } = useContext(UserProfileContext);
    const { getUserItems } = useContext(ItemContext);
    const { deleteUserItem } = useContext(UserItemContext);
    const [currentUser, setCurrentUser] = useState({})
    const [userItems, setUserItems] = useState([])
    const [minorPotionItems, setMinorPotionItems] = useState([])
    const [majorPotionItems, setMajorPotionItems] = useState([])
    const [fullPotionItems, setFullPotionItems] = useState([])
    const [leaderboard, setLeaderboard] = useState([])
    const [heroAction, setHeroAction] = useState()

    useEffect(() => {
 
        getUserProfileById()
            .then(setCurrentUser)
            .then(getLeaderboard)
                .then(setLeaderboard)
        
    },[])

    useEffect(() => {
        if(currentUser.id !== undefined)
        {
            setHeroAction(currentUser.characterImage.imageLocation)
            getUserItems(currentUser.id)
                .then(setUserItems)
        }
    },[currentUser])

    useEffect(() => {
        if(userItems.length > 0)
        {
            const minorPotions = userItems.filter(mp => mp.id === 1)
            setMinorPotionItems(minorPotions)
            const majorPotions = userItems.filter(mp => mp.id === 2)
            setMajorPotionItems(majorPotions)
            const fullPotions = userItems.filter(mp => mp.id === 3)
            setFullPotionItems(fullPotions)
        }
    }, [userItems])

    const userItem = (item) => {
        setHeroAction('/characters/Guy1UseItem.gif')

        setTimeout(() => { 
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
            setHeroAction(currentUser.characterImage.imageLocation) }, 900);
    }

    let rank = 1;


    return (
        <>
        <div className="homeContainer">
            <img className="studyHero" src={heroAction} alt="Player hero"></img>
            
            <table className="leaderboard">
                <thead className="thead-leaderboard">
                    <tr className="tr-leaderboard">
                        <th className="th-leaderboard">Rank</th>
                        <th className="th-leaderboard">Username</th>
                        <th className="th-leaderboard">Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboard.map(l => {
                            return (
                            
                            <tr className="tr-leaderboard" key={l.id}>
                                <td className="td-leaderboard"><b>{rank++}</b></td>
                                <td className="td-leaderboard">{l.userName}</td>
                                <td className="td-leaderboard">{l.experience}</td>
                            </tr>
                        )})
                    }
                </tbody>     
            </table>
        </div>

        <div className="footerContainer">
            <img className="studyHero" src={heroAction} alt="Player hero"></img>              
            <Container className="heroFooterRight">
                
                    <div className="textPosition">
                        <text className="textSizer">
                        <b>Items:</b>
                        {minorPotionItems.length >= 1 ?
                            <button className="inventoryButton nes-btn is-error" onClick={() => userItem(minorPotionItems[0])}>{minorPotionItems[0]?.name} x{minorPotionItems?.length}</button>

                        :
                            null
                        }

                        {majorPotionItems.length >= 1 ?
                            <button className="inventoryButton nes-btn is-error" onClick={() => userItem(majorPotionItems[0])}>{majorPotionItems[0]?.name} x{majorPotionItems?.length}</button>
                        :
                            null
                        }
                        {fullPotionItems.length >= 1 ?
                            <button className="inventoryButton nes-btn is-error" onClick={() => userItem(fullPotionItems[0])}>{fullPotionItems[0]?.name} x{fullPotionItems?.length}</button>
                        :
                            null
                        }
                        </text>
                    
                </div>
            </Container>
            <Container className="heroFooterLeft is-dark">
                
                <div className="footerStyle textSizer">
                    <div className="textPosition">  
                        
                        <text className="textSizer">
                            <h5 className="textSizer">{currentUser?.userName} - Level {currentUser.level}</h5>
                            <b>HP:</b> {'  '}
                            <Progress className="progressBars" multi>
                                <Progress bar color="success" value={currentUser.hp}>{currentUser.hp} / {currentUser.maxHP} HP</Progress>
                                <Progress bar animated color="danger" value={currentUser.maxHP - currentUser.hp}></Progress>
                            </Progress> 
                            <b>EXP:</b> {' '}
                            <Progress className="progressBars" multi>
                                <Progress bar color="info" value={currentUser.experience}>
                                    {currentUser.experience === 0 ?
                                        null
                                    :
                                        <div>{currentUser.experience} / {currentUser.expToNextLevel}</div>
                                    }
                                </Progress>
                                <Progress bar animated color="warning" value={currentUser.expToNextLevel - currentUser.experience}></Progress>
                            </Progress>
                        </text>
                    </div>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Home;