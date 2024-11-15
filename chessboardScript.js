
const blankSrc = document.getElementById("blankExample").src;
const tempSrc = document.getElementById("tempExample").src;
const blankPic = "Pieces/blank.png";


//!  ------ ChessPage ------
let gridsize__ = [8, 8];     //grid visually can adapt to any size          -- max 13?







//setup
let gridTable = Array.from({ length: gridsize__[0] }, () => Array(gridsize__[1]).fill(blankSrc));

PutPiece(1, 3, tempSrc);
// MovePiece(2, 2, 3, 3);
// MovePiece(3, 3, 5, 1);



function PutPiece(x, y, img_) {
    gridTable[x][y] = tempSrc;
}
function MovePiece(x1, y1, x2, y2, img_ = blankSrc) {

    gridTable[x2][y2] = gridTable[x1][y1];
    gridTable[x1][y1] = img_;
}



// for (let i = 0; i < gridTable.length; i++) {
//     for (let u = 0; u < gridTable[0].length; u++) {
//     console.log(i + ` ${u} ` + gridTable[i][u]);
//     }
// }

// console.log(gridTable);




//setup visuals

let gridsize_Setup = [gridsize__[0] -1, gridsize__[1] - 1];
const table_ = document.getElementById("table");
SetUpTable(gridsize_Setup[0], gridsize_Setup[1]);
UpdateTable();




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

function UpdateTable() {

    for (let i = 0; i < gridTable.length; i++) {
        for (let u = 0; u < gridTable[0].length; u++) {
        
            table_.children[i].children[u].children[0].src = gridTable[i][u];

        }
    }
}







//TODO Testing api system
//






