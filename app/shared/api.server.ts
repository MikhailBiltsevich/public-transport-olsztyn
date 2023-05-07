import got from "got";
import { parseStringPromise } from "xml2js";
import {
  firstCharLowerCase,
  normalize,
  stripPrefix,
} from "xml2js/lib/processors";
import { cookieJar } from "./cookie-jar";
import { getResponseContent, splitRoutes, trimValue } from "./helpers";

export async function getStreets() {
  const { body } = await got.post(
    "http://sip.zdzit.olsztyn.eu/PublicService.asmx",
    {
      body: `<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><GetStreets xmlns='http://PublicService/'><s>3qG299t2yxsfcAEthK8GGKEgb77Cpt2t5JkdPpZ2mVTY=</s></GetStreets></soap:Body></soap:Envelope>`,
      headers: { "Content-Type": "text/xml;charset=UTF-8" },
      cookieJar,
    }
  );

  const parsed = await parseStringPromise(body, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix, firstCharLowerCase],
    charkey: "name",
  });

  const streets = getResponseContent(
    parsed,
    "getStreetsResponse",
    "getStreetsResult",
    "streets",
    "street"
  );

  return streets;
}

export async function getStopsByName(stopName: string) {
  await getStreets();
  const { body } = await got.post(
    "http://sip.zdzit.olsztyn.eu/PublicService.asmx",
    {
      body: `<?xml version='1.0' encoding='utf-8'?>
      <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
      <soap:Body>
      <GetStopsByName xmlns='http://PublicService/'>
      <q>${stopName}</q>
      <transp></transp>
      </GetStopsByName>
      </soap:Body>
      </soap:Envelope>`,
      headers: { "Content-Type": "text/xml;charset=UTF-8" },
      cookieJar,
    }
  );

  const changeAttrName = (name: string) => {
    switch (name) {
      case "u":
        return "street";
      case "l":
        return "routes";
      default:
        return name;
    }
  };

  const splitRoutes = (value: string, name: string) => {
    if (name !== "l" || typeof value !== "string") {
      return value;
    }

    const routes = value.split(";");

    return routes.map((route: string) => {
      const [name, type] = route.split(",");
      return { name, type };
    });
  };

  const parsed = await parseStringPromise(body, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix, firstCharLowerCase],
    attrNameProcessors: [changeAttrName],
    attrValueProcessors: [splitRoutes],
  });

  const stopsByName = getResponseContent(
    parsed,
    "getStopsByNameResponse",
    "getStopsByNameResult",
    "stops",
    "s"
  );

  return stopsByName;
}

export async function getStopsByNumber(stopNumber: string) {
  await getStreets();
  const { body } = await got.post(
    "http://sip.zdzit.olsztyn.eu/PublicService.asmx",
    {
      body: `<?xml version='1.0' encoding='utf-8'?>
        <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
          <soap:Body>
            <GetStopsByNumber xmlns='http://PublicService/'>
              <nr>${stopNumber}</nr>
            </GetStopsByNumber>
          </soap:Body>
        </soap:Envelope>`,
      headers: { "Content-Type": "text/xml;charset=UTF-8" },
      cookieJar,
    }
  );

  const changeAttrName = (name: string) => {
    switch (name) {
      case "u":
        return "street";
      case "l":
        return "routes";
      case "num":
        return "number";
      default:
        return name;
    }
  };

  const parsed = await parseStringPromise(body, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix, firstCharLowerCase],
    attrNameProcessors: [changeAttrName],
    attrValueProcessors: [trimValue, splitRoutes],
  });

  const stopsByNumber = getResponseContent(
    parsed,
    "getStopsByNumberResponse",
    "getStopsByNumberResult",
    "stops",
    "s"
  );

  console.log(JSON.stringify(stopsByNumber));
  return stopsByNumber;
}

export async function getStopsOnStreet(streetId: string) {
  await getStreets();
  const { body } = await got.post(
    "http://sip.zdzit.olsztyn.eu/PublicService.asmx",
    {
      body: `<?xml version='1.0' encoding='utf-8'?>
      <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
        <soap:Body>
          <GetStopsOnStreet xmlns='http://PublicService/'>
            <id_ul>${streetId}</id_ul>
          </GetStopsOnStreet>
        </soap:Body>
      </soap:Envelope>`,
      headers: { "Content-Type": "text/xml;charset=UTF-8" },
      cookieJar,
    }
  );

  const changeAttrName = (name: string) => {
    switch (name) {
      case "u":
        return "street";
      case "l":
        return "routes";
      case "num":
        return "number";
      default:
        return name;
    }
  };

  const parsed = await parseStringPromise(body, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix, firstCharLowerCase],
    attrNameProcessors: [changeAttrName],
    attrValueProcessors: [trimValue, splitRoutes],
  });

  const stopsOnStreet = getResponseContent(
    parsed,
    "getStopsOnStreetResponse",
    "getStopsOnStreetResult",
    "stops",
    "stop"
  );

  return stopsOnStreet;
}

export async function getRealDepartures(stopId: number) {
  await getStreets();
  const { body } = await got.post(
    "http://sip.zdzit.olsztyn.eu/PublicService.asmx",
    {
      body: `<?xml version='1.0' encoding='utf-8'?>
      <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
        <soap:Body>
          <CNR_GetRealDepartures xmlns='http://PublicService/'>
            <id>${stopId}</id>
          </CNR_GetRealDepartures>
        </soap:Body>
      </soap:Envelope>`,
      headers: { "Content-Type": "text/xml;charset=UTF-8" },
      cookieJar,
    }
  );

  const changeTagName = (name: string) => {
    switch (name) {
      case "r":
        return "routes";
      case "s":
        return "schedule";
      default:
        return name;
    }
  };

  const changeAttrName = (name: string) => {
    switch (name) {
      case "ds":
        return "message";
      case "r":
        return "routes";
      case "nr":
        return "number";
      case "dir":
        return "direction";
      case "vt":
        return "vehicleType";
      case "th":
        return "hour";
      case "tm":
        return "minutes";
      case "t":
        return "time";
      default:
        return name;
    }
  };
  const parsed = await parseStringPromise(body, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [stripPrefix, normalize, changeTagName],
    attrNameProcessors: [changeAttrName],
    attrValueProcessors: [trimValue],
  });

  const realDepartures = getResponseContent(
    parsed,
    "cnr_getrealdeparturesresponse",
    "cnr_getrealdeparturesresult",
    "schedules"
  );

  delete realDepartures.xmlns;

  return realDepartures;
}
