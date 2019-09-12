import ModalConfirm from "./modal/ModalConfirm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import {faCheckCircle, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

import TaskItemTableRows from './TaskItemTableRows';
import * as utils from "../Utility Functions/UtilityFunctions";

export default function TripForm(props) {
    const [taskItem, setTaskItem] = useState("");
    const [taskItemKey, setTaskItemKey] = useState(null);
    const [taskInputClass, setTaskInputClass] = useState("hidden");
    const [modalClass, setModalClass] = useState("hidden");
    let rightColumnClass = props.showForm ? "rightColumnActive" : "";

    let data = {
        "id": props.formValues.key,
        "title": props.formValues.title,
        "destination": props.formValues.destination,
        "description": props.formValues.description,
        "category": props.formValues.category,
        "startDate": props.formValues.startDate,
        "endDate": props.formValues.endDate,
        "reminderDate": props.formValues.reminderDate,
        "todo": props.todoValues
    };

    // Reset states. Used when cancelling out of the form
    function resetStates() {
        setTaskItem("");
        setTaskItemKey(null);
        setTaskInputClass("hidden");
        setModalClass("hidden");
    }

    // Saves the form. Adds new item to the list of trips
    function saveNewItem() {
        let allTrips = JSON.parse(localStorage["trips"]);
        allTrips.push(data);

        // Save data
        localStorage["trips"] = JSON.stringify(allTrips);

        // Clean up
        resetStates();
        props.exitForm();
    }

    // Updates the form. Updates existing item
    function editItem() {
        let allTrips = JSON.parse(localStorage["trips"]);
        let index = allTrips.findIndex(item => item.id === props.formValues.key);

        // Replace item in array
        allTrips.splice(index, 1, data);

        // Save data
        localStorage["trips"] = JSON.stringify(allTrips);

        // Clean up
        props.exitForm();
    }

    // Deletes form item. Doesn't show for new items. Deletion persists only if saved
    function deleteItem() {
        let allTrips = JSON.parse(localStorage["trips"]);
        let index = allTrips.findIndex(item => item.id === props.formValues.key);

        // Delete item from array
        allTrips.splice(index, 1);

        // Save data
        localStorage["trips"] = JSON.stringify(allTrips);

        // Clean up
        setModalClass("hidden");
        props.exitForm();
    }

    function completeTodo(key) {
        let todoIndex = props.todoValues.findIndex(item => item.id === key);
        let allTrips = [...data["todo"]];

        // Toggle the 'complete' status of todo item
        allTrips[todoIndex]["complete"] = (allTrips[todoIndex]["complete"] === "false").toString();

        props.updateTodo(allTrips);
    }

    // Populate the 'Edit Task' input field
    function editTodo(key) {
        let todoIndex = props.todoValues.findIndex(item => item.id === key);
        let allTrips = [...data["todo"]];

        setTaskInputClass("");
        setTaskItemKey(key);
        setTaskItem(allTrips[todoIndex]["task"]);
    }

    function deleteTodo(key) {
        let todoIndex = props.todoValues.findIndex(item => item.id === key);

        let allTrips = [...data["todo"]];
        allTrips.splice(todoIndex, 1);
        props.updateTodo(allTrips);
    }

    function addTodo() {
        let allTrips = [...data["todo"]];

        // Add New Todo Item
        if (!taskItemKey) {
            allTrips.push({
                "id": utils.generateNewKey(allTrips),
                "task": taskItem,
                "complete": "false"
            });
        } else { // Update existing Todo Item
            let todoIndex = props.todoValues.findIndex(item => item.id === taskItemKey);
            allTrips[todoIndex]["task"] = taskItem;
            props.updateTodo(allTrips);
        }

        // Clean up
        resetStates();

        props.updateTodo(allTrips);
    }


    const todoItems = props.todoValues.map((item) =>
        <TaskItemTableRows key={item.id} dataKey={item.id} title={item.task} complete={item.complete}
                           completeItem={() => completeTodo(item.id)}
                           editItem={() => editTodo(item.id)}
                           deleteItem={() => deleteTodo(item.id)}
        />
    );

    return (
        <div id="rightColumn" className={rightColumnClass}>
            <div className="wrapper">
                <ModalConfirm className={modalClass} confirmDialog={deleteItem} closeModal={() => setModalClass("hidden")}/>

                <FontAwesomeIcon icon={faTimesCircle} className="cancel" onClick={() => {
                    props.exitForm();
                    resetStates()
                }}/>
                <div className="outerBox">
                    <h1>{props.newItem ? "Add New Trip" : "Update Trip"}</h1>
                </div>

                <div className="inputBlock">
                    <label htmlFor="inputTitle">Title:</label>
                    <input type="text" className="inputWide" id="inputTitle" name="inputTitle" autoComplete="off"
                           value={props.formValues.title}
                           onChange={e => props.handleChange("title", e.target.value)}/>
                </div>

                <div className="inputBlock">
                    <label htmlFor="inputDestination">Destination:</label>
                    <input type="text" className="inputWide" id="inputDestination" name="inputDestination"
                           autoComplete="off"
                           value={props.formValues.destination}
                           onChange={e => props.handleChange("destination", e.target.value)}/>
                </div>

                <div className="inputBlock">
                    <label htmlFor="category">Category: </label>
                    <select id="category" name="category" value={props.formValues.category}
                            onChange={e => props.handleChange("category", e.target.value)}>
                        <option value="None">None</option>
                        <option value="Business">Business</option>
                        <option value="Vacation">Vacation</option>
                    </select>
                </div>

                <div className="inputBlock flex">
                    <div className="inputBlockFlexLeft">
                        <label htmlFor="startDate">Start Date:</label>
                        <DatePicker
                            selected={props.formValues.startDate}
                            onSelect={e => props.handleChange("startDate", e)}
                            minDate={new Date()}
                            endDate={props.formValues.endDate}
                            todayButton="Today"
                            id="startDate"
                            name="startDate"
                            className="inputShort"
                            autoComplete="off"
                            selectsStart
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <DatePicker
                            selected={props.formValues.endDate}
                            onSelect={e => props.handleChange("endDate", e)}
                            minDate={props.formValues.startDate}
                            todayButton="Today"
                            id="endDate"
                            name="endDate"
                            className="inputShort"
                            autoComplete="off"
                            selectsEnd
                        />
                    </div>
                </div>

                <div className="inputBlock">
                    <label htmlFor="reminderDate">Reminder Date:</label>
                    <DatePicker
                        selected={props.formValues.reminderDate}
                        onSelect={e => props.handleChange("reminderDate", e)}
                        // minDate={new Date()}        // Commented out to allow testing of the reminder modal
                        endDate={props.formValues.endDate}
                        todayButton="Today"
                        id="reminderDate"
                        name="reminderDate"
                        className="inputShort"
                        autoComplete="off"
                        selectsEnd
                    />
                </div>

                <div className="inputBlock">
                    <label htmlFor="inputDescription">Description:</label>
                    <textarea id="inputDescription" name="inputDescription" value={props.formValues.description}
                              onChange={e => props.handleChange("description", e.target.value)}/>
                </div>

                <div className="outerBox">
                    <h1>Tasks</h1>
                </div>

                <div>
                    <div className="bttn bttn-darkblue" onClick={() => {
                        setTaskItemKey(null);
                        setTaskInputClass("");
                    }}><FontAwesomeIcon icon={faPlus}/>Add Todo Item
                    </div>
                </div>

                <div className={"inputBlock flex " + taskInputClass}>
                    <div className="inputBlockFlexLeft">
                        <label htmlFor="inputTodoTask">Task:</label>
                        <input type="text" className="inputWide" id="inputTodoTask" name="inputTodoTask"
                               autoComplete="off"
                               value={taskItem}
                               onChange={e => setTaskItem(e.target.value)}/>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCheckCircle} className="taskConfirm" onClick={addTodo}/>
                    </div>
                </div>

                <div className="tableWrapper">
                    <table className={"todoItemTable" + (!props.todoValues.length ? " hidden" : "")}>
                        <thead>
                        <tr>
                            <th scope="col">Task</th>
                            <th scope="col">Complete</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todoItems}
                        </tbody>
                    </table>
                </div>


                <div id="rightColumnFooter">
                    <div>
                        <div className="bttn bttn-darkblue bttn-footer bttn-half"
                             onClick={props.newItem ? saveNewItem : editItem}><FontAwesomeIcon
                            icon={faSave}/>Save
                        </div>
                        <div className="bttn bttn-red bttn-footer bttn-quarter" onClick={() => {
                            props.exitForm();
                            resetStates();
                        }}><FontAwesomeIcon
                            icon={faTimesCircle}/><span className="hideWhenMobile">Cancel</span>
                        </div>
                        <div className={"bttn bttn-red bttn-footer bttn-quarter" + (props.newItem ? " hidden" : "")}
                             onClick={() => setModalClass("")}><FontAwesomeIcon icon={faTrash}/><span
                            className="hideWhenMobile">Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
