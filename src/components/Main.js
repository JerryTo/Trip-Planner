import TripItem from "./TripItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faCircle as farCircle, faDotCircle, faSquare} from "@fortawesome/free-regular-svg-icons";
import TripForm from "./TripForm";
import DimOverlay from "./DimOverlay";
import ModalReminder from "./modal/ModalReminder";
import React, {useState} from "react";
import * as utils from "../Utility Functions/UtilityFunctions";

export default function Main() {
    let currentJSON = JSON.parse(localStorage["trips"]);

    // True if there exists some item with a reminder date that already passed
    let showReminder = currentJSON.map(e => e.reminderDate && new Date(e.reminderDate) <= new Date()).some(e => e === true);

    const [showForm, setShowForm] = useState(false);
    const [reminderModalClass, setReminderModalClass] = useState(showReminder ? "" : "hidden");
    const [newItemStatus, setNewItemStatus] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState({none: false, business: false, vacation: false});
    const [search, setSearch] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [formValues, setFormValues] = useState(
        {
            "key": "",
            "title": "",
            "destination": "",
            "category": "None",
            "startDate": "",
            "endDate": "",
            "reminderDate": "",
            "description": "",
            "todo": []
        }
    );
    const [todoValues, setTodoValues] = useState([]);

    let dimClass = showForm ? "dim" : "dim hidden";

    // Used to show the on/off radio button icon
    function getRadioButtonIconType(sort, type) {
        return (sort === type) ? faDotCircle : farCircle;
    }

    // Show results using the checked categories
    function filterResultsByCategory(item) {
        // Get an array of selected items. Ex: ['business', 'none']
        let selectedFilters = Object.keys(categoryFilter).filter(item => categoryFilter[item]);

        // If no category filters are selected, show all items
        if (!selectedFilters.length) { return item; }

        // Show items based on filter
        return selectedFilters.indexOf(item.category.toLowerCase()) !== -1;
    }

    function filterResultsBySearch(item) {
        // If no category filters are selected, show all items
        // Possible enhancement: Ignore whitespaces
        if (!search) { return item; }

        // Make the search case insensitive
        let searchStr = search.toLowerCase();
        let titleStr = item.title.toLowerCase();
        let destinationStr = item.destination.toLowerCase();
        let todoStr = item.todo.map(e => e.task.toLowerCase()); // Array of todo items, lowercase

        // Store results (for cleanliness)
        let stringInTitle = titleStr.indexOf(searchStr) !== -1;
        let stringInDestination = destinationStr.indexOf(searchStr) !== -1;
        let stringInTodoList = todoStr.map(e => e.indexOf(searchStr)).some(e => e > -1);

        // Return value if search string is found in the title, destination, or todo list
        return stringInTitle || stringInDestination || stringInTodoList;
    }

    // Sort array
    switch (sortBy) {
        case "title":
            currentJSON.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "destination":
            currentJSON.sort((a, b) => a.destination.localeCompare(b.destination));
            break;
        case "startDate":
            currentJSON.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            break;
        case "endDate":
            currentJSON.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
            break;
        case "reminderDate":
            currentJSON.sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));
            break;
        default:
            break;
    }

    // Reverse the array to sort in the opposite direction
    if (sortDirection === "descending") {
        currentJSON.reverse();
    }

    function showEditForm(item) {
        setReminderModalClass("hidden");
        setShowForm(!showForm);
        setNewItemStatus(false);
        setFormValues({
            "key": item.id,
            "title": item.title,
            "destination": item.destination,
            "category": item.category,
            "startDate": item.startDate ? new Date(item.startDate) : "",
            "endDate": item.endDate ? new Date(item.endDate) : "",
            "reminderDate": item.reminderDate ? new Date(item.reminderDate) : "",
            "description": item.description,
            "todo": item.todo,
        });
        setTodoValues(item.todo);
    }

    // Create the TripItems that are shown in the middle of the page
    const listTripItems = currentJSON.filter(item => filterResultsByCategory(item)).filter(item => filterResultsBySearch(item)).map((item) =>
        <TripItem key={item.id} title={item.title} destination={item.destination} category={item.category}
                  startDate={item.startDate} endDate={item.endDate} description={item.description}
                  todoList={item.todo}
                  handleClick={() => {
                      showEditForm(item);
                  }}/>
    );

    return (
        <div className="App">

            <div id="leftColumn">
                <div className="outerBox">
                    <h1>Trip Planner</h1>
                </div>
                <div className="outerBox">
                    <input className="searchBox" type="text" placeholder="Search Trips"
                           onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="outerBox">
                    <div className="bttn bttn-darkblue" onClick={() => {
                        setShowForm(!showForm);
                        setNewItemStatus(true);
                        setFormValues({
                            "key": utils.generateNewKey(JSON.parse(localStorage["trips"])),
                            "title": "",
                            "destination": "",
                            "category": "None",
                            "startDate": "",
                            "endDate": "",
                            "reminderDate": "",
                            "description": "",
                            "todo": []
                        });
                        setTodoValues([]);
                    }}><FontAwesomeIcon icon={faPlus}/>Add a Trip
                    </div>
                </div>
                <div className="outerBox categories">
                    <strong>Category Filters</strong>
                </div>

                <ul className="categories">
                    <li><FontAwesomeIcon icon={categoryFilter["business"] ? faCheckSquare : faSquare}
                                         onClick={(e) => utils.handler(setCategoryFilter, "business", !categoryFilter["business"])}
                                         className="cursorPointer"/><span
                        onClick={(e) => utils.handler(setCategoryFilter, "business", !categoryFilter["business"])}>Business</span>
                    </li>
                    <li><FontAwesomeIcon icon={categoryFilter["vacation"] ? faCheckSquare : faSquare}
                                         onClick={(e) => utils.handler(setCategoryFilter, "vacation", !categoryFilter["vacation"])}
                                         className="cursorPointer"/><span
                        onClick={(e) => utils.handler(setCategoryFilter, "vacation", !categoryFilter["vacation"])}>Vacation</span>
                    </li>
                    <li><FontAwesomeIcon icon={categoryFilter["none"] ? faCheckSquare : faSquare}
                                         onClick={(e) => utils.handler(setCategoryFilter, "none", !categoryFilter["none"])}
                                         className="cursorPointer"/><span
                        onClick={(e) => utils.handler(setCategoryFilter, "none", !categoryFilter["none"])}>None</span>
                    </li>
                </ul>
                <div className="outerBox categories">
                    <strong>Sort Filters</strong>
                </div>

                <ul className="categories">
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortDirection, "ascending")}
                                         onClick={() => setSortDirection("ascending")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortDirection("ascending")}>Ascending</span>
                    </li>
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortDirection, "descending")}
                                         onClick={() => setSortDirection("descending")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortDirection("descending")}>Descending</span>
                    </li>
                </ul>

                <ul className="categories">
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortBy, "title")}
                                         onClick={() => setSortBy("title")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortBy("title")}>Title</span>
                    </li>
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortBy, "destination")}
                                         onClick={() => setSortBy("destination")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortBy("destination")}>Destination</span>
                    </li>
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortBy,"startDate")}
                                         onClick={() => setSortBy("startDate")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortBy("startDate")}>Start Date</span>
                    </li>
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortBy, "endDate")}
                                         onClick={() => setSortBy("endDate")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortBy("endDate")}>End Date</span>
                    </li>
                    <li><FontAwesomeIcon icon={getRadioButtonIconType(sortBy, "reminderDate")}
                                         onClick={() => setSortBy("reminderDate")}
                                         className="cursorPointer"/><span
                        onClick={() => setSortBy("reminderDate")}>Reminder Date</span>
                    </li>
                </ul>
            </div>


            <div id="middleColumn">
                {listTripItems}
            </div>

            <TripForm showForm={showForm} newItem={newItemStatus} formValues={formValues} todoValues={todoValues}
                      handleChange={(keyName, value) => {
                          utils.handler(setFormValues, keyName, value);
                      }}
                      exitForm={() => setShowForm(!showForm)}
                      handleTodo={(keyName, value) => utils.handler(setTodoValues, keyName, value)}
                      updateTodo={newArray => setTodoValues(newArray)}
            />
            <DimOverlay className={dimClass}/>
            <ModalReminder jsonFile={currentJSON} className={reminderModalClass}
                           closeModal={() => setReminderModalClass("hidden")}
                           showEditForm={item => showEditForm(item)}/>
        </div>
    );
}