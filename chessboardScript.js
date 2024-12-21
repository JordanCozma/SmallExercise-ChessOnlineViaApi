
const blankSrc = document.getElementById("blankExample").src;
const SquareEg = document.getElementById("SquareEg").src;
const blankPic = "Pieces/blank.png";

// const King_W = "Pieces/chess-kingw.png";
// const King_B = "Pieces/chess-kingb.png";
// const Queen_W =         "Pieces/chess-queen.png";
// const Queen_B =         "Pieces/chess-queenb.png";
// const Knight_W =        "Pieces/chess-knightw.png";
// const Knight_B =        "Pieces/chess-knight-alt.png";
// const Bishop_W =        "Pieces/chess-bishopW.png";
// const Bishop_B =        "Pieces/chess-bishop.png";
// const Rook_W =          "Pieces/chess-rook.png";
// const Rook_B =          "Pieces/chess-rookb.png";
// const Pawn_W =          "Pieces/chess-pawn.png";
// const Pawn_B =          "Pieces/chess-pawnb.png";
const King_W = document.getElementById("King_W").src;
const King_B = document.getElementById("King_B").src;
const Queen_W = document.getElementById("Queen_W" ).src;
const Queen_B =  document.getElementById("Queen_B" ).src;
const Knight_W = document.getElementById("Knight_W").src;
const Knight_B = document.getElementById("Knight_B").src;
const Bishop_W = document.getElementById("Bishop_W").src;
const Bishop_B = document.getElementById("Bishop_B").src;
const Rook_W =  document.getElementById("Rook_W").src;
const Rook_B =  document.getElementById("Rook_B").src;
const Pawn_W =  document.getElementById("Pawn_W").src;
const Pawn_B =  document.getElementById("Pawn_B").src;

const Duck =  document.getElementById("Duck").src;
const Ladybug =  document.getElementById("Ladybug").src;
const Stone =  document.getElementById("Stone").src;

const useRulesButton = document.getElementById('RulesButton');
const youreColourButton = document.getElementById('YourColour');
const EmergencySearchButton = document.getElementById('EmergencySearch');
const KingDownButton = document.getElementById('KingDown');
const SkipButton = document.getElementById('SkipButton');


let borderSize_ = 0.3;
let useRules = true;

let gridTable;      // actual data table to reference and change
const table_ = document.getElementById("table");
let gridsize_Setup;



let offline__;
let thisUsersColour;
let gameId = null;
const pileName_Main = "MainPile";
const pileName_White = "WhitePile";
const pileName_Black = "BlackPile";
let FindingData = false;
const delayChecks = 1400;


let turnturn = 1;
let turnturn_Text = document.getElementById("TeamNote");



const NotesButton = document.getElementById('NotesTag');
const NotesPage = document.getElementById('NotesPage');
NotesButton.addEventListener('click', (event) => {
    NotesPage.style.display = (NotesPage.style.display === 'none') ? 'block' : 'none';
    console.log("Opened Notes");

});
NotesPage.addEventListener('click', function() {
    NotesPage.style.display = "none"
    console.log("Closed Notes");
});
NotesPage.style.display = "none"





//!  ------ ChessPage ------
let gridsize__ = [8, 8];     //grid visually can adapt to any size          -- max 13?

offline__ = localStorage.getItem('offlineMode_');
thisUsersColour = localStorage.getItem('thisUsersColour_');
gameId = localStorage.getItem('deck_id');

KingDownButton.style.display = "none";

SetUpGrid()
SetUpVisuals()

GenerateChessLayout();

// PutPiece(2, 4, SquareEg);

SetUpSideBoard();


useRulesButton.addEventListener('click', (event) => {
    useRules = !useRules;
    UpdateUseRulesButton(useRules);
});
UpdateUseRulesButton(useRules);





//if offline turn off uneeded features
if (offline__ == "true") {
    EmergencySearchButton.style.display = "none";
    youreColourButton.style.display = "none";
    
}
else{


    if (thisUsersColour == "black") {
        WaitingForEntry(pileName_White);
    }
    
    UpdateButton_FindingData(2000);
    


}





youreColourButton.addEventListener('click', (event) => {

    if (thisUsersColour == "white") {   thisUsersColour = "black"      }
    else if (thisUsersColour == "black") {   thisUsersColour = "white"      }
    MatchTurnText();

    if (FindingData == true) {
        FindingData = false

        // if (thisUsersColour == "white") {    WaitingForEntry(pileName_Black);          }
        // if (thisUsersColour == "black") {    WaitingForEntry(pileName_White);          }
        
    }

    console.log("swoppedteam")
});
EmergencySearchButton.addEventListener('click', (event) => {

        FindingData = false;

        if (thisUsersColour == "white") {    WaitingForEntry(pileName_Black);          }
        if (thisUsersColour == "black") {    WaitingForEntry(pileName_White);          }
    
    console.log("searching for other teams moves - non" + thisUsersColour)
});
KingDownButton.addEventListener('click', (event) => {

    KingDownButton.style.display = "none";
});
SkipButton.addEventListener('click', (event) => {

    SendData(9,9,9,9);  //skipCode
    UpdateTurnTurn();

});






//!  ------ Grid SetUp ------
function SetUpGrid() {
    gridTable = Array.from({ length: gridsize__[0] }, () => Array(gridsize__[1]).fill(blankSrc));

}






//!  ------ SetUp Visuals ------
function SetUpVisuals() {
    let gridsize_Setup = [gridsize__[0] -1, gridsize__[1] - 1];
    // const table_ = document.getElementById("table");
    SetUpTable(gridsize_Setup[0], gridsize_Setup[1]);
    UpdateMatchTable();


}



function SetUpTable(x, y){

    let large_ = gridsize__[0];
    let w__ = 100;
    if (x < y) { large_ = y; w__ = (gridsize__[0]/gridsize__[1])*100; }


    let h__ = 100/large_;
    table_.children[0].style.height = `${h__}%`;
    // let w__ = (min_/large_)*100;
    table_.children[0].style.width = `${w__}%`;
    // console.log(table_.children[0].style.height);
    // let w__ = 100/gridsize__[0];
    // table_.children[0].style.width = `${w__}%`;
    // console.log(table_.children[0].style.height);

    table_.children[0].style.gridTemplateColumns = `repeat(${gridsize__[0]}, 1fr)`;

    let item_x = table_.children[0].children[0];
    let item_y = table_.children[0];

    for (let i = 0; i < x; i++) {

        // console.log(x + " " + i);
        let clonedChild = item_x.cloneNode(true);
        table_.children[0].appendChild(clonedChild);


    }
    for (let i = 0; i < y; i++) {

        // console.log(y + " " + i);
        let clonedChild = item_y.cloneNode(true);
        table_.appendChild(clonedChild);

    }


    // document.querySelectorAll('.TableLine > div').forEach((cell) => {
    //     cell.addEventListener('click', ClickGridRequest);
    // });
    

}



function UpdateMatchTable() {

    for (let i = 0; i < gridTable.length; i++) {
        for (let u = 0; u < gridTable[0].length; u++) {
        
            let marked = 0;
            if (GetPiece(table_.children[i].children[u]) == "king") {
                marked = 1;   
                // console.log("king-")     
            }

            table_.children[i].children[u].children[0].src = gridTable[i][u];

            if (marked == 1) {
                if (GetPiece(table_.children[i].children[u]) != "king") {
                    KingDownButton.style.display = "block"
                    console.log("king-down")  
                }
            }


        }
    }

    MatchTurnText();
}
function MatchTurnText() {
    switch (turnturn) {
        case 1:
            turnturn_Text.textContent = "White's turn";
            if (offline__ == "true") {   thisUsersColour = "white";   }
            break;
        case 0:
            turnturn_Text.textContent = "Black's Turn";
            if (offline__ == "true") {   thisUsersColour = "black";   }
            break;
    
        default:
            break;
    }

    youreColourButton.textContent = `team ${thisUsersColour}`;
    if ((thisUsersColour == "white" & turnturn == 1) || (thisUsersColour == "black" & turnturn == 0)) {
        SkipButton.style.display = "";
    }
    else{
        SkipButton.style.display = "none";
    }


}




//! ------ Game-Play Logic ------
function GenerateChessLayout(){
    //assuming its empty 8x8 grid


    let Line0 = [Rook_W, Knight_W, Bishop_W, Queen_W, King_W, Bishop_W, Knight_W, Rook_W];
    let Line7 = [Rook_B, Knight_B, Bishop_B, King_B, Queen_B, Bishop_B, Knight_B, Rook_B];


    for (let i = 0; i < 8; i++) {
        PutPiece(i, 0, Line0[i], false, true);
        PutPiece(i, 1, Pawn_W, false, true);

        PutPiece(i, 7, Line7[i], false, true);
        PutPiece(i, 6, Pawn_B, false, true);
    }

}



function PutPiece(x, y, img_, isSidePiece = false, ignore = false, skipSendData = false) {

    img_2 = img_;
    if (isSidePiece) {


        


        switch (img_.className) {
            case "Rook_W":      img_ = Rook_W;                  break;
            case "Knight_W":    img_ = Knight_W;                break;
            case "Bishop_W":    img_ = Bishop_W;                break;
            case "Queen_W":     img_ = Queen_W;                 break;
            case "King_W":      img_ = King_W;                  break;
            case "Pawn_W":      img_ = Pawn_W;                  break;

            case "Rook_B":      img_ = Rook_B;                  break;
            case "Knight_B":    img_ = Knight_B;                break;
            case "Bishop_B":    img_ = Bishop_B;                break;
            case "Queen_B":     img_ = Queen_B;                 break;
            case "King_B":      img_ = King_B;                  break;
            case "Pawn_B":      img_ = Pawn_B;                  break;

            case "Duck":        img_ = Duck;                 break;
            case "Stone":       img_ = Stone;                  break;
            case "SquareEg":    img_ = SquareEg;                  break;
            case "Ladybug":     img_ = Ladybug;                  break;
        
            default:
                break;
        }


    }

    // console.log(img_);
    gridTable[y][x] = img_;

    // console.log( "ignore" + ignore)
    UpdateTurnTurn(ignore);

    if (skipSendData == false || offline__ == "true") {
        SendData(100, 100, x, y, img_2, ignore);
    }
    
    UpdateMatchTable();
}

function MovePiece(x1, y1, x2, y2, img_ = blankSrc, skipSendData = false) {

    gridTable[y2][x2] = gridTable[y1][x1];
    gridTable[y1][x1] = img_;

    // console.log(img_ + "3");


    UpdateTurnTurn();

    if (skipSendData == false || offline__ == "true") {
        SendData(x1, y1, x2, y2, img_);
    }

    UpdateMatchTable();



}




//! ------ Select System ------
let selected = [-1,-1, null, true];


for (let yyy = 0; yyy < table_.children.length; yyy++) {
    for (let xxx = 0; xxx < table_.children[yyy].children.length; xxx++) {

        table_.children[yyy].children[xxx].addEventListener('click', (event) => {

            TableItemClicked(xxx, yyy, table_.children[yyy].children[xxx]);
            

        });

        
    }
}



function TableItemClicked(x,y, item_){

    // item_.style.box-shadow = "inset  0 0 0 2px #c9b7c034";
    // item_.style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");

    // console.log(x + " " + y);


    Selected(x,y, item_);

}
function SideBoardItemClicked(item__) {
    Selected(-10,-10, item__, false);
}

function Selected(x, y, item_, replaceWhenMoved = true){
    //old x y


    //!  data is in strings 
    if ((turnturn == "1") & (thisUsersColour == "black") & (offline__ == "false")) {  console.log("not ur turn yet");  return;    }
    if ((turnturn == "0") & (thisUsersColour == "white") & (offline__ == "false")) {  console.log("not ur turn yet");  return;    }



    // on first select of sidepiece, wipe then do it
    if (x === -10 & selected[2] != null & selected[2] != item_) {

        UpdatePossibleMoves();

        selected[2].style.removeProperty("box-shadow");
        // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");
        selected = [-1,-1, null, true];
    }

    // something already selected
    if (selected[2] != null) {

        //..if not the same
        if (selected[2] != item_) {

            if (selected[3]) {  //if there is a piece to place when moved (not a sidepiece place item)
                
                if (useRules) {
                    // if (IsMoveValid(GetPiece(selected[2]), selected[0], selected[1], x, y, GetPieceColour(selected[2])) == false) {
                    if (!IsMoveValid2(x, y)) {
                        console.log("move not within piece rules");
                        return;
                    }
                }



                MovePiece(selected[0],selected[1], x, y );


                selected[2].style.setProperty("box-shadow", "inset  0 0 0 .5vmin #c9b7c034");
                selected = [-1,-1, null, true];


                UpdatePossibleMoves();


            }
            else{   //new piece
                PutPiece(x, y, selected[2], true);
                console.log("put" + selected[2]);

                UpdatePossibleMoves();

            }

            // console.log("Selection Complete");

            
        }
        else{
            selected[2].style.removeProperty("box-shadow");         //needed to do this so hover works again
            // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");
            selected = [-1,-1, null, true];
            // console.log(selected);

            UpdatePossibleMoves();

        }
        
        // console.log(selected[2]  + "  " + item_)

        
    }
    else{
        

        // cant select other colours pieces if rules are on
        if (GetPieceColour(item_) == "w" & thisUsersColour == "black" & useRules == true) {     return;  }
        if (GetPieceColour(item_) == "b" & thisUsersColour == "white" & useRules == true) {     return;  }
        // cant select blank pieces
        if (GetPieceColour(item_) == "p") {     return;  }



        UpdatePossibleMoves();
        


        selected = [x, y, item_, replaceWhenMoved];

        if (x != -10) {
            selected[2].style.setProperty("box-shadow", "inset  0 0 0 .5vmin #d63478b6");            
            // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #cf1b7291");            
        }
        else{
            selected[2].style.setProperty("box-shadow", "inset  0 0 0 .5vmin #d63478b6, 0 0 0 6px #d63478b6"); 
        }
        
        if (useRules) {
            UpdatePossibleMoves(GetPiece(item_), x, y, GetPieceColour(selected[2]));
        }

    }

    

}



function SetUpSideBoard() {
    const sideBoard = document.getElementById("sideBoard");
    for (let yyy = 0; yyy < sideBoard.children[0].children.length; yyy++) {

        sideBoard.children[0].children[yyy].addEventListener('click', (event) => {
    
            SideBoardItemClicked(sideBoard.children[0].children[yyy]);
    
        });
    
            
    }
}


function UpdateUseRulesButton(useRules_){
    if (useRules_) {
        useRulesButton.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else{
        useRulesButton.style.backgroundColor = "rgba(182, 107, 81, 0)";
    }
}

function GetPiece(pieceimg_, skip__ = "null") {
    // console.log(pieceimg_);

    try {
        if (skip__ == "null") {
            pieceimg_ = pieceimg_.children[0]
        }

        pieceimg_ = pieceimg_.currentSrc
        pieceimg_ = pieceimg_.split("_");
        l = pieceimg_.length
        // console.log(pieceimg_[l-3]);
    
        // console.log(pieceimg_[l-3]);
        return (pieceimg_[l-3]);



    } catch (error) {
        return error
    }

    
}
function GetPieceColour(pieceimg_, skip__ = null) {
    try {
        
        if (skip__ == null) {
            pieceimg_ = pieceimg_.children[0]
        }

        pieceimg_ = pieceimg_.currentSrc
        pieceimg_ = pieceimg_.split("_");
        l = pieceimg_.length
        // console.log("got  " + pieceimg_[l-2]);
    
        return (pieceimg_[l-2]);


        
    } catch (error) {
        return error
    }

    
}

function IsMoveValid_old(piecetype, x, y, xx, yy, colour_) {
    // x y = current, xx yy target position

    pieceMoveValid_ = false;
    


    switch (piecetype) {
        case "knight":
            if (((Math.abs(x - xx) == 1) & (Math.abs(y - yy) == 2)) || ((Math.abs(x - xx) == 2) & (Math.abs(y - yy) == 1)))  {
                pieceMoveValid_ = true;
            }
            break;

        case "rook":
            if (((x != xx) & (y == yy)) || ((x == xx) & (y != yy)))  {
                pieceMoveValid_ = true;
            }
            break;

        case "bishop":
            if (Math.abs(x - xx) == Math.abs(y - yy))  {
                pieceMoveValid_ = true;
            }
            break;

        case "king":
            if ((Math.abs(x - xx) <= 1) & (Math.abs(y - yy) <= 1))  {
                pieceMoveValid_ = true;
            }
            break;

        case "queen":     //just put bishop and knights rules here
            if (((x != xx) & (y == yy)) || ((x == xx) & (y != yy)))  {
                pieceMoveValid_ = true;
            }
            if (Math.abs(x - xx) == Math.abs(y - yy))  {
                pieceMoveValid_ = true;
            }
            break;

        case "pawn":
            if (colour_) {
                if ((Math.abs(x - xx) == 0) & (yy - y > 0))  {
                    pieceMoveValid_ = true;
                }
                if ((Math.abs(x - xx) == 1) & (yy - y == 1) )  {    //
                    pieceMoveValid_ = true;
                    console.log(gridTable[xx, yy]);
                }
                console.log(colour_ + "  pawnpiece");

            }
            
            break;


        default:
            console.log("piece not found in system " + piecetype);
            break;
    }


}

function UpdatePossibleMoves(piecetype = "none", x = -50, y = -50, colour = "none") {
    if (piecetype != "none") {
        

        for (let yyy = 0; yyy < gridTable.length; yyy++) {
            for (let xxx = 0; xxx < gridTable[0].length; xxx++) {
                
                switch (piecetype) {
                    case "knight":      //check if piece can move there
                        if (((Math.abs(x - xxx) == 1) & (Math.abs(y - yyy) == 2)) || ((Math.abs(x - xxx) == 2) & (Math.abs(y - yyy) == 1))) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    case "rook":      //check if piece can move there
                        if (((x != xxx) & (y == yyy)) || ((x == xxx) & (y != yyy))) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    case "bishop":      //check if piece can move there
                        if (Math.abs(x - xxx) == Math.abs(y - yyy)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    case "king":      //check if piece can move there
                        if ((Math.abs(x - xxx) <= 1) & (Math.abs(y - yyy) <= 1)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    case "queen":      //check if piece can move there
                        if (((x != xxx) & (y == yyy)) || ((x == xxx) & (y != yyy))) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        if (Math.abs(x - xxx) == Math.abs(y - yyy)) {
                            //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    case "pawn":   
                    
                    if (colour == "w") {

                        //check if piece can move there
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == 2) & (y == 1)) {
                            console.log(y);
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == 1)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }

                        if ((Math.abs(x - xxx) == 1) & (yyy - y == 1) & (((GetPieceColour(table_.children[yyy].children[xxx]) == "b")))) {
                            //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    }
                    else{
                        //check if piece can move there
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == -2) & (y == 6)) {
                            console.log(y);
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == -1)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }

                        if ((Math.abs(x - xxx) == 1) & (yyy - y == -1) & (((GetPieceColour(table_.children[yyy].children[xxx]) == "w")))) {
                            //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    }
                    
                    
                    
                
                    default: 
                        console.log(piecetype);
                        if (piecetype == "blank") {
                            break;
                        }
                        DoOwnColourCheck(xxx, yyy, colour);

                        break;
                }
                
                
            }                                
        }   



        
    }
    else{
        for (let yyy = 0; yyy < gridTable.length; yyy++) {
            for (let xxx = 0; xxx < gridTable[0].length; xxx++) {

                ColourTile(table_.children[yyy].children[xxx], "clear");

            }
        }
    }



}

function DoOwnColourCheck(xxx, yyy, colour) {
    c = GetPieceColour(table_.children[yyy].children[xxx]);
                            if (((c != colour) & c == "w") || ((c != colour) & c == "b") || ((c == "p")) || ((c == "l") || (c == "r")||(c == "t"))) {
                                ColourTile(table_.children[yyy].children[xxx], "movable");
                            }
                            else{
                                ColourTile(table_.children[yyy].children[xxx], "almostMovable");
                            }
}



function ColourTile(tile, colourlable) {
    c = "red";
    switch (colourlable) {
        case "movable":
            c = "#eb96c0";
            break;
        case "almostMovable":
            c = "#dab1c5";
            break;
        case "clear":
            c = "#c9b7c034";
            break;
    
        default:
            break;
    }

    tile.style.setProperty("box-shadow", "inset  0 0 0 .5vmin " + c);
}


function IsMoveValid2(x, y) {
    // getBoxShadowColor(table_.children[yyy].children[xxx]);
    if ((getBoxShadowHexColor(table_.children[y].children[x])) ==  "#eb96c0" ) {
        return true;
    } 
    return false
    
}

//imported from the web
function getBoxShadowHexColor(element) {
    if (!element) {
        console.error("Invalid element provided.");
        return null;
    }

    // Get the computed box-shadow property
    const boxShadow = window.getComputedStyle(element).boxShadow;

    // Check if no box-shadow is applied
    if (!boxShadow || boxShadow === "none") {
        console.log("No box-shadow applied.");
        return null;
    }

    // Extract the color part (matches rgba(), rgb(), or hex colors)
    const colorMatch = boxShadow.match(/rgba?\([^)]+\)|#[a-fA-F0-9]{3,8}/);
    if (!colorMatch) {
        console.log("No color found in box-shadow.");
        return null;
    }

    const color = colorMatch[0];

    // Convert RGB/RGBA to HEX if needed
    if (color.startsWith("rgb")) {
        return rgbToHex(color);
    }

    // Return HEX color if already in HEX format
    return color.toLowerCase();
}

// Helper function: Convert RGB(A) to HEX
function rgbToHex(rgb) {
    // Extract RGB values
    const rgbValues = rgb.match(/\d+/g).map(Number);
    if (!rgbValues || rgbValues.length < 3) {
        console.error("Invalid RGB color format:", rgb);
        return null;
    }

    // Convert RGB to HEX
    return (
        "#" +
        rgbValues
            .slice(0, 3) // Ignore alpha if present
            .map(value => value.toString(16).padStart(2, "0"))
            .join("")
            .toLowerCase()
    );
}


async function SendData(x1, y1, x2, y2, img_ = null, startIgnore = false) {

    
    // console.log("Sending DataStart" + offline__ + startIgnore)


    //if offline dont do this
    if (offline__ == "true") { console.log("c offline__"); return; }
    if (startIgnore == true) {console.log("c startignore");  return; }



    // making it here assumes its ur go


    //for putting piece
    if (x1 == 100) {

        console.log(img_);
        num = -1;
        switch (img_.className) {
            case "Rook_W":      num = 1;              break;
            case "Knight_W":    num = 2;              break;
            case "Bishop_W":    num = 3;              break;
            case "Queen_W":     num = 4;              break;
            case "King_W":      num = 5;              break;
            case "Pawn_W":      num = 6;              break;

            case "Rook_B":      num = 7;              break;
            case "Knight_B":    num = 8;              break;
            case "Bishop_B":    num = 9;              break;
            case "Queen_B":     num = 10;             break;
            case "King_B":      num = 11;             break;
            case "Pawn_B":      num = 12;             break;

            case "Duck":        num = 13;             break;
            case "Stone":       num = 14;             break;
            case "SquareEg":    num = 15;             break;
            case "Ladybug":     num = 16;             break;
        
            default:
                break;
        }

        //! have to be careful will limited codes
        if (num >= 9) {
            x1 = 9;
            num -= 9;
            y1 = num;

        }
        else{
            x1 = 8;
            y1 = num;
        }
        console.log(x1 + "  " + y1);

    }
    else{
        //normal

    }

    
    if (x1 == 0) {  x1 = "K";  }
    if (y1 == 0) {  y1 = "K";  }
    if (x2 == 0) {  x2 = "K";  }
    if (y2 == 0) {  y2 = "K";  }

    if (x1 == 1) {  x1 = "A";  }
    if (y1 == 1) {  y1 = "A";  }
    if (x2 == 1) {  x2 = "A";  }
    if (y2 == 1) {  y2 = "A";  }

    //get values, will be < 8 or so
    xx1 = x1 + "S";
    yy1 = y1 + "D";
    xx2 = x2 + "C";
    yy2 = y2 + "H";

    
    //pull cards - for api process
    // d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/draw/?count=52`);
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pileName_Main}/draw/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);



    let pilepile = pileName_White;
    if (thisUsersColour == "white") {
        pilepile = pileName_White;
    }
    else{
        pilepile = pileName_Black;        
    }

    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pilepile}/add/?cards=${xx1},${yy1},${xx2},${yy2}`);
    console.log(d);




    if (thisUsersColour == "black") {
        pilepile = pileName_White;
    }
    else{
        pilepile = pileName_Black;        
    }

    console.log(`data sent - ${xx1} ${yy1} ${xx2} ${yy2}`)
    
    await WaitingForEntry(pilepile);

    


}

async function WaitingForEntry(pilepile_) {

    console.log(`now waiting for entry in  ${pilepile_}`)


    FindingData = true;
    attemptsWhileLoop = 0;
    while (FindingData == true & (attemptsWhileLoop < 1000) ) {


        // console.log(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pilepile_}/list/`)


        // this is checking for other players data
        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pilepile_}/list/`);
        if (d != null) {                      
            if (pilepile_ == "WhitePile") {
                c = d?.piles?.WhitePile?.remaining ?? -1;                
            }
            else{
                c = d?.piles?.BlackPile?.remaining ?? -1;    
            }
            if (c > 0) {   
                FindingData = false;
                await ReadData(d, pilepile_);
                FindingData = false;

                break;
            }
        }



        if (FindingData == true & (attemptsWhileLoop < 1000)) {
            await new Promise(r => setTimeout(r, delayChecks)); // second delay Before trying again
        }

        if (attemptsWhileLoop >= 1000) {
            console.log("need button to reset finding system");
        }

        attemptsWhileLoop++;
    }
    FindingData == false;



}

async function UpdateButton_FindingData(t){
    while (1 == 1) {
        if (FindingData == true) {
            EmergencySearchButton.style.backgroundColor = rgba(83, 66, 66, 0);            
        }
        else{
            EmergencySearchButton.style.backgroundColor = rgba(83, 66, 66, 0.048);            
        }
        await new Promise(r => setTimeout(r, t));
    }
}



async function GetDataFromApi(url__) {
    const apiUrl = url__;

    try {
        const response = await fetch(apiUrl).catch(() => null); // Handle network errors silently

        if (!response.ok) {
            return null;

            // throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;


    } catch (error) {
        // console.error("Fetch Error:", error);
        return null;
    }
    

}

async function ReadData(dd, pile__) {

    
    if (pile__ == "WhitePile") {     dd =  dd.piles.WhitePile.cards;  }
    if (pile__ == "BlackPile") {     dd =  dd.piles.BlackPile.cards;  }

    let cards = [];
    for (let i = 0; i < dd.length; i++) {
        cards.push(dd[i].code);
    }

    //is it a place piece?   /  check for codes
    if (cards.length == 4) {
        //normal

        //cut off last char of card code
        for (let i = 0; i < cards.length; i++) {
            cards[i] = cards[i].substring(0, cards[i].length - 1);

            if (cards[i] == "K") {  cards[i] = "0";  }
            if (cards[i] == "A") {  cards[i] = "1";  }

        }




        console.log(cards);

        //skip code
        if (cards[0] == "9" & "9" == cards[1] & "9" == cards[2] & "9" == cards[3]) {
            UpdateTurnTurn();
            console.log("read skip");
        }
        else if (cards[0] >= 8) {
            //its a place piece move
 

            //! decode
            let t;         
            switch (cards[0]) {
                case "8":
                    t = cards[1];
                    break;
                case "9":
                    t = parseInt(cards[1]) + 9;
                    break;
            
                default:
                    console.log(cards[0]);
                    break;
            }

            t = t.toString();
            let iii;
            switch (t) {
                case "1":    iii =     Rook_W     ; break;
                case "2":    iii =     Knight_W   ; break;
                case "3":    iii =     Bishop_W   ; break;
                case "4":    iii =     Queen_W    ; break;
                case "5":    iii =     King_W     ; break;
                case "6":    iii =     Pawn_W     ; break;
    
                case "7":    iii =     Rook_B     ; break;
                case "8":    iii =     Knight_B   ; break;
                case "9":    iii =     Bishop_B   ; break;
                case "10":   iii =     Queen_B    ; break;
                case "11":   iii =     King_B     ; break;
                case "12":   iii =     Pawn_B     ; break;
    
                case "13":   iii =     Duck       ; break;
                case "14":   iii =     Stone      ; break;
                case "15":   iii =     SquareEg   ; break;
                case "16":   iii =     Ladybug    ; break;
        
                default:
                    iii = "firebroke"
                    break;
            }

            console.log(cards);
            console.log(cards[2] +"- "+ cards[3] +"- "+ iii);

            PutPiece(cards[2], cards[3], iii, false, true, true);


        }
        else{
            //its a move piece move
            console.log(cards[0],cards[1],cards[2],cards[3]);

            MovePiece(cards[0],cards[1],cards[2],cards[3], blankSrc, true)
        }






        //clear api stuff     
        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pile__}/draw/?cards=${dd[0].code},${dd[1].code},${dd[2].code},${dd[3].code}`);
        // Push back into pile
        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${gameId}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);
        console.log(d);

    }


    console.log(cards);

    UpdateTurnTurn(false, true);
}


function UpdateTurnTurn(ignore = false, toMine = false) {
    // just did ur go, now toggle turn tracker

    if (ignore == true) {
        return
    }
    

    if (offline__ == "true") {
        if (turnturn == 1) {
            turnturn = 0;
        }
        else{
            if (turnturn == 0) {
                turnturn = 1;
            }
        }


    }
    else{

        if (toMine == true) {
            if (thisUsersColour == "white") {
                turnturn = 1;
            }
            else{
                turnturn = 0;
            }
        }
        else{
            if (thisUsersColour == "white") {
                turnturn = 0;
            }
            else{
                turnturn = 1;
            }
        }


        
        
    }



    MatchTurnText();

    console.log( "TurnTurn = " + turnturn)
}