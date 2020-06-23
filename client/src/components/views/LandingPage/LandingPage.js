import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row ,Button,Pagination } from 'antd';
// import ImageSlider from '../../utils/ImageSlider';
// import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import {  number_data } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import {ColumnWidthOutlined,PlayCircleOutlined} from '@ant-design/icons';
import ModalVideo from 'react-modal-video';
import ReactPlayer from 'react-player';


import Player from "./reactPlayer";




//import { combineReducers } from 'redux';
//import Pagination from './Pagination';


 

const { Meta } = Card;

function LandingPage() {

    const [visible, setvisible] = useState(false)

    const [previousValue,setPreviousValue] = useState(1)
    const [Videos, setVideos] = useState([])
    const [Videosnext, setVideosnext] = useState([])
    const [colms, setColms] = useState(8)
    const [number, setnumber] = useState(12)
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(12);
    
    //const [postsPerPage] = useState(12);
    // const [PostSize, setPostSize] = useState()
    const [SearchTerm, setSearchTerms] = useState("")
    


    useEffect(() => {

        const dataToSubmit = {"search":SearchTerm,"number":number,"token":null}

        getVideos(dataToSubmit)
        
    }, [])

    const getVideos = (data) => {
        
        

        Axios.post('http://localhost:5000/videos',data)
            .then(response => {
                const v = response.data;
                console.log(v.data.nextPageToken)
                setVideos([v])
                    
            })
    }

    const onOpenModal = (v)=> {
        setvisible(true)
        //console.log(visible)
      }
    
      
    
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = Videos.slice(indexOfFirstPost, indexOfLastPost);
    // const paginate = pageNumber => setCurrentPage(pageNumber);

    const renderCards = Videos.map((videos, index1) => {
    //     console.log(videos)
        return videos.data.items.slice(minValue, maxValue).map((video,index)=>{
            
            return <Col lg={colms} md={8} xs={24}>
            <div >   
            <Card
                hoverable={true}
                cover=
                //  {<div>
                //         {/* {<ModalVideo channel='youtube' key={video.id.videoId} isOpen={visible} data-video-id= {video.id.videoId} videoId={video.id.videoId} onClose={() => setvisible(false)} /> }  */}
                         
                         
                        //  {<img style={{ width: '100%', maxHeight: '150px' }}
                        //      src={`${video.snippet.thumbnails.high.url}`} alt="productImage"  />}
                //          <PlayCircleOutlined style={{ fontSize: '30px', color: '#08c' }} onClick={onOpenModal}/>
                //          {<Player open={visible} toggleModal={onOpenModal} url={`https://www.youtube.com/embed/${video.id.videoId}`}/>}
                //          {/* <ModalVideo channel='youtube' isOpen={visible} videoId={video.id.videoId} onClose={() => setvisible(false)} /> */}
                   
                //  </div>}
                
                // {<div className="player-wrapper">
                {<ReactPlayer controls url={`https://www.youtube.com/watch?v=${video.id.videoId}`} width='100%'
                height='100%' className="react-player"
                 />}
                // </div>}
                
                // {<iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}//<ImageSlider images={video.t.snippet.thumbnails.medium.url} /></a>}
                >
                <Meta 
                    style={ {height:5}}
                    title={video.title}
                    description={video.snippet.publishedAt}
                />
            </Card>
            </div> 
            
           
        </Col>
        
        })
        
    })

    const handleFilters = (num)=>{
        
        setnumber(num)
        

        if (num === 50){
            let token = null
            while (true) {
                
                
                const dataToSubmit = {"search": SearchTerm,"number":num,"token":token}
                //console.log(token)
                Axios.post('http://localhost:5000/videos',dataToSubmit)
                            .then(response => {
                                const v = response.data;
                                //console.log(v.data)
                                setVideos([])
                                
            
                    
            })
            //console.log(Videos[0].data.items.length)
            token = Videos[0].data.nextPageToken
            if (token === null){
                break
            }
            }
            
        }
        else{
            const dataToSubmit={"search": SearchTerm,"number":num,"token":null}

        
            console.log(dataToSubmit)
            getVideos(dataToSubmit)
        }

        
        
    }
    

    const updateSearchTerms = (newSearchTerm) => {

        const dataToSubmit = {
            "search": newSearchTerm,
            "number":number,
            "token":null
        }

        
        setSearchTerms(newSearchTerm)
        
        console.log(newSearchTerm)
        getVideos(dataToSubmit)
    }

    const onClick = (event) =>{
        if (colms === 8){
            setColms(6)

        }
        else{
            setColms(8)

        }


    }

    const handleChange = value => {
        
        console.log(previousValue)

        
        if (value <= 1) {
          
            setminValue(0);
            setmaxValue(12);
            setPreviousValue(value)
          
        } 
        
        else {
            
            if (previousValue > value){
                
                
                setminValue((value-1)*12);
                setmaxValue(value*12);
            }
    
            else{
                if (previousValue+1 === value){                   
                    setminValue(maxValue)
                    setmaxValue(value * 12)
                    setPreviousValue(value)
                }

                else{
                    setminValue((previousValue+1)*maxValue)
                    setmaxValue(value * 12)
                    setPreviousValue(value)
                }
                
            }
            
          
        }
      };


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's watch  <Icon type="youtube" />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                {/* <Col lg={12} xs={24} >
                    <InputSubmit/>
                </Col> */}
                <Col lg={4} xs={24} >
                <div style={{ justifyContent: 'flex-start', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

                </div>
                </Col>
                <Col lg={18} xs={24} >
                <div style={{ display:'flex',justifyContent: 'flex-end', margin: '1rem auto' }}>

                <Button onClick={onClick}><ColumnWidthOutlined style={{ fontSize: '30px', color: '#08c' }}/></Button>

                </div>
                </Col>
                </Row>
                <div style={{  justifyContent: 'flex-start', margin: '1rem auto' }}>
                
                <Row gutter={[16, 16]}>
                <Col lg={4} xs={24}>
                    <RadioBox
                        list={number_data}
                        handleFilters={handleFilters}
                    />
                </Col>
                </Row>

                </div>
            


            {/* Search  */}
            <div style={{ width: '75%', margin: '3rem auto' }}>
            <Row>
            
            {Videos.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No Videos ...</h2>
                </div> :
                <div style={ {marginBottom:"25px"}}>
                    <Row gutter={[16, 16]}>
                       <div>
                        {renderCards}
                        
                        </div> 
                        
                    </Row>
            
                         
            
                </div>
            }

            </Row>
            {Videos.length === 0 ?
             <div></div>
            :
            <Pagination
                defaultCurrent={1}
                defaultPageSize={12}
                onChange={handleChange}
                total={number}
                 />}
            </div>
            <br /><br />
           
        
        </div>
    )
}

export default LandingPage
