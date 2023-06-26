import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonGroup,
  Heading,
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const UpdateEventModal = ({ event, closeModal, isModalOpen, handleUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      handleUpdate(updatedEvent);
    }
    // Handle the form submission and update the event
    // You can make an API call or update the event state here
    // ...
    closeModal(); // Close the modal after updating
    toast.success("Event updated successfully!");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
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
                {/* Add more input fields as needed */}
                <Button type="submit">Save</Button>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEventModal;
