import { v4 as uuidv4 } from "uuid";

import "./pagination.scss";

export const Pagination = ({
  postsPerPage,
  totalAdvertisements,
  paginate,
  currentPage,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAdvertisements / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <li key={uuidv4()} className="pagination-item">
          <button
            className={
              currentPage === pageNumber
                ? "pagination-button active"
                : "pagination-button"
            }
            type="button"
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
};
