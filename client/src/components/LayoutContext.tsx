import { createContext, useContext } from "react";

export type User = {
  user: any;
};

export const Context = createContext<User>({
  user: null,
});

export const useLayoutContext = () => useContext(Context);
