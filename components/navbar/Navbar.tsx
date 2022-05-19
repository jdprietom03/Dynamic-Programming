export default function Navbar() {
  return (
    <nav className="nav">
      <div className="page-nav">
        <div className="header">
          <span>LOGO</span>
        </div>
        <div className="items">
          <div className="item">Home</div>
          <div className="item active">Problems</div>
          <div className="item">Contest</div>
          <div className="item">Gym</div>
        </div>
        <div className="tools">
          <div className="search">
            <div className="icon">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <input type="text" name="search" placeholder="Search a problem" />
          </div>
          <div className="profile">
            <div className="icon"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}