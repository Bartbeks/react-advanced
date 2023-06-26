import React, { useState, useEffect, useCallback, useContext } from "react";
import { CatsContext } from "../store/user-context";

import { Flex, Input, Select } from "@chakra-ui/react";
import { Eventdetails } from "../components/EventDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NewEvent } from "../components/NewEventButton";
import AddEventModal from "../components/AddEventModal";

import { addEvent, deleteEvent } from "../api/eventApi";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [eventCategories, setEventCategories] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [searchField, setSearchField] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useContext(CatsContext);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const fetchEventsHandler = useCallback(async () => {
    const strippedSearchField = searchField.replace(/['"]/g, "");
    const response = await fetch(
      `http://localhost:3000/events?q=${strippedSearchField}`
    );
    const data = await response.json();
    setEvents(data);
  }, [searchField]);

  const addEventsHandler = async (event) => {
    const data = await addEvent(event);
    setEvents((prevEvents) => [...prevEvents, data]);
    setEventCategories((prevEventCategories) => ({
      ...prevEventCategories,
      [data.id]: data.categoryIds,
    }));
  };

  const deleteEventHandler = async (id) => {
    await deleteEvent(id);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setEventCategories((prevEventCategories) => {
      const updatedCategories = { ...prevEventCategories };
      delete updatedCategories[id];
      return updatedCategories;
    });
  };

  useEffect(() => {
    fetchEventsHandler();
  }, [fetchEventsHandler, searchField]);

  const filteredEvents = events.filter((event) => {
    if (selectedCategory) {
      const selectedCategoryId = parseInt(selectedCategory, 10);
      if (!event.categoryIds.includes(selectedCategoryId)) {
        return false;
      }
    }
    if (textInput) {
      const searchText = textInput.toLowerCase();
      if (
        !event.title.toLowerCase().includes(searchText) &&
        !event.description.toLowerCase().includes(searchText) &&
        !event.location.toLowerCase().includes(searchText)
      ) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    // Update event categories when events change
    const updatedEventCategories = {};
    events.forEach((event) => {
      updatedEventCategories[event.id] = event.categoryIds;
    });
    setEventCategories(updatedEventCategories);
  }, [events]);

  return (
    <>
      <Flex justifyContent="center" mt="15px">
        <Flex width={"50vw"}>
          <Input
            type="text"
            colorScheme="facebook"
            placeholder="Search events ..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </Flex>
      </Flex>

      <Flex justifyContent="center" mt="15px">
        <Flex width={"50vw"}>
          <Select
            colorScheme="facebook"
            variant="filled"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category...</option>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <Flex>
        <Flex
          m={4}
          flexDirection="column"
          gap={"10px"}
          width={"100vw"}
          alignItems="center "
          justifyContent="center"
        >
          <Flex justifyContent="flex-end" width={"50vw"}>
            <Flex>
              <NewEvent handleOpenAddModal={handleOpenAddModal} />
            </Flex>
          </Flex>
          {filteredEvents.map((event) => (
            <Eventdetails
              key={event.id}
              event={event}
              cats={eventCategories[event.id]}
              handleDelete={deleteEventHandler}
            ></Eventdetails>
          ))}
        </Flex>
      </Flex>
      {isAddModalOpen && (
        <AddEventModal
          // event={event}
          closeModal={handleCloseAddModal}
          isModalOpen={isAddModalOpen}
          handleAdd={addEventsHandler}
        />
      )}
      <ToastContainer />
    </>
  );
};
