import { createContext } from "react";

const HomeContext = createContext({} as {
    id: string,
    owner: string,
    mice: string,
    protocol: string
});

export default HomeContext;