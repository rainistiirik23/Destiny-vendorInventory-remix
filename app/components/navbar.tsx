import { ReactSVG } from "react-svg";
import { userData } from "~/utils/types";
import discordIcon from "~/src/assets/icons/Discord-icon.svg";
import userIcon from "~/src/assets/icons/User-icon.svg";
import burgerMenuIcon from "~/src/assets/icons/burger-menu.svg";
import type { navigationProps } from "~/utils/types";
export default function Navbar(props: navigationProps) {
  /*  console.log(props); */

  if (props.userData) {
    return (
      <div className="navigation-links-log-in-out-container">
        <nav>
          <ul className="navigation-links-unordered-list">
            <li className="discord-icon-navigation-list-item">
              <a href="/">
                <ReactSVG src={discordIcon} className="discord-icon-container"></ReactSVG>
              </a>
            </li>
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
            <li className="burger-menu-icon-list-item">
              <ReactSVG
                onClick={() => {
                  props.setBurgerMenuStateFunction(true);
                }}
                src={burgerMenuIcon}
              ></ReactSVG>
            </li>
          </ul>
        </nav>
        <div className="log-out-form-container">
          <ReactSVG className="user-icon-container" src={userIcon}></ReactSVG>
          <span>{props.userData?.global_name}</span>
          <form action="/vendorWishList" method="POST">
            <button className="log-out-form-button">Log out</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="navigation-links-log-in-out-container">
      <nav>
        <ul className="navigation-links-unordered-list">
          <li className="discord-icon-navigation-list-item">
            <a href="/">
              <ReactSVG src={discordIcon} className="discord-icon-container"></ReactSVG>
            </a>
          </li>
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
          <li className="burger-menu-icon-list-item">
            <ReactSVG
              onClick={() => {
                props.setBurgerMenuStateFunction(true);
              }}
              src={burgerMenuIcon}
            ></ReactSVG>
          </li>
        </ul>
      </nav>
      <div>
        <a
          className="navigation-link"
          href="https://discord.com/oauth2/authorize?client_id=1231201012258177054&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2FvendorWishList&scope=identify"
        >
          <button className="log-in-button">Log in with discord</button>
        </a>
      </div>
    </div>
  );
}
