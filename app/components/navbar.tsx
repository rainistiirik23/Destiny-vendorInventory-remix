import { userData } from "~/utils/types";

export default function Navbar(data: userData) {
  /*   console.log(data); */

  const userData = data.showData;
  if (userData) {
    return (
      <nav>
        <form action="/vendorWishList" method="POST">
          <button>Log out</button>
        </form>
        <span>Logged in as {userData.global_name}</span>
      </nav>
    );
  }
  return (
    <nav>
      <a href="https://discord.com/oauth2/authorize?client_id=1231201012258177054&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2FvendorWishList&scope=identify">
        Login with discord
      </a>
    </nav>
  );
}
