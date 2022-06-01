import React , { useEffect , useState} from 'react';
import { Link , useNavigate } from "react-router-dom";
import '../css/Home.css';

// Components
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import DataCard from '../components/DataCard';

// Material UI
import Divider from '@mui/material/Divider';

// Icons;
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function Home() {

    
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState()
    const [page, setPage] = useState(1)
    const [token, setToken] = useState(null)
    const [validate, setValidate] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem('token');
        setToken(token)
        if(token === null){
            navigate('/')
        }

        async function posts(){
            const axios = require('axios').default;
            axios.get('http://localhost/Projects/Supermetrics/Posts.php?sl_token='+token+'&page='+page)
            .then(function (response) {
                console.log(response.data.result)
                if(response.data.result == null){
                    setValidate(false)
                    navigate('/');
                }else{
                    setValidate(true)
                    setPosts(response.data.result)
                }               
            });
        }

        async function results(){
            const axios = require('axios').default;
            axios.get('http://localhost/Projects/Supermetrics/Result.php?sl_token='+token+'&page='+page)
            .then(function (response) {
                //console.log(response.data.result)
                if(response.data.result == null){   
                    setValidate(false)
                    navigate('/');
                }else{
                    setValidate(true)
                    setUsers(response.data.result)
                }               
            });
        }
        
        posts();
        results();

    },[page])

    const nextRecords = () => {
        const newPage = page +1;
        if(newPage != 0){
            setPage(newPage);
        }
    }

    const prevRecords = () => {
        const newPage = page - 1;
        setPage(newPage);
    }

    return (
        <div className="home">
            <div className="home__body p-5">
                <p className="font-bold tracking-widest text-xl mb-5">Supermetrics Analytics - {token}</p>
                <Divider />
                <div className="grid grid-cols-2 mt-5 mb-5">
                
                    { users?.map((row) => (
                            <div className="mt-3">
                                <Card icon={<PersonOutlinedIcon />} title={row.user} messages={row.no_messages} average={row.average} other={row.other} />
                            </div>

                        )
                    )}
                    
                </div>

                <Divider />

                

                <p className="font-bold mb-2 tracking-widest mt-5">All Posts</p>

    
                <div className="grid grid-cols-3 mt-2 mb-5">
                    <div className="col-span-3 mr-5">
                        <p className="mb-2">Note : Displaying only the first 100 posts.</p>
                        <button onClick={prevRecords} className="p-2 bg-indigo-400 rounded mb-5 mr-5">Prev</button>
                        <button onClick={nextRecords} className="p-2 bg-indigo-400 rounded mb-5">Next</button>
                        { validate ? <DataTable posts={posts}  />  : null  }
                                          
                    </div>
                </div>

                <Divider /> 
            </div>
        </div>
    )
}

export default Home;
