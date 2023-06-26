import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UsersContext, CatsContext } from "../store/user-context";
import { Image, Box, Text, Flex, Button } from "@chakra-ui/react";
import UpdateEventModal from "../components/UpdateEventModal";
import { updateEvent } from "../api/eventApi";
import { ToastContainer } from "react-toastify";

export const EventPage = () => {
  const location = useLocation();
  const { event } = location.state;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modifydEvent, setModifydEvent] = useState(event);

  useEffect(() => {
    setModifydEvent(event);
  }, [event]);
  console.log(modifydEvent);

  let MyUser = "";
  const attendedBy = [];
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const updateEventHandler = async (updatedEvent) => {
    try {
      const data = await updateEvent(updatedEvent);

      setModifydEvent(data);
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const { categories } = useContext(CatsContext);
  const { users } = useContext(UsersContext);
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  {
    users.forEach((element) => {
      if (modifydEvent.createdBy === element.id) {
        MyUser = element;
      }
      if (modifydEvent.attendedBy.includes(element.id)) {
        const test = {};
        test.id = element.id;
        test.name = element.name;
        test.image = element.image;
        attendedBy.push(test);
        console.log(attendedBy);
      }
    });
  }
  const eventCategories = categories.filter((category) =>
    modifydEvent.categoryIds.includes(category.id)
  );

  // const test2 = test.users;

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {isUpdateModalOpen && (
        <UpdateEventModal
          event={modifydEvent}
          closeModal={handleCloseUpdateModal}
          isModalOpen={isUpdateModalOpen}
          handleUpdate={updateEventHandler}
        />
      )}
      <div>
        <Text fontSize="6xl">{modifydEvent.title} Details</Text>
        <p> Creator :{MyUser.name}</p>
        <p>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={MyUser.image}
            alt={modifydEvent.title}
          />
        </p>
        <p>Description: {modifydEvent.description}</p>
        <p>location: {modifydEvent.location}</p>
        {eventCategories.map((category) => (
          <p key={category.id}>
            <span>{category.name}</span>
          </p>
        ))}
        {attendedBy.map((attenend) => (
          <Box key={attenend.id}>
            <Image
              borderRadius="full"
              boxSize="80px"
              src={attenend.image}
              alt={attenend.name}
            />
            Attenend by: <span>{attenend.name}</span>
          </Box>
        ))}
        <p>
          Image:{" "}
          <Image
            boxSize="400px"
            objectFit="cover"
            src={modifydEvent.image}
            alt={modifydEvent.title}
          />
        </p>{" "}
        <Button mr={"1rem"} onClick={handleOpenUpdateModal}>
          Update Event
        </Button>
        {/* Display other event details */}
      </div>
      <ToastContainer />
    </Flex>
  );
};
