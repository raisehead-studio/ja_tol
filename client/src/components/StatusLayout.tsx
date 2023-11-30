import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Context } from "./LayoutContext";

import { status } from "../api/auth";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await status();
        setData(data.data);
      } catch (error) {}
    };

    checkStatus();
  }, [location]);

  return <Context.Provider value={{ user: data }}>{children}</Context.Provider>;
};

export default Layout;
