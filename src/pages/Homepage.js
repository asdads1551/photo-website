import  {React,useState,useEffect} from 'react'
import Search from '../component/Search';
import Picture from '../component/Picture';


const Homepages = () => {
  const [input , setInput] = useState("");
  const [data , setData] = useState(null);
  const auth = "563492ad6f91700001000001745e47eec980413bbef95a7da780e056";
  const initialURL ="https://api.pexels.com/v1/curated?page=1&per_page=15"; 
  const searchURL =`https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  //Fetch data from pexels API
  const search = async (url) =>{
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

  //Fetch data when the page Loads up
  useEffect(()=>{
    search(initialURL);
  },[])
  
    return (
    <div style={{minHeight:"100vh"}}>
        <Search search={()=>{
          search(searchURL);
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
    </div>
  );
};

export default Homepages