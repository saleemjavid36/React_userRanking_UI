import React, { useEffect, useState } from 'react'
import './Home.scss'
import { GetUserRankingService } from './Home.service.ts'



const Home = () => {
    const [userss,setUsers]= useState([])
    const [changedvalue,setChangedValue]=useState()

    const GetAllUserData=()=>{
        GetUserRankingService.GetUserRanking().subscribe((res)=>{
          setUsers(res);
        })
    }
    useEffect(()=>{
        GetAllUserData()
    },[userss])

    const onchangeInputValue=(val,jsonval)=>{
        console.log(val.target.value);
        console.log(jsonval);
        if(val.target.value <= userss.length){
            const newvalue={...jsonval,ranking:Number(val.target.value)}
            setChangedValue(newvalue)
        }else{
            setChangedValue(jsonval)
        }
        
    }
   const onclickSubmit=()=>{
    if(changedvalue !== undefined){
        GetUserRankingService.UpdateRank(changedvalue)
    }
    }
  return (
    <div className='main-container' >
        <div className="table-main-container">
            <div className="header-container">
                <div className="header-name-container">NAME</div>
                <div className="header-name-container">RANKING</div>
            </div>
            {userss.map(e=>(
               <div className="user-container" key={e.id}>
                    <div className="user-name-container" >{e.name}</div>
                    <div className="user-rank-container" >
                        <input type="number"  defaultValue={e.ranking} max={userss.length} min={1} className='user-rank-input' onChange={val=>onchangeInputValue(val,e)}/>
                    </div>
                </div>
            ))}

            <div className="submitbuttoncontainer">
                <button className='button' onClick={onclickSubmit}>Submit Rank</button>
            </div>
        </div>
    </div>
  )
}

export default Home