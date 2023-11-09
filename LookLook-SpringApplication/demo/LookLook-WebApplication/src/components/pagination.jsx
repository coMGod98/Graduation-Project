import styles from "./pagination.module.css"

export function Pagination({
                               prodsNum,
                               prodsPerPage,
                               setCurrentPage,
                               currentPage
                           }) {
    const pageList = [];
    const totalPages = Math.ceil(prodsNum / prodsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if (totalPages === 0 || totalPages === 1) {
        return null;
    }

    return (
        <div className={styles.paginationDiv}>
            <button style={{backgroundColor:'rgb(243, 243, 243)',
                width:'50px'}}
                    onClick={goToPrevPage} disabled={currentPage === 1}>
                이전
            </button>

            {pageList.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "active" : undefined}>
                    {page}
                </button>
            ))}

            <button style={{backgroundColor:'rgb(243, 243, 243)',
                width:'50px'}}
                    onClick={goToNextPage} disabled={currentPage === pageList.length}>
                다음
            </button>
        </div>
    );
}
