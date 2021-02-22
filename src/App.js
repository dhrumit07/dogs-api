import React, {useState, useEffect} from 'react';

import './App.css';
import axios from "axios";


export const App = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState();


    useEffect(() => {

            axios({
                method: 'get',
                url: 'https://dog.ceo/api/breeds/image/random/8'
            }).then((response) => {
                setImages(response.data.message);
            })
        },[]
    );


    if (images.length <= 0 || loading) {
        return <h1>Loading.. </h1>;
    }

    return (
        <div className="App">
            {images.map((image) => {
                return <img src={image} alt={'dogs'} className={"images"}/>
            })}
        </div>
    );
}

export default App;
