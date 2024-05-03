import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { userDataCookie } from "~/utils/cookies";
import { useLoaderData } from "@remix-run/react";
import { loadVendorData, loadVendorDataWithDiscordId } from "~/loaders/loadVendorData";

import VendorWishlistPage from "~/pages/vendorSaleWishListPage";
export async function action() {
  return redirect("/vendorWishList", {
    headers: {
      "Set-Cookie": await userDataCookie.serialize("", { maxAge: -1 }),
    },
  });
}
export async function loader({ request }: LoaderFunctionArgs) {
  const code = new URL(request.url).searchParams.get("code");
  if (code) {
    const vendorData = await loadVendorDataWithDiscordId(code);
    /*    console.log(vendorData); */

    const value = await userDataCookie.parse(request.headers.get("Cookie"));
    return redirect("/vendorWishList", {
      headers: {
        "Set-Cookie": await userDataCookie.serialize({
          showData: vendorData.data.discordAccountId,
        }),
      },
    });
  }
  const vendorData = await loadVendorData();
  /*  const session = await getSession(request.headers.get("Cookie")); */
  /* console.log(request.headers.get("Cookie")); */

  /*   session.set("userId", "1234"); */
  const value = await userDataCookie.parse(request.headers.get("Cookie"));
  /*   console.log(value); */

  return json({ vendorData, value });
}

export default function VendorWishlist() {
  const loaderData = useLoaderData<typeof loader>();
  /*   console.log(loaderData); */

  return <VendorWishlistPage {...loaderData}></VendorWishlistPage>;
}
