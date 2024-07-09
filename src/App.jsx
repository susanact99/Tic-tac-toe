
import { useState } from 'react';
import confetti from 'canvas-confetti'
import Square from './component/Square';
import { turns, winner_combo } from './component/Constants';
import './App.css';
import './index.css'



function App() {

const [board, setBoard] = useState(() =>{
  const boarFromStorage = window.localStorage.getItem('board')
  return boarFromStorage? JSON.parse(boarFromStorage): Array(9).fill(null)
})

const [turn, setTurn] = useState(()=>{
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? turns.X
})

const [winner, setWinner] = useState(null)//si es null no hay ganador, si es false empate 

const checkWinner = (boardCheck)=>{
  for(const combo of winner_combo){
    //REVISAR LA SCOMBINACIONES GANADORAS PARA VER SI X U O GANÓ
    const [a, b, c] = combo
    if(
      boardCheck[a]&&
      boardCheck[a]===boardCheck[b]&&
      boardCheck[a]===boardCheck[c]
    ){return boardCheck[a]}
  }
  return null
}

const resetGame =()=>{
  setBoard(Array(9).fill(null))
  setTurn(turns.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')

}

const checkEndGame =(newBoard)=>{
  //Revisamos si hay un empate, si no hay mas espacios vacios
  return newBoard.every((square) => square !== null)
}


const updateBoard = (index) => {
  //EVITAR QUE SE SOBREESCRIBA
  if(board[index]|| winner) return
  //ACTUALIZAR TABLERO
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
  //CAMBIAR DE TURNOS
  const newTurn = turn === turns.X ? turns.O : turns.X;
  setTurn(newTurn)
  //GUARDAR LA PARTIDA
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)
  //REVISAR SI HAY GANADOR
  const newWinner = checkWinner(newBoard)
  if (newWinner){
    confetti()
    setWinner(newWinner)
  }else if (checkEndGame(newBoard)){
    setWinner(false)
  }
 
}


  return (
    <main className='board'>
      <h2>Tic tac toe game</h2>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <section className='game'>
        {
          board.map((_, index)=>{
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
      <Square isSelected={turn===turns.X}>
        {turns.X}
      </Square>
      <Square isSelected={turn===turns.O}>
        {turns.O}
      </Square>
      </section>
      {
        winner!==null&&(
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner=== false? 'Empate': 'Ha ganado:'
                }
              </h2>
              <header className='win'>
                {winner&&<Square>{winner}</Square>}
              </header>

              <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
            </div>

            
          </section>
        )
      }
    </main>
  );
}

export default App;
