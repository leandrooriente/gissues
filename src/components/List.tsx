export const List = (): React.ReactElement => {
  return (
    <main className="wrap results">
      <div className="nes-container with-title">
        <h3 className="title">Results</h3>

        <div className="result-item nes-container is-rounded">
          <p className="nes-text">
            Bug: [Refresh] Default exported unnamed functions are ignored
          </p>

          <span className="nes-badge">
            <span className="is-warning">Status: Unconfirmed </span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Component: Fast Refresh</span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Difficulty: challenging</span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">React Core Team</span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Resolution: Backlog</span>
          </span>

          <p className="nes-text">#21210 opened 1 hour ago by coreyar</p>
        </div>

        <div className="result-item nes-container is-rounded">
          <p className="nes-text">
            Bug: Radio/Checkbox inputs not triggered when setting state in
            listener on a parent element
          </p>

          <span className="nes-badge">
            <span className="is-warning">Status: Unconfirmed </span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Component: Fast Refresh</span>
          </span>

          <p className="nes-text">#21094 opened 14 days ago by kotliluk</p>
        </div>

        <div className="result-item nes-container is-rounded">
          <p className="nes-text">[Fast Refresh] Don’t Scan the Tree</p>

          <span className="nes-badge">
            <span className="is-warning">Status: Unconfirmed </span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Component: Fast Refresh</span>
          </span>

          <p className="nes-text">#21139 opened 9 days ago by gaearon</p>
        </div>

        <div className="result-item nes-container is-rounded">
          <p className="nes-text">
            Bug: onMouseEnter triggered twice on target when there's space
            around it, and ReactDOM.createPortal is used to render something
            else
          </p>

          <span className="nes-badge">
            <span className="is-warning">Status: Unconfirmed </span>
          </span>

          <span className="nes-badge">
            <span className="is-warning">Component: Fast Refresh</span>
          </span>

          <p className="nes-text">#21049 opened 17 days ago by benoitgrelard</p>
        </div>

        <div className="result-item nes-container is-rounded">
          <p className="nes-text">Bug: Unsupported HTML entities</p>

          <span className="nes-badge">
            <span className="is-warning">Status: Unconfirmed </span>
          </span>

          <p className="nes-text">#21002 opened 25 days ago by fast-reflexes</p>
        </div>

        <section className="navigation">
          <a className="nes-btn is-disabled" href="#">
            Previous page
          </a>

          <a className="nes-btn" href="#">
            Next page
          </a>
        </section>
      </div>
    </main>
  );
};
