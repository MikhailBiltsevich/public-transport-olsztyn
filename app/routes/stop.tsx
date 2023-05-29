import { Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { useState } from "react";

export default function Index() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const stopId = pathParts[pathParts.length - 2];
  const [activeTab, setActiveTab] = useState<string>(
    pathParts[pathParts.length - 1]
  );

  const tabs = [
    {
      label: "Real Departures",
      to: `/stop/${stopId}/real`,
      value: "real",
    },
    {
      label: "Planed Departures",
      to: `/stop/${stopId}/planed`,
      value: "planed",
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          {tabs.map((tab) => (
            <Tab component={Link} key={tab.value} {...tab} />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
}
