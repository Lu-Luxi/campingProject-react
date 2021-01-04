import React from 'react';

const SearchResultCampPage = (props) => {

    const { searchCount, page, setPage, countPerPage, maxPage, setMaxPage } = props;

    setMaxPage(Math.ceil(searchCount / countPerPage));
    // let maxPage = Math.ceil(searchCount / countPerPage);
    var pageList = Array.from(Array(maxPage).keys());
    // console.log(pageList);

    const handlePrevious = () => {
        if (page > 0) {
            window.scrollTo(0, 0);
            setPage(page - 1);
        }
    }
    const handleNext = () => {
        if (page < maxPage - 1) {
            window.scrollTo(0, 0);
            setPage(page + 1);
        }
    }

    return (
        <React.Fragment>
            {/* <!-- page  --> */}
            <nav aria-label="Page navigation example ">
                <ul className="pagination d-flex justify-content-center">
                    <li className="page-item">
                        <span className="page-link" aria-label="Previous" style={{ color: "var(--priceColor)", cursor: "pointer" }} onClick={handlePrevious}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only" >Previous</span>
                        </span>
                    </li>
                    {pageList.map((item, index) => {
                        return (index === page ?
                            <li key={index} className="page-item"><span className="page-link" style={{ color: "black", fontWeight: 'bolder', cursor: "pointer" }}>{index + 1}</span></li> :
                            <li key={index} className="page-item"><span className="page-link" style={{ color: "var(--priceColor)", cursor: "pointer" }} onClick={() => { window.scrollTo(0, 0); setPage(index); }}>{index + 1}</span></li>
                        )
                    })}
                    <li className="page-item">
                        <span className="page-link" aria-label="Next" style={{ color: "var(--priceColor)", cursor: "pointer" }} onClick={handleNext}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only" >Next</span>
                        </span>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}


export default SearchResultCampPage;