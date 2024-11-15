// Main Page States
const defaultPage = document.getElementById("default_InteractiveArea");
const newGamePage = document.getElementById("newGame_InteractiveArea");
const findGamePage = document.getElementById("findGame_InteractiveArea");
let currentPage = defaultPage;

SetHomePageTo(defaultPage);
CheckSetPreciousId();

const delayChecks = 1400;


function SetHomePageTo(page_){
    currentPage = page_;
    switch (currentPage) {
        case defaultPage:
            Show(defaultPage);
            Hide(newGamePage);
            Hide(findGamePage);
            break;
        case newGamePage:
            Hide(defaultPage);
            Show(newGamePage);
            Hide(findGamePage);
            break;
        case findGamePage:
            Hide(defaultPage);
            Hide(newGamePage);
            Show(findGamePage);
            break;
    
        default:
            console.log("None " + currentPage);
            break;
    }
    // console.log("SetPage to " + currentPage.id);


}
function Show(obj_){
    // console.log("Show " + obj_);
    obj_.style.display = "";
}
function Hide(obj_){
    // console.log("Hide " + obj_.id);
    obj_.style.display = "none";
}


// default mainpage buttons
const newGameButton_ = document.getElementById('newGameButton');
const findGameButton_ = document.getElementById('findGameButton');
const playOfflineButton_ = document.getElementById('playOfflineButton');
const backButtons_ = document.querySelectorAll('.backButton');

newGameButton_.addEventListener('click', () => MainMenuButtonClicked(newGameButton_));
findGameButton_.addEventListener('click', () => MainMenuButtonClicked(findGameButton_));
playOfflineButton_.addEventListener('click', () => MainMenuButtonClicked(playOfflineButton_));
backButtons_.forEach(button_ => {
    button_.addEventListener('click', () => MainMenuButtonClicked(button_.id));
});


async function MainMenuButtonClicked(buttonid_){
    switch (buttonid_) {
        case newGameButton_:
            await GenerateNewGameId();
            SetHomePageTo(newGamePage);
            UpdateIdOnNewGamePage(GetSavedData("deck_id"));
            PlayerSyncSetUp(1, GetSavedData("deck_id"));
            
            break;
        case findGameButton_:
            SetHomePageTo(findGamePage);
            break;
        case playOfflineButton_:
            window.location.href = "chessboard.html";
             break;
        case "backB":
            SetHomePageTo(defaultPage);
            CancelSearchSync = true;
            break;
    
        default:
            break;
    }
}
function StartGame(WhitePlayer_){
    // make sure all setting are good
    console.log("tried to start game ...##")
    window.location.href = "chessboard.html";
}




// Using Api try send data
async function GenerateNewGameId() {
    const apiUrl = "https://deckofcardsapi.com/api/deck/new/";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        SaveData("deck_id", data.deck_id);


    } catch (error) {
        console.error("Fetch Error:", error);
    }

}


function SaveData(deck_id__, data__){
    localStorage.setItem(deck_id__, data__);
    // console.log(`Saved Data //  ${deck_id__} -> ${data__}`);

    CheckSetPreciousId();

}






function UpdateIdOnNewGamePage(value__){
    document.getElementById("newGameIdValue").textContent = value__;
}

function GetSavedData(itemLable_){
    // console.log(itemLable_ + "  GotData:  " + localStorage.getItem(itemLable_));

    return localStorage.getItem(itemLable_);
}



async function TryLinkGameId(){
        const id = document.getElementById("idInput").value.trim().toString();
        console.log("trying id =" + id);
    try {
        
        const apiUrl = `https://deckofcardsapi.com/api/deck/${id}/`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        SaveData("deck_id", data.deck_id);
        console.log("Happy - Found");

        PlayerSyncSetUp(-1, data.deck_id);


        // StartGame(false);



    } catch (error) {
        // console.error("Fetch Error:", error);
        return null;
    }
    
}


function CheckSetPreciousId(idData_ = GetSavedData("deck_id")){
    if (idData_ != null) {
        document.getElementById("joinOldGame").style.display = "";
        document.getElementById("previous_id").style.display = "";
        document.getElementById("previous_id").textContent = `Previous id   ->   ${idData_}`;
    } else{
        document.getElementById("previous_id").style.display = "none";
        document.getElementById("joinOldGame").style.display = "none";

    }
}












//TODO Testing api system



let whitePlayer
// console.log( StringOfCardsCreator() );

// id__ = localStorage.getItem("deck_id");
// pileName_Main = "MainPile";
// pileName_White = "WhitePile";
// pileName_Black = "BlackPile";

// {deck created}, 
// now perform sync process
// PlayerSyncSetUp(whitePlayer);





// GetData();
CancelSearchSync = true;


async function PlayerSyncSetUp(whitePlayer, Game_id){
    CancelSearchSync = false;
    

    // id__ = localStorage.getItem("deck_id");
    id__ = Game_id;
    pileName_Main = "MainPile";
    pileName_White = "WhitePile";
    pileName_Black = "BlackPile";


    ColourSetupDone = 0;

    attemptsWhileLoop = 0;
    while (ColourSetupDone != 1 & ( attemptsWhileLoop < 1000 || !CancelSearchSync ) ) {

        // depend on players side..
        switch (whitePlayer) {
            case 1:
                //* white 
                if (ColourSetupDone != 0.5) {
                    
                    // check if 0.5 already has been done
                    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/list/`);
                    if (d != null) {                        
                        c = d?.piles?.MainPile?.remaining ?? -1;
                        if (c >= 40) {   
                            ColourSetupDone = 0.5;
                            console.log("already set up 0.5 (White)");
                            break;
                        }
                    }
                    
                    else{
                        // place cards in main pile to signal ready  (draw then place)
                        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/draw/?count=52`);
                        // console.log(`https://deckofcardsapi.com/api/deck/${id__}/draw/?count=52`);
                        
                        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);
                        // console.log(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);

                        ColourSetupDone = 0.5;
                        console.log("setup 0.5 (White)");

                        // d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/list/`);
                        // console.log(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/list/`);

                        // c = d?.piles?.MainPile?.remaining ?? -1;
                        // console.log(c);

                    }

                    
                }
                else{
                    //see if black is set up, if so do setup 1
                    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Black}/list/`);
                    if (d != null) {
                        c = d?.piles?.BlackPile?.remaining ?? -1;
                        console.log(c + "  c");
                        if (c >= 10) {
                        
                            // put cards back in main
                            d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Black}/draw/?cards=0H,JH,QH,KH,2H,3H,4H,5H,6H,7H`);
                            d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=0H,JH,QH,KH,2H,3H,4H,5H,6H,7H`);
    
                            ColourSetupDone = 1;
                            console.log("setup 1 (White)");

                            ConfirmToStartGame(1);
    
                            // both player should now have setup 1 done, both should move to chessboard page, 
                            // landing on chessboardpage, theyre should be waiting for user movement (white: useinput, black: whitePile to have something)
    
                        }
                    }
                    


                }
                


                
                break;


            case -1:
                //* Black
                // check if it already has been done
                d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Black}/list/`);
                if (d != null) {
                    c = d?.piles?.BlackPile?.remaining ?? -1;
                    if (c >= 10) {
                        ColourSetupDone = 1;
                        console.log("already set up 1 (Black)");
                        break;
                    }
                }
                

                //check if white 0.5 is done and we're ready for black to process
                d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/list/`);
                if (d != null) {
                    c = d?.piles?.MainPile?.remaining ?? -1;
                    if (c >= 52) {   
                    //!  if (d.piles.MainPile.remaining >= 52) {      <-didnt work
                        // take key cards out of main and put in black to signal ready
                        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/draw/?cards=0H,JH,QH,KH,2H,3H,4H,5H,6H,7H`);    //? had 1H which doesnt exist, so it returned 9 cards
                        d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Black}/add/?cards=0H,JH,QH,KH,2H,3H,4H,5H,6H,7H`);
                        ColourSetupDone = 1;
                        console.log("setup 1 (Black)");
                        break;
                    }
                }
                

    
            default:
                break;
    }

        console.log(`WhileLoopCycle   ${whitePlayer}  ${ColourSetupDone}` );

        if (ColourSetupDone != 1 & ( attemptsWhileLoop < 1000 || !CancelSearchSync)) {
            await new Promise(r => setTimeout(r, delayChecks)); // second delay Before trying again
        }

        attemptsWhileLoop++;
    }

    if (ColourSetupDone === 1 & whitePlayer === -1) {
        ConfirmToStartGame(-1);
    }


    
}

async function GetData(){


    let d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/draw/?count=52`);
    // d = await (`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);


    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/list/`);
    console.log(d.piles.MainPile.cards);


    //! --  set up done


    //assuming its ur go

    //get ur move
    yy1 = 6;
    xx1 = 7;
    yy2 = 5;
    xx2 = 5;

    //pull cards
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/draw/?count=52`);

    //assuming xx and yy is in range of grid
    xx1 = xx1 + "S";
    yy1 = yy1 + "D";
    xx2 = xx2 + "C";
    yy2 = yy2 + "H";


    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_White}/add/?cards=${xx1},${yy1},${xx2},${yy2}`);
    

    //! other player

    // wait till 4 cards are seen, 
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_White}/list/`);
    // decode and save them
    d = d.piles.WhitePile.cards
    console.log(d.length);
    let p = [-1,-1,-1,-1];
    for (let i = 0; i < d.length; i++) {
        p[i] = d[i].code[0];
    }
    console.log(p);

    // pull them back
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_White}/draw/?cards=${d[0].code},${d[1].code},${d[2].code},${d[3].code}`);
    





    // Push back into pile
    d = await GetDataFromApi(`https://deckofcardsapi.com/api/deck/${id__}/pile/${pileName_Main}/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH`);
    console.log(d);
        
        






    







    //  new deck
    //, 
    //let d = GetDataFromApi("https://deckofcardsapi.com/api/deck/fd3uc3nl00uc/draw/?count=52");
    //let d = GetDataFromApi("https://deckofcardsapi.com/api/deck/fd3uc3nl00uc/pile/MainPile/add/?cards=AS,2S,3S,4S");
    //let d = GetDataFromApi("https://deckofcardsapi.com/api/deck/fd3uc3nl00uc/pile/MainPile/add/");
    //https://deckofcardsapi.com/api/deck/l3y1y1qkozi5/pile/MainPile/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH
    
    
    
    
    
    //  fd3uc3nl00uc



}

function StringOfCardsCreator(){
    // All
    let str = "";

    
    let suit = ["S","D","C","H"];

    for (let s = 0; s < suit.length; s++) {
        let su = suit[s];


        for (let i = 1; i <= 13; i++) {

            switch (i) {
                case 1:
                    str+= `A`
                    break;
                case 10:
                    str+= `0`
                    break;
                case 11:
                    str+= `J`
                    break;
                case 12:
                    str+= `Q`
                    break;
                case 13:
                    str+= `K`
                    break;
            
                default:
                    str+= i;
                    break;
            }


            str+= su;


            if (i != 13) {
                str+= ",";
            }
            
            
        }

        if (su != "H") {
            str+= ",";
        }
        
    }

    return str;

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


async function ConfirmToStartGame(playerisWhite){
    
    console.log("StartGame");
    StartGame(playerisWhite);

}
