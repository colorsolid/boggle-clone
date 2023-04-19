import React from "react";


interface TimerProps {
    timerStartTime: number,
    timeRemaining: number,
    timerRunning: boolean,
    timerVisible: boolean
}

export function Timer(props: TimerProps) {
    return (
        <div className={`timer ${props.timerVisible ? '' : 'hidden-timer'}`}>
            <div
                className={
                    ` 
                ${!props.timerRunning && props.timeRemaining !== props.timerStartTime ? 'blink' : ''}`
                }>
                {new Date(props.timeRemaining * 1000).toISOString().substring(14, 19)}
            </div>
        </div>
    );
}