import { createContext } from "react";

const UserContext = createContext({
    loggedUser: 'Default User'
});

export default UserContext;