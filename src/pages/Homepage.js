import  {React,useState,useEffect} from 'react'
import Search from '../component/Search';
import Picture from '../component/Picture';


const Homepages = () => {
  const [input , setInput] = useState("");
  let [data , setData] = useState(null);
  let [page , setPage] = useState(1);
  let [currentSearch , setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001745e47eec980413bbef95a7da780e056";
  const initialURL ="https://api.pexels.com/v1/curated?page=1&per_page=15"; 
  const searchURL =`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  //Fetch data from pexels API
  const search = async (url) =>{
    setPage(2);
    const dataFetch = await fetch(url,{
      method:"GET",
      headers:{
        Accept:"application/json",
        Authorization:auth,
      },     
    });

    let parsedData = await dataFetch.json();
    setData(parsedData.photos);
    
  };


  // Load more picture
  const morepicture = async ()=>{
    
      let newURL;
      if(currentSearch === ""){
          newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
      }else{
        newURL =`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
      }
    setPage(page + 1);
    const dataFetch = await fetch(newURL,{
      method:"GET",
      headers:{
        Accept:"application/json",
        Authorization:auth,
      },     
    });

    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.photos));
  }


  //Fetch data when the page Loads up
  useEffect(()=>{
    search(initialURL);
  },[])

  useEffect(()=>{
    if(currentSearch === ""){
      search(initialURL);
    }else{
      search(initialURL);
    }
    search(searchURL);
  },[currentSearch])
  
    return (
    <div style={{minHeight:"100vh"}}>
        <Search search={()=>{

          // JS closure
          setCurrentSearch(input);
          
        }} 
        setInput={setInput}/>
        <div className="pictures">
          {
            data && data.map(
              (d)=>{ 
              return <Picture data={d}/>
            })
          }
        </div>
        <div className="morePicture">
          <button onClick={morepicture}>Load More</button>
        </div>
    </div>
  );
};

export default Homepages