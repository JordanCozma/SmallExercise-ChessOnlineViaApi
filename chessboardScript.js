
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


let borderSize_ = 0.3;
let useRules = true;

let gridTable;      // actual data table to reference and change
const table_ = document.getElementById("table");
let gridsize_Setup;

let turnturn = 1;
let turnturn_Text = document.getElementById("TeamNote");




//todo offline atm
//!  ------ ChessPage ------
let gridsize__ = [8, 8];     //grid visually can adapt to any size          -- max 13?

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
        
            table_.children[i].children[u].children[0].src = gridTable[i][u];

        }
    }

    MatchTurnText();
}
function MatchTurnText() {
    switch (turnturn) {
        case 1:
            turnturn_Text.textContent = "White's turn";
            break;
        case 0:
            turnturn_Text.textContent = " ";
            break;
        case -1:
            turnturn_Text.textContent = "White's turn";
            break;
    
        default:
            break;
    }
}




//! ------ Game-Play Logic ------
function GenerateChessLayout(){
    //assuming its empty 8x8 grid


    let Line0 = [Rook_W, Knight_W, Bishop_W, Queen_W, King_W, Bishop_W, Knight_W, Rook_W];
    let Line7 = [Rook_B, Knight_B, Bishop_B, King_B, Queen_B, Bishop_B, Knight_B, Rook_B];


    for (let i = 0; i < 8; i++) {
        PutPiece(i, 0, Line0[i]);
        PutPiece(i, 1, Pawn_W);

        PutPiece(i, 7, Line7[i]);
        PutPiece(i, 6, Pawn_B);
    }

}



function PutPiece(x, y, img_, isSidePiece = false) {

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

            case "Duck":     img_ = Duck;                 break;
            case "Stone":      img_ = Stone;                  break;
            case "SquareEg":      img_ = SquareEg;                  break;
            case "Ladybug":      img_ = Ladybug;                  break;
        
            default:
                break;
        }


    }

    // console.log(img_);
    gridTable[y][x] = img_;

    UpdateMatchTable();
}

function MovePiece(x1, y1, x2, y2, img_ = blankSrc) {

    gridTable[y2][x2] = gridTable[y1][x1];
    gridTable[y1][x1] = img_;

    // console.log(img_ + "3");

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
    console.log(x + " " + y);

    Selected(x,y, item_);

}
function SideBoardItemClicked(item__) {
    Selected(-10,-10, item__, false);
}

function Selected(x, y, item_, replaceWhenMoved = true){
    //old x y

    // console.log(item_)
    

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

function GetPiece(pieceimg_) {
    pieceimg_ = pieceimg_.children[0].currentSrc
    pieceimg_ = pieceimg_.split("_");
    l = pieceimg_.length
    // console.log(pieceimg_[l-3]);

    return (pieceimg_[l-3]);
}
function GetPieceColour(pieceimg_) {
    pieceimg_ = pieceimg_.children[0].currentSrc
    pieceimg_ = pieceimg_.split("_");
    l = pieceimg_.length
    // console.log(pieceimg_[l-2]);

    return (pieceimg_[l-2]);
}

function IsMoveValid(piecetype, x, y, xx, yy, colour_) {
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
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == 1 || yyy - y == 2)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        console.log(GetPieceColour(table_.children[yyy].children[xxx]));
                        if ((Math.abs(x - xxx) == 1) & (yyy - y == 1) & (((GetPieceColour(table_.children[yyy].children[xxx]) == "w" & colour == "b"))||(GetPieceColour(table_.children[yyy].children[xxx]) == "b" & colour == "w"))) {
                            //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    }
                    else{
                        //check if piece can move there
                        if ((Math.abs(x - xxx) == 0) & (yyy - y == -1 || yyy - y == -2)) {
                                //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        console.log(GetPieceColour(table_.children[yyy].children[xxx]));
                        if ((Math.abs(x - xxx) == -1) & (yyy - y == -1) & (((GetPieceColour(table_.children[yyy].children[xxx]) == "w" & colour == "b"))||(GetPieceColour(table_.children[yyy].children[xxx]) == "b" & colour == "w"))) {
                            //check if own colour is on it - if its 
                            DoOwnColourCheck(xxx, yyy, colour);
                        }
                        break;
                    }
                    
                    
                    
                        

                
                    default:
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
                            if (((c != colour) & c == "w") || ((c != colour) & c == "b") || ((c == "p"))) {
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