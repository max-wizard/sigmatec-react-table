import type { NextPage } from 'next'
import React, { useMemo , useEffect , useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Table from '../component/Table';
import TableMobile from '../component/TableMobile';
import Pagination from '../component/Pagination'
import ModalImage from 'react-modal-image';
import { useMediaQuery } from 'react-responsive';


const Home: NextPage = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });
  
  // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
      (async () => {
        const result = await axios("http://jsonplaceholder.typicode.com/photos");
        setData(result.data);
      })();
    }, []);

    const columns = useMemo(
      () => [
        {
          Header: 'id',
          accessor: 'id'
        },
        {
          Header: 'title',
          accessor: 'title',
        },
        {
          Header: 'thumbnail',
          accessor: 'thumbnailUrl',
          Cell: ({ cell: { value } }) => {
            return <ModalImage
            small={value}
            large={value}
            alt="Modal"
          />
          }
        },
      ],
      []
    );

    const columnMobile = useMemo(
      () => [
        {
          Header: 'id',
          accessor: 'id',
        },
        {
          Header: 'title',
          accessor: 'title',
        }
      ],
      [
        {
          Header: 'thumbnail',
          accessor: 'thumbnailUrl',
          Cell: ({ cell: { value } }) => {
            return <ModalImage
            small={value}
            large={value}
            alt="Modal"
          />
          }
        },
      ]
    );


    // Get current data
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data.slice(indexOfFirstData , indexOfLastData);
    const rangePage = 10;

    //Change Page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className={styles.container}>
            <h1>Custom Table</h1>
            <h2>Current Page : {currentPage}</h2>
            <div className="App">
              {!isMobile ? <Table columns={columns} data={currentData} /> : <TableMobile columns={columnMobile} data={currentData} /> }
            </div>
            <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} currentPage={currentPage} rangePage={rangePage} />
          </div>
          
      </main>

      
    </div>
  )
}

export default Home
