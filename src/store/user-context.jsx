import React, { createContext } from "react";

export const UsersContext = createContext({
  users: [],
});

export const CatsContext = createContext({
  categories: [],
});
