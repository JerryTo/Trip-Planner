import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import React from "react";

import ModalTodoListTableRows from "./ModalTodoListTableRows";

export default function ModalReminder(props) {
    let data = [...props.jsonFile];

    function updateComplete(key, newDate) {
        let index = data.findIndex(e => e.id === key);
        let currentTripItem = data[index];
        currentTripItem["reminderDate"] = newDate;
    }

    function save() {
        localStorage["trips"] = JSON.stringify(data);
        props.closeModal();
    }

    let reminderDateHasPassedTrips = props.jsonFile.filter(e => e.reminderDate && new Date(e.reminderDate) <= new Date());
    const todoItems = reminderDateHasPassedTrips.map((item) => <ModalTodoListTableRows key={item.id} datakey={item.id} item={item}
                                                                              title={item.title}
                                                                              destination={item.destination}
                                                                              reminderDate={item.reminderDate}
                                                                              updateComplete={(key, value) => updateComplete(key, value)}
                                                                              showEditForm={item => props.showEditForm(item)}/>);

    return (
        <div className={"dim dim-modal " + props.className}>
            <div className="modal modalWide">
                <div className="cardBlockClass">
                    <FontAwesomeIcon icon={faTimesCircle} className="cancel" onClick={props.closeModal}/>
                    <div className="cardBlockTitle">Reminder</div>
                    <div>
                        <div className="modalIntro">Please address the following reminders:</div>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col" className="hideWhenMobile">Destination</th>
                                <th scope="col" className="hideWhenMobile">Reminder Date</th>
                                <th scope="col">Snooze</th>
                                <th scope="col">Complete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {todoItems}
                            </tbody>
                        </table>
                        <div className="modalIntro">
                            <div className="bttn bttn-green bttn-footer bttn-half"
                                 onClick={save}><FontAwesomeIcon
                                icon={faSave}/>Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}