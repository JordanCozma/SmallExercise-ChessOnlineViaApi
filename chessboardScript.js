
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





let gridTable;
const table_ = document.getElementById("table");
let gridsize_Setup;


//todo offline atm
//!  ------ ChessPage ------
let gridsize__ = [8, 8];     //grid visually can adapt to any size          -- max 13?

SetUpGrid()
SetUpVisuals()

GenerateChessLayout();

// PutPiece(2, 4, SquareEg);

SetUpSideBoard();


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

    console.log(img_);
    gridTable[y][x] = img_;

    UpdateMatchTable();
}

function MovePiece(x1, y1, x2, y2, img_ = blankSrc) {

    gridTable[y2][x2] = gridTable[y1][x1];
    gridTable[y1][x1] = img_;

    console.log(img_ + "3");

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

    console.log(item_)


    // on first select of sidepiece, wipe then do it
    if (x === -10 & selected[2] != null & selected[2] != item_) {
        selected[2].style.removeProperty("box-shadow");
        // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");
        selected = [-1,-1, null, true];
    }

    // something already selected
    if (selected[2] != null) {

        //if not the same
        if (selected[2] != item_) {

            if (selected[3]) {
                MovePiece(selected[0],selected[1], x, y );

                selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");
                selected = [-1,-1, null, true];
                // console.log(selected);
            }
            else{
                PutPiece(x, y, selected[2], true);
                console.log("put" + selected[2]);
            }


            
        }
        else{
            selected[2].style.removeProperty("box-shadow");         //needed to do this so hover works again
            // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #c9b7c034");
            selected = [-1,-1, null, true];
            // console.log(selected);
        }
        
        console.log(selected[2]  + "  " + item_)

        
    }
    else{
        

        selected = [x, y, item_, replaceWhenMoved];

        if (x != -10) {
            selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #d63478b6");            
            // selected[2].style.setProperty("box-shadow", "inset  0 0 0 6px #cf1b7291");            
        }
        else{
            selected[2].style.setProperty("box-shadow", "inset  0 0 0 30px #d63478b6, 0 0 0 6px #d63478b6"); 
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
