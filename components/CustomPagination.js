import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "react-bootstrap";

/**
 *
 * @param {{
 *  count: number;
 *  defaultPage?: number;
 *  page?: number;
 *  onChangePage?: (page: number) => void;
 *  itemsPerPage?: number;
 * } & import("react-bootstrap").PaginationProps} props
 */
const CustomPagination = (props) => {
  const {
    count,
    defaultPage,
    page,
    onChangePage,
    itemsPerPage = 10,
    ...paginationProps
  } = props;

  const totalPages = useMemo(() => Math.ceil(count / (itemsPerPage || 1)) || 1, [count, itemsPerPage]);
  const initPage = defaultPage || page;
  const [currentPage, setCurrentPage] = useState(initPage);
  const pagesToShow = useMemo(() => {
    const page = currentPage < 1 ? 1 : currentPage;
    const leftPages = page < 3
      ? []
      : (page + 1 >= totalPages ? _.range(totalPages - 4, page) : _.range(page - 2, page));
    const rightPages = page < 3
      ? (totalPages < 6 ? _.range(page, totalPages > 1 ? totalPages : 2) : _.range(page, 6))
      : (totalPages <= page + 1 ? [page] : _.range(page, page + 3));
    return [...leftPages, ...rightPages];
  }, [currentPage, totalPages]);

  const firstPageToShow = pagesToShow[0];
  const lastPageToShow = pagesToShow[pagesToShow.length - 1];
  const hasLeftEllipsis = useMemo(() => firstPageToShow > 2, [firstPageToShow]);
  const hasRightEllipsis = useMemo(() => lastPageToShow < totalPages - 1, [lastPageToShow]);

  useEffect(() => {
    if (typeof page !== "undefined") {
      setCurrentPage(page);
    }
  }, [page]);

  function handleChangePage(page) {
    if (page < 1 || page > totalPages) return;
    if (typeof defaultPage !== "undefined") {
      setCurrentPage(page);
    } else if (onChangePage) {
      onChangePage(page);
    }
  }

  return <Pagination {...paginationProps}>
    <Pagination.First disabled={currentPage === 1} onClick={() => handleChangePage(1)} />
    <Pagination.Prev disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)} />
    {firstPageToShow !== 1
      && <Pagination.Item onClick={() => handleChangePage(1)}>{1}</Pagination.Item>}
    {hasLeftEllipsis && <Pagination.Ellipsis onClick={() => handleChangePage(firstPageToShow - 1)} />}
    {pagesToShow.map((p) => <Pagination.Item key={p} active={currentPage === p} onClick={() => handleChangePage(p)}>
      {p}
    </Pagination.Item>)}
    {hasRightEllipsis && <Pagination.Ellipsis onClick={() => handleChangePage(lastPageToShow + 1)} />}
    {lastPageToShow !== totalPages
      && <Pagination.Item onClick={() => handleChangePage(totalPages)}>{totalPages}</Pagination.Item>}
    <Pagination.Next disabled={currentPage === totalPages} onClick={() => handleChangePage(currentPage + 1)} />
    <Pagination.Last disabled={currentPage === totalPages} onClick={() => handleChangePage(totalPages)} />
  </Pagination>
}

export default CustomPagination;