import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import got from "got";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Public Transport in Olsztyn" }];
};

export async function loader({ request }: LoaderArgs) {
  got.get("vk.com");
  return json({});
}

export default function Index() {
  return <></>;
}
