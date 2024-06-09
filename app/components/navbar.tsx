export default function Navbar(data: unknown) {
  /*   console.log(data.userData); */

  if (data.userData) {
    const userData = data.userData.showData;
    return (
      <div className="navigation-links-container">
        <nav>
          <ul className="navigation-links-unordered-list">
            <li>
              <a className="navigation-link" href="/vendorWishList">
                Vendor WishList
              </a>
            </li>
            <li>
              <a className="navigation-link" href="/">
                All vendor sales
              </a>
            </li>
          </ul>
        </nav>
        <div className="log-out-form-container">
          <form action="/vendorWishList" method="POST">
            <button>Log out</button>
          </form>
          <span>Logged in as {userData.global_name}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="navigation-links-container">
      <nav>
        <ul className="navigation-links-unordered-list">
          <li>
            <a className="navigation-link" href="/vendorWishList">
              Vendor WishList
            </a>
          </li>
          <li>
            <a className="navigation-link" href="/">
              All vendor sales
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <a
          className="navigation-link"
          href="https://discord.com/oauth2/authorize?client_id=1231201012258177054&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2FvendorWishList&scope=identify"
        >
          Login with discord
        </a>
      </div>
    </div>
  );
}
