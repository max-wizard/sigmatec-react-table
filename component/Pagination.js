import React, { useMemo , useEffect , useState } from 'react'

const Pagination = ({ dataPerPage , totalData , paginate , currentPage , rangePage }) => {

    //define 
    const pageNumbers = [];
    const pageNumberCon = [];
    const morePage = '';
    const [visible, setVisible] = useState(false);

    //get total of page
    const totalPage = Math.ceil(totalData / dataPerPage);

    if(totalPage <= rangePage ){

        //if total of page <= number of page that need to Display
        for(let i=1; i<= totalPage; i++){
            //get pageNumbers
            pageNumbers.push(i);   
        }
        
    }else{
        //get pageNumbers
        for(let i=1; i<= rangePage; i++){
            pageNumbers.push(i);   
        }
        //get more PageNumber
        for(let i= rangePage+1 ; i < totalPage; i++){
            pageNumberCon.push(i);   
        }
        //display ... for show more page number
        morePage = <a href='#' className='page-link' onClick={() => setVisible(!visible)}>{visible ? 'Hide' : '...'}</a>
    }

    return (
        <nav>
            <div className='pagination'>
                <a onClick={() => paginate(1)} href='#' className='page-link'>
                    {'<<'}
                </a>
                <a onClick={() => paginate(currentPage - 1)} href='#' className='page-link'>
                    {'<'}
                </a>
                {
                    pageNumbers.map(number => (
                        <a key={number} onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    ))
                }
                <div style={{display: visible ? 'block' : 'none'}} >
                {
                    pageNumberCon.map(number => (
                        <a key={number} onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    ))
                }
                </div>
                {morePage}
                <a onClick={() => paginate(totalPage)} href='#' className='page-link'>
                    {totalPage}
                </a>
                <a onClick={() => paginate(currentPage + 1)} href='#' className='page-link'>
                    {'>'}
                </a>
                <a onClick={() => paginate(totalPage)} href='#' className='page-link'>
                    {'>>'}
                </a>
            </div>
        </nav>
    )
}

export default Pagination