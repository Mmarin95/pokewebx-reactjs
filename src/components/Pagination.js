import React from "react";

export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div className="pagination">
      {goToPrevPage && (
        <button className="btn btn-prev" onClick={goToPrevPage} type="button">
          Prev
        </button>
      )}
      {goToNextPage && (
        <button className="btn btn-next" onClick={goToNextPage} type="button">
          Next
        </button>
      )}
    </div>
  );
}
