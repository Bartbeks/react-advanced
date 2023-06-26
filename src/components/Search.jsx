import React, { useState, useContext } from "react";
import { Input, Select } from "@chakra-ui/react";
import { CatsContext } from "../store/user-context";

export const Search = ({ handleSearch }) => {
  // const [selectedCategory, setSelectedCategory] = useState("");

  // const { categories } = useContext(CatsContext);

  return (
    <>
      <Input
        type="text"
        placeholder="Search events by name"
        name={selectedCategory}
        onChange={handleSearch}
      />

      <Select
        value={selectedCategory}
        name="searchField"
        onChange={handleSearch}
      >
        {categories.map((categorie) => {
          return (
            <option key={categorie.id} type="number" value={categorie.id}>
              {categorie.name}
            </option>
          );
        })}
      </Select>
    </>
  );
};
