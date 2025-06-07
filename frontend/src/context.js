/**
 * Sets initial values of context items / global variables and creates
 * a set of these global variables, returning them back to App.jsx
 *
 * To access these in a given file:
 *
 * import { useContext, Context } from "{path}/context";
 *
 * const {getters, setters } = useContext(Context);
 *
 * getters.token
 * setters.setToken()
*/

import React from "react";
import { createContext } from "react";

export const initialValue = {
  token: localStorage.getItem("token"),
  presentations: JSON.parse(localStorage.getItem("presentations")) || {}
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;