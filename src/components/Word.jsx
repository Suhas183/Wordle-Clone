import React from "react";

export default function Word(props){

    const styles = props.submitted ? 
                   props.isNotPresent ?
                   {backgroundColor : "#787C7E",
                    border: "none",
                    color: "white"} :

                   props.incorrectPosition ?
                   {backgroundColor : "#C9B458",
                    border: "none",
                    color: "white"} :

                   {backgroundColor : "#6AAA64",
                    border: "none",
                    color: "white"} :

                   {backgroundColor : "#FFFFFF"}

    return(
        <div className={props.value ? "Selected" : "notSelected"} style={styles}>{props.value}</div>
    )
}