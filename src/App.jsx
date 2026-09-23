import React, {useState} from 'react'
import {useEffect} from 'react'

const App = () => {

  const [daata, setDaata] = useState([]);

  const [index, setIndex] = useState(1);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("")

  async function getData(){
    setError(null);
    try{
       let response = await fetch(`https://picsum.photos/v2/list?page=${index}&limit=14`);

       if(!response.ok){
        throw new Error("Something went wrong");
       }

    let data = await response.json();
    
    setDaata(data);
    }

    catch(error){
      setError("Failed to load images. PLease try again");
    }

   
    
  }

  useEffect(function(){
    getData();
  },[index])

  let printUserData = <h3 className='text-2xl absolute top-[50%] left-[50%]'>
    loading....
  </h3>

  let filteredData = daata.filter(function(elem){
  return elem.author.toLowerCase().includes(search.toLowerCase());
});

 if(daata.length > 0){
  if(filteredData.length > 0){
    printUserData = filteredData.map(function(elem, idx){
      return <a key={idx} href={elem.url} target='_blank' rel="noopener noreferrer">
        <div>
          <div>
            <img className='h-50 w-50 rounded-2xl object-cover' src={elem.download_url} alt="" />
            <h2 className='font-semibold mt-0.5'>{elem.author}</h2>
          </div>
        </div>
      </a>
    })
  } else {
    printUserData = <h3 className='text-2xl absolute top-[50%] left-[50%]'>No results found on this page</h3>
  }
} else if(error !== null){
  printUserData = <h3 className='text-2xl absolute top-[50%] left-[50%] text-red-400'>{error}</h3>
}

 
  return (

   
    <div className='bg-black h-screen text-white overflow-auto p-3'>
     
      <div className='flex justify-center mb-4'>
      <input 
        type="text" 
        placeholder="Filter authors on this page..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        className='bg-white text-black px-4 py-2 rounded-xl w-64'
      />
    </div>
    <div className='flex h-[82%] flex-wrap gap-4 '>
      {printUserData}
      
    </div>

    <div className='flex justify-center  gap-4 mt-2'>

      <button onClick={()=>{
        if(index>1){
             setIndex(index-1);
             setDaata([]);
             setSearch("");
          
        }
         
      }} 
      className='bg-amber-300 text-black px-5 py-4 rounded-2xl cursor-pointer active:scale-95'>Prev</button>

      <p className='mt-3'>Page {index}</p>

      <button onClick={()=>{
       setIndex(index+1);
          setDaata([]);
          setSearch("")
       
      }} 
      className='bg-amber-300 text-black px-5 py-4 rounded-2xl cursor-pointer active:scale-95'>Next</button>
    </div>
      
    </div>
  )
}

export default App