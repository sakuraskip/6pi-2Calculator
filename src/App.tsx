import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isDarkTheme,setTheme] = useState<boolean>(false)

  function changeTheme()
  {
    setTheme(!isDarkTheme)
  }
  let themeClass:string = 'lightTheme'
  if(isDarkTheme)
  {
    themeClass = 'darkTheme'
  }
  return (
   
    <div className={`main ${themeClass}`}>
      <Calculator/>
      <button className='changetheme' onClick={changeTheme}>Сменить тему</button>
    </div>
    
  );
}
function safeEvaluation(expression:string)
{
  try
  {
    return new Function(`'use strict'; return (${expression})`)();
  }
  catch(ex)
  {
    alert(`ошибка при вычислении ` + ex)
  }
}
interface ButtonProps
{
  title:string,
  onClick: ()=>void
}
let buttons:Array<string> = ['1','2','3','+','4','5','6','-','7','8','9','*','0','C','/','<=','.','='];

function Display({value}:{value:string|null})
{
  return <div className='display'>{value}</div> 
}

function Button({title,onClick}:ButtonProps)
{
  return <button onClick={onClick}>{title}</button>
}
function Calculator()
{
  const [display,setDisplay] = useState<string|null>(null);
  const [history,updateHistory] = useState<string[]>([]);

  const handleKeyboard = (event:React.KeyboardEvent|KeyboardEvent) =>
    {
      if(event.key === '=')
      { 
          calculate();        
      }
      else if(event.key === 'Backspace')
        { 
          deleteSymbolClick();
        }
      else if(buttons.includes(event.key))
        { 
          buttonClick(event.key);
        }
      console.log("eventkey "+event.key)
    }
  useEffect(()=>
  {
   window.addEventListener('keydown',handleKeyboard)

   return ()=>
   {
    window.removeEventListener('keydown',handleKeyboard)
   }
  },[]);
  let displayCache:string|null = null;

  
  return (
    <div className='wrap'>
    <div className='calculator' tabIndex={0}>
      <Display value={display}/>
      <div className='buttons'>
        {buttons.map((button)=>
        (
          <Button key={button} title = {button} onClick={()=>
          {
            if(button === 'C') clearClick();
            else if (button === '=') calculate();
            else if(button === '<=') deleteSymbolClick();
            else buttonClick(button);
          }
          }></Button>
        ))}
      </div>
      <br/>
     
    </div>
    <div className='history'>
        {history.map((value,index)=>
        (
          <div key={index}>{value}</div>
        ))}
      </div>
    </div>
    
  )
 
 
  function calculate():void
  {
    if(display != null)
    {
      displayCache = display
      const result = safeEvaluation(display)
      if(result!== null && result!== undefined)
      {
        setDisplay(null);
        setDisplay(result.toString());
        updateHistory(history.concat(`${display} = ${result}`))
      }
      else
      {
        setDisplay(displayCache.toString())
      }
    }
    
  }
  function clearClick():void
  {
    setDisplay(null);
  }
  function buttonClick(buttonValue:string):void
  {
    console.log("button click" + buttonValue)
    setDisplay((display)=>
    {
      if(display!==null && display!==undefined)
      {
        return display+buttonValue;
      }
      else
      {
        return buttonValue
      }
     
    })
  }
  function deleteSymbolClick()
  {
    setDisplay((display)=>
    {
      
      if(display!=null)
      {
        display = display.toString()
        return display.slice(0,-1)
      }
      else return display;
      
    })
  }

  
}

export default App;
