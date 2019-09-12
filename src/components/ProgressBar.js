import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import React from "react";

// Progress bar based on the amount of completed tasks
export default function ProgressBar(props) {
    let tasksCompleted = props.todoList.filter((obj) => obj.complete === "true").length;
    let tasksAll = props.todoList.length;

    let stateCreated = !tasksCompleted && tasksAll;
    let stateReady = tasksCompleted === tasksAll;
    let stateInProgress = !stateCreated && !stateReady;

    let node1Icon;
    let node2Icon;
    let node3Icon;

    if (stateCreated) {
        node1Icon = faExclamationCircle;
        node2Icon = faCircle;
        node3Icon = faCircle;
    } else if (stateReady) {
        node1Icon = faCheckCircle;
        node2Icon = faCheckCircle;
        node3Icon = faCheckCircle;
    } else {
        node1Icon = faCheckCircle;
        node2Icon = faExclamationCircle;
        node3Icon = faCircle;
    }

    function getColor(icon) {
        switch (icon) {
            case faCheckCircle:
                return "green";
            case faExclamationCircle:
                return "yellow";
            case faCircle:
                return "lightgray";
            default:
                return "";
        }
    }

    let progressBarLineClass1 = "hideWhenMedium progressBarLine " + (node2Icon !== faCircle ? " green" : "");
    let progressBarLineClass2 = "progressBarLine hideWhenMedium" + (node3Icon === faCheckCircle ? " green" : "");
    let node1Class = "progressIcon" + (stateCreated ? "" : " hideWhenMedium");
    let node2Class = "progressIcon" + (stateInProgress ? "" : " hideWhenMedium");
    let node3Class = "progressIcon" + (stateReady ? "" : " hideWhenMedium");

    let node1TextClass = "progressBarText" + (stateCreated ? " strong" : "");
    let node2TextClass = "progressBarText" + (stateInProgress ? " strong" : "");
    let node3TextClass = "progressBarText" + (stateReady ? " strong" : "");

    return (
        <div className="progressBarContainer cardBlockTopRight">
            <div className="progressBarHeader">Completed Tasks: {tasksCompleted}/{tasksAll}</div>
            <div className={node1Class}>
                <FontAwesomeIcon icon={node1Icon} className={"progressBarCircle " + getColor(node1Icon)}/>
                <span className={node1TextClass}>Created</span>
            </div>

            <div className={progressBarLineClass1}/>

            <div className={node2Class}>
                <FontAwesomeIcon icon={node2Icon} className={"progressBarCircle " + getColor(node2Icon)}/>
                <span
                    className={node2TextClass}>In Progress</span>
            </div>

            <div className={progressBarLineClass2}/>

            <div className={node3Class}>
                <FontAwesomeIcon icon={node3Icon} className={"progressBarCircle " + getColor(node3Icon)}/>
                <span className={node3TextClass}>Ready</span></div>
        </div>
    )
}