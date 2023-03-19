import React from "react";

export default function Letter(props)
{
    const styles = props.submitted ? 
                   props.isNotPresent ?
                   {backgroundColor : "#787C7E",
                    color: "white"} :

                   props.incorrectPosition ?
                   {backgroundColor : "#C9B458",
                    color: "white"} :

                   {backgroundColor : "#6AAA64",
                    color: "white"} :

                   {backgroundColor : "#D3D6DA"}

    return(<button className={props.class} onClick={() => props.handleClick(props.value)} style={styles}>{props.value}</button>)
}