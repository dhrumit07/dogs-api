import React, {useState, useEffect} from 'react';

import './App.css';
import axios from "axios";


export const SelectDropdown = ({breads, selctionChange, className}) => {

    if (breads.length < 0) {
        return <h1>Loading...</h1>;
    }
    return (
        <select onChange={selctionChange} className={className}>
            {breads.map((bread) => {
                return <option key={bread} value={bread}>{bread}</option>
            })}
        </select>
    )

}


export const App = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState();
    const [breads, setBreads] = useState({});
    const [selected, setSelected] = useState('');

    const imageCount = 8;

    const fetchImages = () => {


        let url = '';
        if ( selected.length > 0) {
            url = "https://dog.ceo/api/breed/" + selected + "/images/random/" + imageCount;
        } else {
            url = 'https://dog.ceo/api/breeds/image/random/' + imageCount;
        }

        // making axios request to the bread API
        axios({
            method: 'get',
            url: url
        }).then((response) => {
            //merge array
            setImages(images.concat( response.data.message ));
        })

    }


    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://dog.ceo/api/breeds/image/random/' + imageCount
        }).then((response) => {
            setImages(response.data.message);
        })

        axios({
            method: 'get',
            url: 'https://dog.ceo/api/breeds/list/all'
        }).then((response) => {

            //convert list into array..

            let message = response.data.message;

            let temp = [];
            for (const [key] of Object.entries(message)) {
                temp.push(key);
            }
            setBreads(temp);
        })

    }, []);

    useEffect( () => {
        fetchImages();
    } , [selected] )


    if (images.length <= 0 || loading) {
        return <h1>Loading.. </h1>;
    }

    const selectionChange = (event) => {

        setSelected(event.target.value )

        setImages([]);

    }


    // list all the breads

    if (images.length <=0 ){
        return <h1>Loading.. </h1>;
    }


    return (
        <div>
            <SelectDropdown breads={breads} selctionChange={selectionChange} className={"select"}/>
            <div className={"App"}>
                {images.map((image, index) => {


                    return <img key={index} src={image} alt={'dogs'} className={"images"}/>
                })}
            </div>
            <button onClick={() => {
                fetchImages();
            }} className={"button"}>Load more</button>

        </div>
    );
}

export default App;
