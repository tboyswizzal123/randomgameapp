import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import ping from './Components/Sounds/ping.mp3'
import ding from './Components/Sounds/ding.mp3'
import {v4 as uuidv4}from 'uuid'; 
import generic from './Components/Pictures/generic.jpg';
import monkeySound from './Components/Sounds/monkeySound.mp3'
import monkey2Sound from './Components/Sounds/monkey2Sound.mp3'
import {gamesState ,moneyState, oMoneyState} from './atoms.js';
import {atom, useRecoilState} from 'recoil';


function App() {

  const [winnersChoice, changeWinnersChoice] = useState('Winners: (Roll for choice)');
  const choices=['Winners: Reroll', 'Winners: Reroll', 'Winners: Choice', 'FULL RANDOM'];
  const [isActiveO, setIsActiveO] = useState(false);
  const [isActiveT, setIsActiveT] = useState(false);
  const [isActiveTh, setIsActiveTh] = useState(false);
  const [games, setGames] = useRecoilState(gamesState);
  const [game,setGame]= useState('');
  const [moneyO, setMoneyO] = useRecoilState(moneyState);
  const [dollars, setDollars] = useState('');
  const [dollarsT, setDollarsT] = useState('');
  const [moneyT, setMoneyT] = useRecoilState(oMoneyState);
  const [gameWinner, setGameWinner] = useState('Roll for game');
  var i=0;
  var prev;
  var randy;
  



  function playPing(){
    new Audio(ping).play();
  }

  function playDing(){
    new Audio(ding).play();
  }

  function playMonkey1(){
    new Audio(monkeySound).play();
  }

  function playMonkey2(){
    new Audio(monkey2Sound).play();
  }

  const gameRoll = () => {
    var rando = Math.floor(Math.random() * games.length);
    while (randy==rando){
      rando=Math.floor(Math.random() * choices.length);
    }
    randy=rando;
    setGameWinner(games[rando].name);
    playDing();
    
  }

  const winnerRoll = () =>{
    var rand= Math.floor(Math.random() * choices.length);
    while (prev==rand){
        rand=Math.floor(Math.random() * choices.length);
    }
    prev=rand;
    if (rand==0 || rand==1){
      setIsActiveO(true);
      setIsActiveT(false);
      setIsActiveTh(false);
    }
    if (rand==2){
      setIsActiveO(false);
      setIsActiveT(true);
      setIsActiveTh(false);
    }
    if (rand==3){
      setIsActiveO(false);
      setIsActiveT(false);
      setIsActiveTh(true);
    }
    
    changeWinnersChoice(choices[rand]);
    i++;
    if (i<10){
      playPing();
      setTimeout(winnerRoll,300);
    }
    if(i==10){
      playDing();
      i=0;
    }
  }

  const addGame = (e) =>{
    e.preventDefault();
    console.log(game);
    var newGames=([...games, {id:uuidv4(), name:game}]);
    var sortedGames=newGames.sort((a, b) => a.name.localeCompare(b.name))
    setGames(sortedGames);
    console.log(sortedGames);
    setGame('');
    console.log(games);
  }

  const deleteG=({id}) => {
    setGames(games.filter((name)=> name.id !== id));

}

  return (
    <div className='App d-flex flex-row'>
      <div className='SideBar p-5'>
        <div className='WinnersSelect'>
          <h3 className='text-light'>{winnersChoice}</h3>
          <h4 className={isActiveO ? 'winner text-center' : 'choice text-center'}>Winners Reroll</h4>
          <h4 className={isActiveT ? 'winner text-center' : 'choice text-center'}>Winners Choice</h4>
          <h4 className={isActiveTh ? 'winner text-center' : 'choice text-center'}>FULL RANDOM</h4>
        </div>
        <Button onClick={winnerRoll}className='w-100 btn-success'>Roll Now</Button>
        <div className='mt-5 addGame'>
          <h3 className='text-light text-center'>ADD GAME </h3>
          <div className='form-group'>
              <input type='game' value={game} onChange = {(e) => setGame(e.target.value)}className='form-control' placeholder='Enter Game'/>
              <Button  onClick={addGame} className='mt-2 w-100'>Add to list</Button>
          </div>
        </div>
        <h1 className='mt-3 text-danger'>Budget Tracker</h1>
        <div className='pictures d-flex justify-content-evenly'>
          <div>
          <img onClick={()=> playMonkey1()} src={generic}/>
          <p className='text-light'>MORTIMUS PRIME </p>
          <h5  className='text-light'>{moneyO} $  </h5>
          <div className='d-flex'>
            <input className='w-100' type="number" value={dollars} onChange = {(e) => setDollars(e.target.value)}/> 
          </div>
          <div className='d-flex'>
          <Button disabled={dollars==''} onClick={(e)=> {setMoneyO(parseInt(moneyO)+parseInt(dollars)); setDollars(''); }}className='w-50' >Add</Button>
          <Button disabled={dollars==''} onClick={(e)=> {setMoneyO(parseInt(moneyO)-parseInt(dollars)); setDollars(''); }} className='w-50' type="submit">Sub</Button>
          </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className='d-flex flex-column align-items-center'>
      <div className='d-flex flex-column'>
      <div className='Main'>
      <h3 className='text-light d-flex justify-content-center'>{gameWinner}</h3>
      <div className='lists d-flex'>
        <div className='GameList'>
          {games.slice(0,15).map((name)=>
          <div className='d-flex'>
          <li className={'listStyle'} key={name.id}>
            <p>{name.name} </p>
            </li>
            <div className="">
                            <Button className='deleteButton' onClick={()=>deleteG(name)} variant='danger'>DELETE </Button>
              </div>
          </div>
          )}
        </div>  
        <div className='GameList2 ms-5'>
          {games.slice(15,30).map((name)=>
          <div className='d-flex'>
          <li className={'listStyle'} key={name.id}>
            <p>{name.name} </p>
            </li>
            <div className="">
                            <Button className='deleteButton' onClick={()=>deleteG(name)} variant='danger'>DELETE </Button>
              </div>
          </div>
          )}
        </div> 
        <div className='GameList3 ms-5'>
          {games.slice(30,45).map((name)=>
          <div className='d-flex'>
          <li className={'listStyle'} key={name.id}>
            <p>{name.name} </p>
            </li>
            <div className="">
                            <Button className='deleteButton' onClick={()=>deleteG(name)} variant='danger'>DELETE </Button>
              </div>
          </div>
          )}
        </div> 
        
      </div>
      
      </div>
      
      
    </div>
      <Button className='roll' onClick={gameRoll}>CLICK TO ROLL FOR GAME</Button>

    </div>
    </div>
  );
}

export default App;
