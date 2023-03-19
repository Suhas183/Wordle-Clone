import React from "react"
import Header from "./components/Header"
import Word from "./components/Word"
import Letter from "./components/Letter"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faL} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  function stateInitializerforarrays(row)
  {
    const new_array = []
    for(let i = 0; i < row.length; i++)
    {
      new_array.push({value: row[i],
                      isNotPresent: false,
                      incorrectPosition: false,
                      correctPosition: false,
                      submitted: false})
    }

    return new_array
  }

  const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
  const row2 = ['A','S','D','F','G','H','J','K','L']
  const row3 = ['Z','X','C','V','B','N','M']        
  const [elements,setElements] = React.useState(Array(30).fill({
                                                                  value: "",
                                                                  isNotPresent: false,
                                                                  incorrectPosition: false,
                                                                  correctPosition: false,
                                                                  submitted: false}))
  const [row,setRow] = React.useState(1)
  const [col,setCol] = React.useState(1)
  const [guessWord,setGuessWord] = React.useState("")
  const [lastBox,setLastBox] = React.useState(false)
  const [trueWord,setTrueWord] = React.useState("")
  const [firstRow,setFirstRow] = React.useState(stateInitializerforarrays(row1))
  const [secondRow,setSecondRow] = React.useState(stateInitializerforarrays(row2))
  const [thirdRow,setThirdRow] = React.useState(stateInitializerforarrays(row3))
  const [gameWon,setGameWon] = React.useState(false)
  const [gameOver, setGameOver] = React.useState(false)

  console.log(trueWord)

  React.useEffect(function() {
                  fetch("https://random-word-api.herokuapp.com/word?length=5")
                  .then(res => res.json())
                  .then(data => setTrueWord(data.toString().toUpperCase()))
  },[gameOver])

                                                
  const wordComponents = elements.map(element => <Word key={nanoid()} 
                                                       value={element.value}
                                                       isNotPresent={element.isNotPresent}
                                                       incorrectPosition={element.incorrectPosition}
                                                       correctPosition={element.correctPosition}
                                                       submitted={element.submitted} />)
  
  const firstRowLetters = firstRow.map(element => <Letter key={nanoid()} 
                                                          value={element.value}
                                                          isNotPresent={element.isNotPresent}
                                                          incorrectPosition={element.incorrectPosition}
                                                          correctPosition={element.correctPosition}
                                                          submitted={element.submitted} 
                                                          class="letter--normal"
                                                          handleClick={keyClicked}/>) 

  const secondRowLetters = secondRow.map(element => <Letter key={nanoid()} 
                                                            value={element.value}
                                                            isNotPresent={element.isNotPresent}
                                                            incorrectPosition={element.incorrectPosition}
                                                            correctPosition={element.correctPosition}
                                                            submitted={element.submitted} 
                                                            class="letter--row2"
                                                            handleClick={keyClicked}/>)
                                                  
  const thirdRowLetters = thirdRow.map(element => <Letter key={nanoid()} 
                                                          value={element.value}
                                                          isNotPresent={element.isNotPresent}
                                                          incorrectPosition={element.incorrectPosition}
                                                          correctPosition={element.correctPosition}
                                                          submitted={element.submitted} 
                                                          class="letter--row3"
                                                          handleClick={keyClicked}/>)                                                
                                                

  function keyClicked(val){
    if(guessWord.length < 5)
    {
    const valReceived = val
    setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + col - 1 === ind) ? {...ele, value : valReceived} : ele))
    setGuessWord(prevWord => prevWord + valReceived)
    if(col == 5)
    {
      setLastBox(true)
    }

    if(col < 5){
    setCol(prevCol => prevCol + 1)
    }
  }
    
  }

  function deleteLetter()
  {
    if(lastBox)
    {
      setLastBox(false)
      setGuessWord(prevWord => prevWord.slice(0,prevWord.length - 1))
      setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + col - 1 === ind) ? {...ele, 
      value : ""} : ele))
      setCol(prevCol => prevCol + 1)
    }

    else if(col > 1)
    {
      setGuessWord(prevWord => prevWord.slice(0,prevWord.length - 1))
      setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + col - 2 === ind) ? {...ele, 
      value : ""} : ele))
    }

    if(col > 1)
    {
      setCol(prevCol => prevCol - 1)
    }
  }




  function submitWord()
  {
    if(guessWord.localeCompare(trueWord) === 0)
    {
      for(let i = 1; i <= 5; i++)
      {
        setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + i - 1 === ind) ? {...ele, 
          correctPosition : true, submitted : true} : ele))

          if(row1.includes(guessWord[i-1]))
          {
            setFirstRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
              correctPosition : true, submitted : true} : ele))
          }

          else if(row2.includes(guessWord[i-1]))
          {
            setSecondRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
              correctPosition : true, submitted : true} : ele))
          }

          else{
            setThirdRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
              correctPosition : true, submitted : true} : ele))
          }
      }

      setGameWon(true)
      setGameOver(true)
      alert("You have won")
    }

    else{

        if(guessWord.length == 5)
        {
          let index
          for(let i = 1; i <= 5; i++)
          {
            index = trueWord.indexOf(guessWord[i-1])
            console.log(index)

            if(index === -1)
            {
              setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + i - 1 === ind) ? {...ele, 
                isNotPresent : true, submitted : true} : ele))
                if(row1.includes(guessWord[i-1]))
                {
                  setFirstRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    isNotPresent : true, submitted : true} : ele))
                }

                else if(row2.includes(guessWord[i-1]))
                {
                  setSecondRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    isNotPresent : true, submitted : true} : ele))
                }

                else{
                  setThirdRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    isNotPresent : true, submitted : true} : ele))
                }
            }

            else if(index === i-1){
              setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + i - 1 === ind) ? {...ele, 
                correctPosition : true, submitted : true} : ele))

                if(row1.includes(guessWord[i-1]))
                {
                  setFirstRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    correctPosition : true, submitted : true} : ele))
                }

                else if(row2.includes(guessWord[i-1]))
                {
                  setSecondRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    correctPosition : true, submitted : true} : ele))
                }

                else{
                  setThirdRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    correctPosition : true, submitted : true} : ele))
                }
            }

            else{
              setElements(prevElements => prevElements.map((ele,ind) => ((row-1)*5 + i - 1 === ind) ? {...ele, 
                incorrectPosition : true, submitted : true} : ele))

                if(row1.includes(guessWord[i-1]))
                {
                  setFirstRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    incorrectPosition : true, submitted : true} : ele))
                }

                else if(row2.includes(guessWord[i-1]))
                {
                  setSecondRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    incorrectPosition: true, submitted : true} : ele))
                }

                else{
                  setThirdRow(prevElements => prevElements.map((ele) => (ele.value === guessWord[i-1]) ? {...ele, 
                    incorrectPosition: true, submitted : true} : ele))
                }  
            }
        }
        setGuessWord("")
        setLastBox(false)
        setRow(prevRow => prevRow + 1)
        setCol(1)
    
        if(row === 7)
        {
          setGameOver(true)
          alert(`Game Over!! You LOST\nThe correct word is ${trueWord}`)
        }
        }

        else{
          alert("Not enough letters")
        }   
  }
  }

  function newGame(){
    setElements(Array(30).fill({
      value: "",
      isNotPresent: false,
      incorrectPosition: false,
      correctPosition: false,
      submitted: false}))

    setCol(1)
    setRow(1)
    setGuessWord("")
    setLastBox(false)
    setFirstRow(stateInitializerforarrays(row1))
    setSecondRow(stateInitializerforarrays(row2))
    setThirdRow(stateInitializerforarrays(row3))
    setGameWon(false)
    setGameOver(false)
  }

  return (
  
   <div className="flex flex-col items-center">
    {gameWon && <Confetti />}
    <Header />

    <div className="w-[300px] h-[360px] grid grid-cols-5 grid-rows-6 mt-3">
      {wordComponents}
    </div>

    <div className="w-[500px] h-[198px] flex flex-col items-center justify-center mt-2">
            <div className="row-1 mb-[6px]">
              {firstRowLetters}
            </div>

            <div className="row-2 mb-[6px]">
              {secondRowLetters}
            </div>

        <div className="row-3">
                <button className="letter--special" onClick={submitWord}>ENTER</button>
                {thirdRowLetters}
                <button className="letter--special" onClick={deleteLetter}><FontAwesomeIcon icon={faDeleteLeft} /></button>
            </div>
        </div>

        {gameOver && <button onClick={newGame} className="w-[150px] h-[58px] bg-[#D3D6DA] rounded font-semibold font-franklin text-sm">New Game</button>}

   </div>
  )
}

export default App
