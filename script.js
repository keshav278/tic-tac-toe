const gameBoard = (() =>{
    let cells = ['','','','','','','','',''] ;

    const board = document.querySelector('.gameboard');
    for(let i=0;i<9;i++)
    {
         let cell = document.createElement('div');
         cell.innerHTML=cells[i];
         cell.classList.add(`cell`);
         board.appendChild(cell);
    }
    const winningConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const checkWin = () =>{
        for(let condition of winningConditions)
           {
            if(cells[condition[0]]!=''&&cells[condition[0]]==cells[condition[1]]&&cells[condition[1]]==cells[condition[2]])
               {  let winner = cells[condition[0]];
                  for(let i=0;i<9;i++)
                  cells[i]='';
                  return winner;  
               }  
    }//Check for draw
    for(let cell of cells){
        if(cell==='')
          return 'N';
    }
    for(let i=0;i<9;i++)
        cells[i]='';
    return 'D';
    
} 
   const clearBoard = () => {
      let cel = document.querySelectorAll('.cell');
      cel.forEach(function(cell){
            cell.textContent='';
      });
   }
    return {
        cells,
        checkWin,
        clearBoard,
    };
})();

const Player = (type) =>{
    const mark = index =>{
           gameBoard.cells[index]=type;
    } 
    let points=0;
    return{
        mark,
        points,
    };
}
const playRound = (() =>{
   const X = Player('X');
   const O = Player('O');
   const gbody = document.querySelector('.gameboard');
   const result = document.querySelector('.roundresult');
   let boardClicks = 0;
   const reset = document.querySelector('.reset');
   reset.addEventListener('click',()=>{
         X.points=0;
         O.points=0;
         boardClicks=0;
         document.querySelector('.xscore').textContent='';
         document.querySelector('.oscore').textContent='';
         document.querySelector('.roundresult').textContent='';
   });
   gbody.addEventListener('click',(e)=>{
          if(e.target.innerHTML=='')
          {if(boardClicks%2==0)
            { document.querySelector('.roundresult').textContent="O's turn"; 
              X.mark(Array.prototype.indexOf.call(gbody.childNodes,e.target)-1);
              e.target.innerHTML='X';
             } 
          else 
            {  document.querySelector('.roundresult').textContent="X's turn";
                O.mark(Array.prototype.indexOf.call(gbody.childNodes,e.target)-1);
              e.target.innerHTML='O';
               }    
          console.log(gameBoard.cells);
          let roundStatus = gameBoard.checkWin();
          
          boardClicks++;
          if(roundStatus==='X'||roundStatus==='O'){
            let xscore = document.querySelector('.xscore');
            let oscore = document.querySelector('.oscore');
            if(roundStatus==='X')
              {
                X.points++;
                xscore.textContent=`${X.points}`;
              }
             else{
                O.points++;
                oscore.textContent=`${O.points}`;
             } 
             setTimeout(gameBoard.clearBoard,3000);
             result.textContent=`${roundStatus} Wins!`;
          }
          else if(roundStatus==='D'){
            setTimeout(gameBoard.clearBoard,3000);
            result.textContent = "It's a draw!";
          }
        }
    });
    

})(); 