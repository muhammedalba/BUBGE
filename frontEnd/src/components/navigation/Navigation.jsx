import PropTypes from "prop-types";
import { useCallback } from "react";

const Navigation = ({
  isSuccess,
  status,
  isLoading,
  PlusAction,
  minusAction,
  currentPage,
}) => {
  // Create page Pagination buttons
  const pages = useCallback(() => {
    return (
      isSuccess &&
      Array.from({ length: status?.numperOfPages }).map((_, index) => (
        <li key={index} className="page-item">
          <span
            style={{
              background: status?.currentPage === index + 1 ? "#cacae2" : "transparent",
              cursor: "pointer",
            }}
            onClick={() => currentPage(index + 1)}
            className="page-link"
          >
            {isLoading ? <span className="spinner-border"></span> : index + 1}
          </span>
        </li>
      ))
    );
  }, [isSuccess, status, isLoading, currentPage]);

  return (
    <div aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {isSuccess && status?.prevPage && (
          <li
            style={{ cursor: "pointer" }}
            onClick={minusAction}
            className="page-item"
          >
            <span className="page-link">السابق</span>
          </li>
        )}

        {status?.numperOfPages > 5 ? (
          <>
            <li className="page-item mx-1">
              <span style={{ background: "#cacae2" }} className="page-link">
                {isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  status?.currentPage
                )}
              </span>
            </li>
            <li className="page-item mx-2">
              <span className="page-link">
                {isLoading ? (
                  <span className="spinner-border"></span>
                ) : (
                  `عدد الصفحات (${status?.numperOfPages})`
                )}
              </span>
            </li>
          </>
        ) : (
          pages()
        )}

        {isSuccess && status?.nextPage && (
          <li
            style={{ cursor: "pointer" }}
            onClick={PlusAction}
            className="page-item"
          >
            <span className="page-link">التالي</span>
          </li>
        )}
      </ul>
    </div>
  );
};

Navigation.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  status: PropTypes.shape({
    numperOfPages: PropTypes.number,
    currentPage: PropTypes.number,
    prevPage: PropTypes.bool,
    nextPage: PropTypes.bool,
  }).isRequired,
  PlusAction: PropTypes.func.isRequired,
  minusAction: PropTypes.func.isRequired,
  currentPage: PropTypes.func.isRequired,
};

export default Navigation;
