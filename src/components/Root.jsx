import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "../api/eventApi";
import { fetchCategories } from "../api/eventApi";
import { UsersContext, CatsContext } from "../store/user-context";
import { Header } from "../components/Header";
import { Flex } from "@chakra-ui/react";

export const Root = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.log("Error fetching cats:", error);
      }
    };

    getCategories();
  }, []);
  return (
    <CatsContext.Provider value={{ categories: categories }}>
      <UsersContext.Provider value={{ users: users }}>
        <Flex justifyContent="center" flexDirection="column">
          <Header></Header>
          <Outlet />
        </Flex>
      </UsersContext.Provider>
    </CatsContext.Provider>
  );
};
