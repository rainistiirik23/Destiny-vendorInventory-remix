import { ReactSVG } from "react-svg";
import closeButton from "~/src/assets/icons/close-button.svg";
import userIcon from "~/src/assets/icons/User-icon.svg";
import { navigationProps } from "~/utils/types";
export default function BurgerMenu(props: navigationProps) {
  if (!props.userData) {
    return (
      <div className="burger-menu-container">
        <div className="username-logout-close-menu-button-container">
          <ReactSVG
            onClick={() => {
              props.setBurgerMenuStateFunction(false);
            }}
            src={closeButton}
          ></ReactSVG>
        </div>
        <div className="navigation-links-container">
          <ul>
            <li>
              <a href="/">Vendorsales</a>
            </li>
            <li>
              <a href="/vendorWishList">Wishlists</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="burger-menu-container">
      <div className="username-logout-close-menu-button-container">
        <div className="username-user-icon-container">
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add("svg-class-name");
            }}
            className="user-icon"
            src={userIcon}
          ></ReactSVG>
          <span>{props.userData?.username}</span>
        </div>
        <ReactSVG
          onClick={() => {
            props.setBurgerMenuStateFunction(false);
          }}
          src={closeButton}
        ></ReactSVG>
      </div>
      <div className="navigation-links-container">
        <ul className="unordered-navigation-links-list">
          <li>
            <a href="/">Vendorsales</a>
          </li>
          <li>
            <a href="/vendorWishList">Wishlists</a>
          </li>
          <li>
            <form action="/vendorWishList" method="POST">
              <button className="log-out-form-button">Log out</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}
