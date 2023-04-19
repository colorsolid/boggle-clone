import diceData from "../dice.json";
import React from "react";


interface GridProps {
    lettersHidden: boolean,
    diceOrder: number[],
    diceSides: number[]
    diceRotations: number[]
    rotationEnabled: boolean
    gameOver: boolean,
}

export function Grid(props: GridProps) {
    return (
        <div className={`grid ${props.gameOver ? 'game-over' : ''} ${props.lettersHidden ? 'hidden' : ''}`}>
            {
                diceData.map((die, index) => {
                    const letter = diceData[props.diceOrder[index]][props.diceSides[index]];

                    return (
                        <React.Fragment>
                            <div
                                className={
                                    `die 
                                    ${!props.lettersHidden && props.rotationEnabled && ['m', 'n', 'w', 'z'].includes(letter) ? 'underline' : ''}`
                                }>
                                <div className={'container'}>
                                    <div
                                        className={
                                            `hidden-symbol 
                                            ${props.lettersHidden ? '' : 'o-0'} 
                                            r-${props.diceRotations[index]}`
                                        }>
                                        {
                                            '.'
                                        }
                                    </div>
                                    <div
                                        className={
                                            `unhidden-symbol 
                                            ${props.lettersHidden ? 'o-0' : ''} 
                                            ${props.rotationEnabled ? 'r-' + props.diceRotations[index] : 'r-0'}`
                                        }>
                                        {
                                            letter
                                        }
                                    </div>
                                </div>
                            </div>
                            {(index + 1) % 4 === 0 && <br/>}
                        </React.Fragment>
                    );
                })
            }
        </div>
    );
}