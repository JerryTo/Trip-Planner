import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBusinessTime, faGlobeAmericas, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import * as dateFunctions from "../Utility Functions/DateFunctions";

// Trip item shown in the middle column
export default function TripItem(props) {
    const businessIcon = <FontAwesomeIcon icon={faBusinessTime} className="icon"/>;
    const vacationIcon = <FontAwesomeIcon icon={faGlobeAmericas} className="icon"/>;

    const categoryIcon = props.category === "Business" ? businessIcon :
        props.category === "Vacation" ? vacationIcon : "";
    const categoryClass = props.category === "None" ? " hidden" : "";

    let lengthOfTrip = dateFunctions.tripDuration(props.startDate, props.endDate);
    return (
        <div className="cardBlock" onClick={props.handleClick}>
            <div className="cardBlockTitle">{props.title}</div>
            <div className="cardBlockInner">
                <ProgressBar todoList={props.todoList}/>
                <div className="cardBlockLeft">
                    <div className="cardBlockCategory hideWhenBig"><FontAwesomeIcon className="icon"
                                                                                    icon={faMapMarkerAlt}/>{props.destination}
                    </div>
                    <div className={"cardBlockCategory" + categoryClass}>{categoryIcon}{props.category}</div>
                    <div className="cardBlockCategory"><FontAwesomeIcon className="icon"
                                                                        icon={faClock}/><span
                        className="hideWhenSmall">Duration: </span>{lengthOfTrip} days
                    </div>
                </div>
                <div className="cardBlockDestination hideWhenSmall">{props.destination}</div>
            </div>
        </div>
    );
}