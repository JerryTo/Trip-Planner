import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faBell, faCalendarAlt, faCircle as farCircle} from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import React, {useState} from "react";
import * as dateFunctions from "../../Utility Functions/DateFunctions";

export default function ModalTodoList(props) {
    const [newReminderDate, setNewReminderDate] = useState(null);
    const [complete, setComplete] = useState(false);
    let reminderDate = new Date(props.reminderDate);

    let completeIconClass = "reminderIcon" + (complete ? " green" : "");
    let snoozeIconCircleClass = newReminderDate ? "green" : "";
    let snoozeIconBellClass = newReminderDate ? "green" : "black";

    let showEditForm = () => props.showEditForm(props.item);

    return (
        <tr>
            <td className="cursorPointer" onClick={showEditForm}>
                <div>{props.title}</div>
            </td>
            <td className="cursorPointer hideWhenMobile" onClick={showEditForm}><FontAwesomeIcon icon={faMapMarkerAlt} className="tableIcon"/>{props.destination}</td>
            <td className="hideWhenMobile"><FontAwesomeIcon icon={faCalendarAlt}
                                                            className="tableIcon"/>{dateFunctions.getDateMMDDYYYY(reminderDate)}
            </td>
            <td className="center">

                <DatePicker
                    selected={newReminderDate}
                    onChange={date => {
                        setNewReminderDate(date);
                        props.updateComplete(props.datakey, newReminderDate)
                    }}
                    customInput={
                        <span className="fa-layers fa-fw reminderIcon">
                        <FontAwesomeIcon icon={farCircle} className={snoozeIconCircleClass}/>
                        <FontAwesomeIcon icon={faBell} inverse transform="shrink-6"
                                         className={snoozeIconBellClass}
                        />
                </span>}
                />
            </td>
            <td className="center"><FontAwesomeIcon icon={faCheckCircle}
                                                    className={completeIconClass}
                                                    onClick={() => {
                                                        props.updateComplete(props.datakey, "");
                                                        setComplete(true)
                                                    }}/></td>
        </tr>
    );
}