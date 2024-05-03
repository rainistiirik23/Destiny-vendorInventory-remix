import { createCookie } from "@remix-run/node";
export const userDataCookie = createCookie('userData',{
    maxAge:604_800,
    secrets: ["s3cret1"]
})
