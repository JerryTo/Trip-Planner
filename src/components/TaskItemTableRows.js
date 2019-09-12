import {faCheckSquare, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faSquare} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

// Table row used in the Todo section
export default function TaskItemTableRows(props) {
    let checkboxIcon = props.complete === 'true' ? faCheckSquare : faSquare;
    return (
        <tr>
            <td>
                <div>{props.title}</div>
            </td>
            <td><FontAwesomeIcon icon={checkboxIcon} onClick={props.completeItem} className="cursorPointer"
                                 datakey={props.dataKey}/></td>
            <td><FontAwesomeIcon icon={faEdit} onClick={props.editItem} className="cursorPointer"
                                 datakey={props.dataKey}/></td>
            <td><FontAwesomeIcon icon={faTrash} onClick={props.deleteItem} className="cursorPointer"
                                 datakey={props.dataKey}/></td>
        </tr>
    );
}