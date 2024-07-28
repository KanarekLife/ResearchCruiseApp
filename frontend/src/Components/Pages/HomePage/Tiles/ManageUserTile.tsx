import React  from 'react';
import Tile from "./Tile";
import {Link} from "react-router-dom";
import {PathName as Path} from "../../../Tools/PathName";
import {ReactComponent as Icon} from "/node_modules/bootstrap-icons/icons/people-fill.svg"

function ManageUserTile(){
    return (
        <Tile>
            <Link to={Path.ManageUsers} className={"common-tile-link"}>
                <Icon className={"bi-menu-common"}/>
                Zarządzanie użytkownikami
            </Link>
        </Tile>
    )
}


export default ManageUserTile