export const Header = (): React.ReactElement => {
  return (
    <header className="wrap">
      <h1 className="nes-text page-title">GISSUES</h1>

      <form className="nes-container with-title">
        <h3 className="title">Search</h3>
        <div className="nes-field">
          <label htmlFor="organization">Organization</label>
          <input id="organization" className="nes-input" type="text" />
        </div>

        <div className="nes-field">
          <label htmlFor="repository">Repository</label>
          <input id="repository" className="nes-input" type="text" />
        </div>

        <button className="nes-btn" type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
