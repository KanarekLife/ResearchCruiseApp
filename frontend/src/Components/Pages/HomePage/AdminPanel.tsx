import Home from "./Home";
import SavedApplicationsTile from "./Tiles/SavedApplicationsTile";
import ManageUserTile from "./Tiles/ManageUserTile";
import React from "react";
import TilesMenu from "./Tiles/TilesMenu";
import AccountSettingsTile from "./Tiles/AccountSettingsTile";
import CruisesTile from "./Tiles/CruisesTile";
import ApplicationsTile from "./Tiles/ApplicationsTile";


export default function AdminPanel() {
    const tiles = [
        { element: <SavedApplicationsTile />, cols: 2, rows: 2 },
        { element: <ManageUserTile />, cols: 1, rows: 1 },
        { element: <AccountSettingsTile />, cols: 1, rows: 1 },
        { element: <ApplicationsTile />, cols: 1, rows: 1},
        { element: <CruisesTile />, cols: 1, rows: 1 }
    ];

    return(
        <Home>
            <TilesMenu tiles={tiles} />
        </Home>
    )
}