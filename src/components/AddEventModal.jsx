import React, { useRef, useState, useContext, useEffect } from "react";
import { UsersContext } from "../store/user-context";
import { toast } from "react-toastify";

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
  Select,
} from "@chakra-ui/react";

const AddEventModal = ({ closeModal, isModalOpen, handleAdd }) => {
  const { users } = useContext(UsersContext);
  const radomId = () => {
    return Math.floor(Math.random() * 1000); // Update the maximum value as needed
  };

  const [uniqueId, setUniqueId] = useState(radomId());

  useEffect(() => {
    setUniqueId(radomId());
  }, []);

  const idRef = useRef(uniqueId);
  const createdByRef = useRef(null);
  const attendByRef = useRef([]);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const locationRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(idRef.current.value);
    const createdBy = parseInt(createdByRef.current.value);
    const attendedBy = Array.from(attendByRef.current.options)
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    // const attendedBy = parseInt(attendedByRef.current);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const image = imageRef.current.value;
    const location = locationRef.current.value;
    const startTime = startDateRef.current.value;
    const endTime = endDateRef.current.value;

    const newEvent = {
      id,
      createdBy,
      title,
      description,
      image,
      categoryIds: [1, 2],
      attendedBy,
      location,
      startTime,
      endTime,
    };

    handleAdd(newEvent);
    closeModal(); // Close the modal after updating
    toast.success("Event successfully added");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="Id">Id</FormLabel>
                <Input
                  type="text"
                  id="Id"
                  ref={idRef}
                  value={parseInt(uniqueId)}
                  readOnly
                />
                <Select
                  ref={createdByRef}
                  placeholder="Select creator"
                  required
                >
                  {users.map((user) => {
                    return (
                      <option key={user.id} type="number" value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  ref={attendByRef}
                  placeholder="attend by"
                  required
                  multiple
                >
                  {users.map((user) => {
                    return (
                      <option key={user.id} type="number" value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  ref={titleRef}
                  defaultValue="The tinyhouse maker"
                  required
                />
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  type="text"
                  id="description"
                  ref={descriptionRef}
                  defaultValue="elke Zondag maar kan ook op een andere dag zijn"
                  required
                />
                <FormLabel htmlFor="image">image url</FormLabel>
                <Input
                  type="text"
                  id="image"
                  ref={imageRef}
                  defaultValue="https://media.licdn.com/dms/image/C4E03AQGx6nDXBtKgtw/profile-displayphoto-shrink_800_800/0/1586086647292?e=1692835200&v=beta&t=GUPNSeWLaQZjh-crj87nUn6oLPV0AoKlWwFVdl0Cv8c"
                />
                <FormLabel htmlFor="location">location</FormLabel>
                <Input
                  type="text"
                  id="location"
                  ref={locationRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="startDate">start</FormLabel>
                <Input
                  type="datetime-local"
                  id="startDate"
                  ref={startDateRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="endDate">End</FormLabel>
                <Input
                  type="datetime-local"
                  id="endDate"
                  ref={endDateRef}
                  defaultValue=""
                  required
                />
                {/* Add more input fields as needed */}
                <Button type="submit">Add event</Button>
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

export default AddEventModal;
