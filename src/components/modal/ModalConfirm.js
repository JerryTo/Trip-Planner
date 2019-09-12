import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function ModalConfirm(props) {
    return (
        <div className={"dim dim-modal " + props.className}>
            <div className="modal">
                <div className="cardBlockClass">
                    <FontAwesomeIcon icon={faTimesCircle} className="cancel" onClick={props.closeModal}/>
                    <div className="cardBlockTitle">Confirm Deletion</div>
                    <div className="">
                        <div>Are you sure you want to delete this item?</div>
                        <div className="bttn bttn-red" onClick={props.confirmDialog}><FontAwesomeIcon
                            icon={faTrash}/>Delete
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}