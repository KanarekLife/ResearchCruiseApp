import React from 'react';
function DesktopMenu(props:{className?: string}) {
    return (
        <div className="row d-flex" >
            <div className="col text-center border-end border-light">
                <a id="radiomors" href={""} onClick={()=>window.open('http://player.mors.ug.edu.pl/sites/all/modules/jplayer/mors_popup.html', 'newWin','width=280,height=220')} tabIndex={1} title="Słucha  Radia MORS">
                    <img alt="Radio MORS" src="https://ug.edu.pl/themes/ug_faculty/images/radio.svg"/>
                </a>
            </div>
            <div className="col text-center border-end border-light">
                <a href="https://outlook.com/ug.edu.pl" id="webmail" title="Poczta uniwersytecka">
                    <img alt="Poczta UG" src="https://ug.edu.pl/themes/ug_faculty/images/mail.svg"/>
                </a>
            </div>
            <div className="col text-center">
                <a href="https://en.ug.edu.pl/" id="english" lang="en" title="English Version" tabIndex={0} style={{"textDecoration":"none", "fontSize": "20px","fontWeight": "500","color": "white"}}>
                    EN
                </a>
            </div>
        </div>
    )
}
export default DesktopMenu