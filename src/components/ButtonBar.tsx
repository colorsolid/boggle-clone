import die from "../images/die.svg";
import arrow from "../images/arrow.svg";
import checked2 from "../images/checked2.svg";
import unchecked from "../images/unchecked.svg";
import React from "react";


interface ButtonBarProps {
    roll: () => void,
    rolling: boolean,
    timerRunning: boolean,
    timerStartAndPause: () => void,
    gameOver: boolean,
    rotationEnabled: boolean,
    toggleRotation: () => void,
    timerVisible: boolean,
    toggleTimerVisible: () => void
}

export function ButtonBar(props: ButtonBarProps) {
    return (
        <div className={'button-bar'}>
            <div className={'d-none'}>
                <img src={unchecked} alt={'Disabled'} className={'icon'}/>
            </div>
            <div>
                <button disabled={props.timerRunning} className={props.rolling ? 'active' : ''} onClick={() => {
                    props.roll();
                }}>
                    {props.rolling ?
                        <div className="bars-10"></div> :
                        <img src={die} alt="roll"/>}
                </button>
                <button disabled={props.gameOver} className={props.timerRunning ? 'active' : ''} onClick={() => {
                    props.timerStartAndPause();
                }}>
                    {props.timerRunning ? <div className="hypnotic-8"></div> : <img src={arrow} alt="start"/>}
                </button>
            </div>
            <div>
                <button className={`small ${props.rotationEnabled ? 'active' : ''}`} onClick={() => {
                    props.toggleRotation();
                }}>
                    {props.rotationEnabled && <img src={checked2} alt={'Enabled'} className={'icon'}/>}
                    {!props.rotationEnabled && <img src={unchecked} alt={'Disabled'} className={'icon'}/>}
                    <span className={'text'}>Rotate Letters</span>
                </button>
                <button className={`small ${props.timerVisible ? 'active' : ''}`} onClick={() => {
                    props.toggleTimerVisible();
                }}>
                    {props.timerVisible && <img src={checked2} alt={'Enabled'} className={'icon'}/>}
                    {!props.timerVisible && <img src={unchecked} alt={'Disabled'} className={'icon'}/>}
                    <span className={'text'}>Show Timer</span>
                </button>
            </div>
        </div>
    );
}