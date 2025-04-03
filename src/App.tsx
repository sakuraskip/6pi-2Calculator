import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className='main'>
      <Calculator/>
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
  const [display,setDisplay] = useState<string|null>(null)
  let displayCache:string|null = null;
  
  function handleKeyboard(event:React.KeyboardEvent<HTMLDivElement>)
  {
    if(event.key === '=' || event.key === 'Enter') calculate();
    else if(event.key === 'Backspace') deleteSymbolClick();
    else if(buttons.includes(event.key)) buttonClick(event.key);
    console.log(event.key)
  }
  return (
    <div className='calculator' tabIndex={0} onKeyDown={(click)=>handleKeyboard(click)}>
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
    </div>
  )
  function calculate():void
  {
    if(display != null)
    {
      displayCache = display
      const result = safeEvaluation(display)
      console.log(result)
      if(result!== null && result!== undefined)
      {
        setDisplay(result.toString());
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
    setDisplay((display)=>
    {
      if(display!=null)
      {
        return display+buttonValue;
      }
      else
      return buttonValue
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
      else
      return display;
    })
  }

  
}

export default App;
