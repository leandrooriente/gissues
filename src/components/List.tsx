import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ListPageParamTypes } from "./Routes";
import { Page } from "./Page";
import { Loading } from "./Loading";
import { NotFound } from "./NotFound";
import { FormatedDate } from "./Date";
import { fetchIssues } from "../features/issues";
import { RootState } from "../store";

export const List = (): React.ReactElement => {
  const dispatch = useDispatch();
  const {
    organization = "",
    repository = "",
    page,
  } = useParams<ListPageParamTypes>();
  const { list: issues, pageCount, status } = useSelector(
    (state: RootState) => {
      return state.issuesReducer;
    }
  );

  const currentPage = parseInt(page, 10);
  const hasNextPage = currentPage < pageCount;
  const hasPreviousPage = currentPage > 1;

  useEffect(() => {
    dispatch(fetchIssues({ organization, repository, page: currentPage }));
  }, [dispatch, organization, repository, currentPage]);

  const listTitle: Partial<Record<typeof status, string>> = {
    LOADING: "Loading",
    NOT_FOUND: "Not found",
    LOADED: "Results",
  };

  return (
    <Page>
      <div className="nes-container with-title">
        <h3 className="title">{listTitle[status] || "Results"}</h3>

        {status === "LOADING" ? <Loading /> : null}

        {status === "NOT_FOUND" ||
        (issues.length === 0 && status !== "LOADING" && status !== "EMPTY") ? (
          <NotFound />
        ) : null}

        {status === "LOADED" ? (
          <ul
            aria-label="issues"
            className="result-list"
            data-test-id="result-list"
          >
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="result-item nes-container is-rounded"
              >
                <h4 className="nes-text">{issue.title}</h4>

                {issue.labels.map((label) => (
                  <span key={label.id} className="nes-badge">
                    <span className="is-warning">{label.name}</span>
                  </span>
                ))}

                <p className="nes-text">
                  #{issue.number} opened{" "}
                  <FormatedDate>{issue.created_at}</FormatedDate> by{" "}
                  {issue.user?.login}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {hasPreviousPage || hasNextPage ? (
          <section className="navigation">
            {hasPreviousPage ? (
              <Link
                data-test-id="previous-page-link"
                className="nes-btn"
                to={`/${organization}/${repository}/${currentPage - 1}`}
              >
                Previous page
              </Link>
            ) : null}

            {hasNextPage ? (
              <Link
                data-test-id="next-page-link"
                className="nes-btn next-page"
                to={`/${organization}/${repository}/${currentPage + 1}`}
              >
                Next page
              </Link>
            ) : null}
          </section>
        ) : null}
      </div>
    </Page>
  );
};
