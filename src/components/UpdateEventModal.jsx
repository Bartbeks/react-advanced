import React, { useState, useContext } from "react";
import { UsersContext } from "../store/user-context";
import { toast } from "react-toastify";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  VStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";

const UpdateEventModal = ({ event, closeModal, isModalOpen, handleUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const { users } = useContext(UsersContext);

  const handleChange = (event) => {
    const { id, value, checked } = event.target;

    if (event.target.id === "sports" || event.target.id === "games") {
      const categoryId = parseInt(value);
      setUpdatedEvent((prevEvent) => {
        const updatedCategoryIds = checked
          ? [...prevEvent.categoryIds, categoryId]
          : prevEvent.categoryIds.filter((item) => item !== categoryId);

        return {
          ...prevEvent,
          categoryIds: updatedCategoryIds,
        };
      });
    } else if (
      event.target.id === "attendOne" ||
      event.target.id === "attendTwo"
    ) {
      const attendId = parseInt(value);
      setUpdatedEvent((prevEvent) => {
        const updatedAttendedBy = checked
          ? [...prevEvent.attendedBy, attendId]
          : prevEvent.attendedBy.filter((item) => item !== attendId);

        return {
          ...prevEvent,
          attendedBy: updatedAttendedBy,
        };
      });
    } else {
      setUpdatedEvent((prevEvent) => ({
        ...prevEvent,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString();
    if (
      updatedEvent.startTime > currentDateTime &&
      updatedEvent.endTime > currentDateTime &&
      updatedEvent.endTime > updatedEvent.startTime
    ) {
      handleUpdate(updatedEvent);
      closeModal(); // Close the modal after updating
      toast.success("Event updated successfully!");
    } else {
      if (
        updatedEvent.startTime <= currentDateTime ||
        updatedEvent.endTime <= currentDateTime
      ) {
        toast.error("Please select a future start date and end date");
      } else {
        toast.error("End date should be greater than start date");
      }
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent p={10}>
          <ModalHeader>Update event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  value={updatedEvent.title}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  type="text"
                  id="description"
                  value={updatedEvent.description}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="image">image url</FormLabel>
                <Input
                  type="text"
                  id="image"
                  value={updatedEvent.image}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="location">location</FormLabel>
                <Input
                  type="text"
                  id="location"
                  value={updatedEvent.location}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="startTime">startdate</FormLabel>
                <Input
                  type="datetime-local"
                  id="startTime"
                  value={updatedEvent.startTime.slice(0, 16)}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="endTime"> endDate</FormLabel>
                <Input
                  type="datetime-local"
                  id="endTime"
                  value={updatedEvent.endTime.slice(0, 16)}
                  onChange={handleChange}
                />

                <FormLabel htmlFor="categoryIds" mb={"15px"}>
                  Category
                </FormLabel>

                <VStack align="start">
                  <Checkbox
                    id="sports"
                    value="1"
                    onChange={handleChange}
                    isChecked={updatedEvent.categoryIds.includes(1)}
                  >
                    Sports
                  </Checkbox>

                  <Checkbox
                    id="games"
                    value="2"
                    onChange={handleChange}
                    isChecked={updatedEvent.categoryIds.includes(2)}
                  >
                    Games
                  </Checkbox>
                </VStack>

                <FormLabel htmlFor="attendedBy" mb={"15px"}>
                  Attended by
                </FormLabel>

                <VStack align="start">
                  <Checkbox
                    id="attendOne"
                    value="1"
                    isChecked={updatedEvent.attendedBy.includes(1)}
                    onChange={handleChange}
                  >
                    {users[0].name}
                  </Checkbox>

                  <Checkbox
                    id="attendTwo"
                    value="2"
                    isChecked={updatedEvent.attendedBy.includes(2)}
                    onChange={handleChange}
                  >
                    {users[1].name}
                  </Checkbox>
                </VStack>
                <Flex width={"100%"}>
                  <Spacer></Spacer>{" "}
                  <Button type="submit" colorScheme="blue">
                    Save
                  </Button>
                </Flex>

                {/* Add more input fields as needed */}
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEventModal;
