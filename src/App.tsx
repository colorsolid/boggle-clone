import './App.css';
import React, {useEffect, useState} from 'react';

import {ButtonBar} from './components/ButtonBar';
import {Timer} from './components/Timer';
import {Grid} from './components/Grid';

const TIMER_START_TIME = 180;

function App() {
    const [lettersHidden, setLettersHidden] = useState(true);
    const [diceOrder, setDiceOrder] = useState(populateDice());
    const [diceSides, setDiceSides] = useState(Array(16).fill(0));
    const [diceRotations, setDiceRotations] = useState(Array(16).fill('0'));
    const [timeRemaining, setTimeRemaining] = useState(TIMER_START_TIME);
    const [timerStart, setTimerStart] = useState<number | null>(null);
    const [timeRemainingAtStart, setTimeRemainingAtStart] = useState(TIMER_START_TIME);
    const [rolling, setRolling] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [rotationEnabled, setRotationEnabled] = useState(true);
    const [timerVisible, setTimerVisible] = useState(true);

    const rollClick = () => {
        if (timeRemaining !== TIMER_START_TIME && timeRemaining !== 0) {
            const continueRoll = window.confirm('The game is not complete. Reset timer and roll dice anyway?');
            if (!continueRoll) {
                return;
            }
        }
        setRolling(!rolling);
    }

    const rollDice = () => {
        setDiceOrder(randomDiceOrder());
        setDiceSides(randomDiceSides());
        setDiceRotations(randomDiceRotations());
        setTimerStart(null);
        setTimeRemaining(TIMER_START_TIME);
        setGameOver(false);
        setLettersHidden(true);
    }

    const randomDiceOrder = () => {
        return diceOrder
            .map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value);
    }

    const randomDiceSides = () => {
        return [...Array(16)].map(e => ~~(Math.random() * 6));
    }

    const randomDiceRotations = () => {
        return [...Array(16)].map(e => ~~(Math.random() * 7));
    }

    const timerStartAndPause = () => {
        if (timerStart !== null) {
            // pause
            setTimerStart(null);
            setLettersHidden(true);
        } else {
            // play
            setLettersHidden(false);
            setRolling(false);
            setTimeRemainingAtStart(timeRemaining);
            setTimerStart(Date.now());
        }
    }

    // game timer is started
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerStart !== null && timeRemaining > 0) {
                const time = Math.ceil(((timeRemainingAtStart * 1000) - (Date.now() - timerStart!)) / 1000);
                setTimeRemaining(time);
                if (time <= 0) {
                    clearInterval(interval);
                    setGameOver(true);
                    setTimerStart(null);
                }
            }
        }, 200);
        return () => clearInterval(interval);
    }, [timerStart]);

    // dice are rolling
    useEffect(() => {
        const interval = setInterval(() => {
            if (rolling) {
                rollDice();
            }
        }, 500);
        return () => clearInterval(interval);
    }, [rolling])

    useEffect(() => {
        rollDice();
    }, [])

    return (
        <div>
            <ButtonBar
                roll={rollClick}
                rolling={rolling}
                timerRunning={!(timerStart === null)}
                timerStartAndPause={timerStartAndPause}
                gameOver={gameOver}
                rotationEnabled={rotationEnabled}
                toggleRotation={() => {
                    setRotationEnabled(!rotationEnabled)
                }}
                timerVisible={timerVisible}
                toggleTimerVisible={() => {
                    setTimerVisible(!timerVisible);
                }}
            />
            <Timer
                timerStartTime={TIMER_START_TIME}
                timeRemaining={timeRemaining}
                timerRunning={!(timerStart === null)}
                timerVisible={timerVisible}
            />
            <Grid
                lettersHidden={lettersHidden}
                diceOrder={diceOrder}
                diceSides={diceSides}
                diceRotations={diceRotations}
                rotationEnabled={rotationEnabled}
                gameOver={gameOver}
            />
        </div>
    );
}

const populateDice = () => {
    const diceArray = Array(16).fill(null);
    return diceArray.map((_, i) => i);
}

export default App;
