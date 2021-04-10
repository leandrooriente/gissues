import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ListPageParamTypes } from "./Routes";

export const Header = (): React.ReactElement => {
  const history = useHistory();
  const {
    organization: organizationURLParam,
    repository: repositoryURLParam,
  } = useParams<ListPageParamTypes>();

  const [organization, setOrganization] = useState(organizationURLParam);
  const [repository, setRepository] = useState(repositoryURLParam);

  useEffect(() => {
    setOrganization(organizationURLParam);
    setRepository(repositoryURLParam);
  }, [organizationURLParam, repositoryURLParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/${organization}/${repository}/1`);
  };

  const handleOrganizationChange = (e: React.FormEvent<HTMLInputElement>) => {
    setOrganization(e.currentTarget.value);
  };

  const handleRepositoryChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepository(e.currentTarget.value);
  };

  return (
    <header className="wrap">
      <h1 className="nes-text page-title">
        <Link to="/">GISSUES</Link>
      </h1>

      <form onSubmit={handleSubmit} className="nes-container with-title">
        <h3 className="title">Search</h3>
        <div className="nes-field">
          <label htmlFor="organization">Organization</label>
          <input
            required
            value={organization}
            onChange={handleOrganizationChange}
            name="organization"
            id="organization"
            className="nes-input"
            type="text"
          />
        </div>

        <div className="nes-field">
          <label htmlFor="repository">Repository</label>
          <input
            required
            value={repository}
            onChange={handleRepositoryChange}
            name="repository"
            id="repository"
            className="nes-input"
            type="text"
          />
        </div>

        <button className="nes-btn" type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
