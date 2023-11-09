export function DisplayCountSelector({ setPostsPerPage, setCurrentPage }) {
    return (
        <div>
            <label htmlFor="displayCount">페이지당 게시물 수</label>

            <select
                id="displayCount"
                onChange={({ target: { value } }) => {
                    setCurrentPage(1);
                    setPostsPerPage(Number(value));
                }}
            >
                <option value="10">10</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
}
