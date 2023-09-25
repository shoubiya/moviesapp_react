import react,{useState,useEffect} from 'react'
import { Filter, Search } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import { Link ,Navigate} from 'react-router-dom';
import axios from "axios";
import "./Home.css";
import {
        MDBTable,
        MDBTableHead, 
        MDBTableBody,
        MDBRow,
        MDBCol,
        MDBContainer,
        MDBBtn,
        MDBBtnGroup
       } from "mdb-react-ui-kit"

export default function Home() {
    const[data,setData]=useState([]);
    const[value,setValue]=useState("");
    const[sortValue,setSortValue]=useState("");
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(1)
    const [records, setRecords] = useState([])
    const [selectedValue, setSelectedValue] = useState(10)
  
    
    const sortOptions = ["name","race",'gender'];
    const apiToken='6YF5GelzCHYUV1VqX4fe';
      
   
    
    useEffect(()=>{
      const api =axios.create({
        baseURL:'https://the-one-api.dev/v2/character',
      });
      
  axios.get(`https://the-one-api.dev/v2/character/?page=${page}&limit=${selectedValue}`,{headers})
    .then((response)=>{
      console.log("response===>",response)
      setData(response.data.docs);
      setRecords(response.data.docs);
      setCount(response.data.pages);
  
      })
    .catch((error)=>{
      console.error('Error',error);
    });
    console.log("Data:",data)
    
    },[selectedValue]);
     
    
   const headers ={
      Authorization: `Bearer ${apiToken}`,
    };
   
    const handleChange = async (e, p) => {
      await axios.get(`https://the-one-api.dev/v2/character/?page=${p}&limit=${selectedValue}`, { headers })
        .then((response) => {
          setData(response.data.docs);
        })
        console.log(p, 'p')
      setPage(p)
    }
    
    const handleDropdownChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      setSelectedValue(newValue);
    }
  
    console.log(data, 'data final')
  
    const handleSearch = async(e)=>{
      e.preventDefault();
      return await axios.get(`https://the-one-api.dev/v2/character?name=${value}`,{headers})
      .then((response)=>{
       setData(response.data.docs);
       console.log("value",value)
        setValue(response.data.docs);
      })
      
    };
    const handleSort= async(e)=>{
      let value=e.target.value;
      setSortValue(value);
      return await axios.get(`https://the-one-api.dev/v2//character?sort=${value}:asc`,{headers})
      .then((response)=>{
       setData(response.data.docs);
     })
     .catch((error)=>console.log(error));
    };
    const handleFilter= async(value)=>{
    return await axios.get(`https://the-one-api.dev/v2/character?race=${value}`,{headers})
      .then((response)=>{
       setData(response.data.docs);
     })
     .catch((error)=>console.log(error));
    };
    const handleFilterr= async(value)=>{
      return await axios.get(`https://the-one-api.dev/v2/character?gender=${value}`,{headers})
        .then((response)=>{
         setData(response.data.docs);
       })
       .catch((error)=>console.log(error));
      };
      const viewSingle = (id)=>{
        Navigate(`/Details/${id}`)
        console.log(id);
      }
  return (
    <div className='bdy1'>
    <MDBContainer >
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
      }}
      className="d-flex input-group w-auto "
      onSubmit={handleSearch}>
        
            <input
             type='text'
             className='form-control'
             placeholder='search Name'
             value={value}
             onChange={(e)=>setValue(e.target.value)}></input>
             
              <MDBBtn type='submit' color='dark'> Search</MDBBtn>
              
             
      </form>
      <MDBRow>
        
        <MDBCol size={8}>
          <h5 className='sort'>Sort By</h5>
          <select style={{width:"50%",borderRadius:"2px",height:"35px",marginLeft:"-200px"}}
          onChange={handleSort}
          value={sortValue} >
            <option>Please Select Value</option>
            {
              sortOptions.map((item,index)=>{
                return<option value={item} key={index}>{item}</option>
              })
            }
          </select>
        </MDBCol>
        
        
        <MDBCol size={4}><h5 className='fil'>Filter By Race:</h5>
        <MDBBtnGroup>
            <MDBBtn  onClick={()=>handleFilter("Human")}>Human</MDBBtn>
            <MDBBtn  style={{marginLeft:"2px"}} onClick={()=>handleFilter("Elf")}>Elf</MDBBtn>
            <MDBBtn  style={{marginLeft:"2px"}} onClick={()=>handleFilter("Hobbit")}>Hobbit</MDBBtn>
            <MDBBtn  style={{marginLeft:"2px"}} onClick={()=>handleFilter("Dwarf")}>Dwarf</MDBBtn>
            
            
        </MDBBtnGroup>
           
            </MDBCol>
            <MDBCol size={4}><h5 style={{marginTop:"10px",marginLeft:"-25px"}} clas>Filter By Gender:</h5>
              <MDBBtnGroup>
          
                   <MDBBtn   onClick={()=>handleFilterr("Female")}>Female</MDBBtn>
                   <MDBBtn  style={{marginLeft:"2px"}} onClick={()=>handleFilterr("Male")}>Male</MDBBtn>
            
            
              </MDBBtnGroup>
           
            </MDBCol>
            
      </MDBRow>
      
      <div style={{marginTop:"40px"}}>
      <h2 className='text-center' style={{marginTop:"-40px",fontFamily:"fantasy"}}>
        Characters
      </h2>
      <MDBRow>
        <MDBCol size="12">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Race</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Action</th>
              </tr>
            </MDBTableHead>
          {data.length=== 0 ? (
              <MDBTableBody className='align-center mb-0'>
                <tr>
                  <td colSpan={8} className='text-center mb-0'>No data Found</td>
                </tr>
              </MDBTableBody>
            ) :(
            data.map((item,index)=>(
              <MDBTableBody key={index}>
                <tr>
                  <th scope='row'>{index+1}</th>
                  <td>{item.name}</td>
                  <td>{item.race}</td>
                  <td>{item.gender}</td>
                  <td><Link to={`/Details/${item._id}`}>Details</Link></td>
                </tr>
              </MDBTableBody>
            ))
          )}
          </MDBTable>
        </MDBCol>
      </MDBRow>
     
        <h5 className='lim'>Limit:</h5>
      <select id="dropdown" value={selectedValue} className='limt' onChange={handleDropdownChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <p className='val'>Selected value: {selectedValue}</p>
          </div>
      
      <br/>
      <div className='pg'><Pagination count={count} color='primary' className='page' onChange={handleChange}></Pagination></div>

    </MDBContainer>
    </div>
  );
  
}
