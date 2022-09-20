import {React, useEffect, useState} from 'react'
import finnHub from '../apis/finnHub';

function AutoComplete() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const fetchData = async () => {
        try {
            const response = await finnHub.get("/search", {
                params: {
                    q: search
                }
            })
            setResult(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        let isMounted = true;
        
        if (search.length > 0) {
            fetchData();
        } else {
            setResult([]);
        }
        return () => {isMounted = false}
    }, [search]);
  return (
    <div className='w-50 p-5 rounded mx-auto'>
       <div className='form-floating dropdown'>
        <input id='search' value={search} onChange={(e) => setSearch(e.currentTarget.value)} style={{backgroundColor: "rgba(145, 158, 171, 0.06)"}} placeholder='Search'  type='text' className='form-control' autoComplete='off'/>
        <label>Search</label>
       </div>
    </div>
  )
}

export default AutoComplete
