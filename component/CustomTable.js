import React, { useEffect , useState } from 'react'

import axios from 'axios';
import DataTable from 'react-data-table-component'
import Modal from '../component/Modal'

const CustomTable = () => {

    const [value, setMessage] = useState(null);
    const [gallery ,setGallery] =useState([]);
    const [cloneGallery ,setCloneGallery] =useState([]);
    const [openDialog ,setOpenDialog] =useState(false);
    const [image ,setImage] =useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowDialog = (thumbnailUrl) => {
    //   setOpenDialog(true);
    //   setImage(thumbnailUrl)
      alert(thumbnailUrl);
    };

    const handleChange = event => {
        console.log(event.target.value); 
        setMessage(event.target.value);
        if(event.target.value){
            cloneGallery = search(event.target.value)
            setCloneGallery(cloneGallery)
            console.log('value is:',cloneGallery);

        }if(event.target.value == ''){
            setCloneGallery(gallery);
        }
      };

    const getGallery = async () => {
        try {
            const response = await axios.get("http://jsonplaceholder.typicode.com/photos");
            setGallery(response.data)
            setCloneGallery(response.data)
            // calculateRange(response.data , 100)
            console.log(gallery)
        } catch (error) {
            console.log(error);
        }
    }
    function search(mess) {
        var results = [];
        var index;
        var entry;
    
        mess = mess.toUpperCase();
        for (index = 0; index < gallery.length; ++index) {
            entry = gallery[index];
            if (entry && entry.title && entry.title.toUpperCase().indexOf(mess) !== -1){
                results.push(entry);
            }
        }
        console.log(results)

        return results;
    }

    const openModal = (rowId) =>  {
    
        // const findId = cloneGallery.filter(id => rowId == id);

        console.log('test');


        // return findId;
    }

    // const calculateRange = (data, rowsPerPage) => {
    //     console.log('Length : '+data.length);
    //     const range = [];
    //     const num = Math.ceil(data.length / rowsPerPage);
    //     let i = 1;
    //     for (let i = 1; i <= num; i++) {
    //       range.push(i);
    //     }
    //     console.log('Range : '+range);
    //     return range;
    // };

    // const sliceData = (data, page, rowsPerPage) => {
    //     return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    // };
      

    const columns = [
        {
            name: "id",
            selector: row => row.id
        },
        {
            name: "title",
            selector: row => row.title
        },
        {
            name: "thumbnail",
            selector: row => <a onClick={() => handleShowDialog(row.thumbnailUrl)} ><img src={row.thumbnailUrl} width={150} height={150} /> </a>
        }
    ]

    useEffect(()=> {
        getGallery();
        console.log(value);
        // if(value){
        //     searching();
        // }
        // getValue();
    },[])

    return (
        <div>
                      {/* {openDialog && ( */}
                      {/* <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handleShowDialog}
                >
                    <img
                    className="image"
                    src={image}
                    onClick={handleShowDialog}
                    alt="no image"
                    />
                </dialog> */}
                {/* )} */}
            <input type="text" placeholder="Search.." value={value} onChange={handleChange} />
            <DataTable columns={columns} data={cloneGallery} pagination fixedHeader  />
            </div>
    )
}

export default CustomTable