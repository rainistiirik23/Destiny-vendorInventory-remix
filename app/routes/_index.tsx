import styles from "~/styles/entry.css?url";
/* import { DataFunctionArgs } from "@remix-run/node"; */
import { useLoaderData } from "@remix-run/react";
import { loadCurrentVendorSales, loadCurrentVendorSalesWithDiscordId } from "~/loaders/loadVendorData";
import CurrentVendorInventoryPage from "~/pages/vendorSales";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { userDataCookie } from "~/utils/cookies";
export async function loader({ request }: LoaderFunctionArgs) {
  const code = new URL(request.url).searchParams.get("code");
  const value = await userDataCookie.parse(request.headers.get("Cookie"));
  if (code) {
    const userData = loadCurrentVendorSalesWithDiscordId(code);
    return redirect("", {
      headers: {
        "Set-Cookie": await userDataCookie.serialize({
          showData: userData.data.discordAccountId,
        }),
      },
    });
  }
  const vendorData = await loadCurrentVendorSales();
  if (value) {
    return { vendorData, value };
  }
  return { vendorData };
}
export function LinksFunction() {
  return [{ rel: "stylesheet", href: styles }];
}
export default function VendorWishlist() {
  const vendorData = useLoaderData<typeof loader>();
  /*   console.log(vendorData); */

  return <CurrentVendorInventoryPage {...vendorData}></CurrentVendorInventoryPage>;
}
