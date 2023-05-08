import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';

export function AdviceGenerator() {
  let [advice , setAdvice] = useState("");
  let [id, setid] = useState("")
  let [clicked , setClicked] = useState(false)
  let handleKey= (e)=>{
    if (e.key==='Enter'){
      setClicked(true)
    }
  }
  useEffect(()=>{
    document.addEventListener("keypress", handleKey)
    fetch("https://api.adviceslip.com/advice")
      .then(response => {
        if(response.ok) return response.json()
        else throw new Error("Status error: "+ response.status)
      })
      .then(data => {
        setAdvice(data.slip.advice)
        setid(data.slip.id)
        setClicked(false)
      })
      .catch(error => console.log(error))
  },[clicked])
  return(
    <section className='container'>
      <h1 className='title'>Advice #{id}</h1>
      <p className='advice'>"{advice}"</p>
      <div className='separator'></div>
      <div className='button' onClick={()=> setClicked(true)}><i className="fa-solid fa-dice-five fa-xl fa-spin"></i></div>
    </section>
  )
  
}
