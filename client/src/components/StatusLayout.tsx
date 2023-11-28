import { useEffect, useState } from "react";

import { Context } from "./LayoutContext";

import { status } from "../api/auth";

const Layout = ({ children }: any) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await status();
        setData(data.data);
      } catch (error) {}
    };

    checkStatus();
  }, []);

  return <Context.Provider value={{ user: data }}>{children}</Context.Provider>;
};

export default Layout;
