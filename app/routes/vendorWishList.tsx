import { type LoaderFunctionArgs, type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userDataCookie } from "~/utils/cookies";
import { ShouldRevalidateFunctionArgs, useLoaderData } from "@remix-run/react";
import { editWishListedItem, deleteWishListedItem } from "~/utils/requests";
import {
  loadAllVendorSales,
  loadAllVendorSalesWithUsersWishListedSales,
  loadVendorDataWithDiscordId,
} from "~/loaders/loadVendorData";
import VendorWishlistPage from "~/pages/vendorSaleWishListPage";
import styles from "~/styles/entry.css?url";
export function LinksFunction() {
  return [{ rel: "stylesheet", href: styles }];
}
export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.formData()).get("data");
  console.log(body);
  switch (request.method) {
    case "POST":
      return redirect("/vendorWishList", {
        headers: {
          "Set-Cookie": await userDataCookie.serialize("", { maxAge: -1 }),
        },
      });
    case "PUT":
      console.log("put");
      editWishListedItem(JSON.parse(body as string));
      return null;
    case "DELETE":
      console.log("delete");
      deleteWishListedItem(JSON.parse(body as string));
      return null;
    default:
      return null;
  }
}
export function shouldRevalidate({ defaultShouldRevalidate, formMethod }: ShouldRevalidateFunctionArgs) {
  if (formMethod == "PUT") {
    return defaultShouldRevalidate;
  }
}
export async function loader({ request }: LoaderFunctionArgs) {
  const code = new URL(request.url).searchParams.get("code");
  const value = await userDataCookie.parse(request.headers.get("Cookie"));
  if (code) {
    const vendorData = await loadVendorDataWithDiscordId(code);
    /*    console.log(vendorData); */

    return redirect("/vendorWishList", {
      headers: {
        "Set-Cookie": await userDataCookie.serialize({
          showData: vendorData.data.discordAccountId,
        }),
      },
    });
  }
  if (value) {
    const vendorData = await loadAllVendorSalesWithUsersWishListedSales(value.showData.id);
    return json({ vendorData, value });
  }
  /*  const value = await userDataCookie.parse(request.headers.get("Cookie")); */
  /* if (value) {


} */
  /*  const session = await getSession(request.headers.get("Cookie")); */
  /* console.log(request.headers.get("Cookie")); */

  /*   session.set("userId", "1234"); */
  /*   console.log(value); */

  console.log(value);
  const vendorData = await loadAllVendorSales();

  return json({ vendorData, value });
}

export default function VendorWishlist() {
  const loaderData = useLoaderData<typeof loader>();
  /*   console.log(loaderData); */

  return <VendorWishlistPage {...loaderData}></VendorWishlistPage>;
}
