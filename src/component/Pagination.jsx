import React from 'react';
import './Pagination.css';

function Pagination({ total, dataperpage, setcurrentpage, currentpage }) {
    let pages = [];
    console.log(pages);
    for (let i = 1; i <= Math.ceil(total / dataperpage); i++) {

        pages.push(i);
    }
    const goToFirstPage = () => {
        setcurrentpage(1); // Set currentPage to 1 when the icon for first page is clicked
      };
    
      const goToLastPage = () => {
        const lastPage = Math.ceil(total / dataperpage);
        setcurrentpage(lastPage); // Set currentPage to last page when the icon for last page is clicked
      };
      const nextPage = () => {
        if (currentpage < Math.ceil(total / dataperpage)) {
          setcurrentpage(currentpage + 1); // Increment currentPage by 1
        }
      };
    
      const prevPage = () => {
        if (currentpage > 1) {
          setcurrentpage(currentpage - 1); // Decrement currentPage by 1
        }
      };
    return (
        <div className='pagination'>
            <button onClick={goToFirstPage} style={{ backgroundColor: 'blue', color: 'white' }}>
            {'<<'}
            </button>
            <button onClick={prevPage} style={{ backgroundColor: 'lightblue', color: 'white' }}>
            {'<'}
            </button>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setcurrentpage(page)}
                        className={page === currentpage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
             <button onClick={nextPage} style={{ backgroundColor: 'lightblue', color: 'white' }}>
            {'>'}
            </button>
             <button onClick={goToLastPage} style={{ backgroundColor: 'blue', color: 'white' }}>
            {'>>'}
            </button>
           

        </div>
    );
}

export default Pagination;
