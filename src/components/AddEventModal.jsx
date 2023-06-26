import React, { useRef, useState, useContext, useEffect } from "react";
import { UsersContext } from "../store/user-context";
import { toast } from "react-toastify";

import {
  Box,
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
  Select,
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";

const AddEventModal = ({ closeModal, isModalOpen, handleAdd }) => {
  const { users } = useContext(UsersContext);
  const radomId = () => {
    return Math.floor(Math.random() * 1000); // Update the maximum value as needed
  };

  const [uniqueId, setUniqueId] = useState(radomId());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAtendend, setselectedAtendend] = useState([]);

  useEffect(() => {
    setUniqueId(radomId());
  }, []);

  const idRef = useRef(uniqueId);
  const createdByRef = useRef(null);
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
    const attendedBy = selectedAtendend.map((attended) => parseInt(attended));
    const categoryIds = selectedCategories.map((attended) =>
      parseInt(attended)
    );
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const image = imageRef.current.value;
    const location = locationRef.current.value;
    const startTime = startDateRef.current.value;
    const endTime = endDateRef.current.value;

    // Validate start date and end date
    const currentDateTime = new Date().toISOString();
    if (
      startTime > currentDateTime &&
      endTime > currentDateTime &&
      endTime > startTime
    ) {
      const newEvent = {
        id,
        createdBy,
        title,
        description,
        image,
        categoryIds,
        attendedBy,
        location,
        startTime,
        endTime,
      };

      handleAdd(newEvent);
      closeModal(); // Close the modal after updating
      toast.success("Event successfully added");
    } else {
      if (startTime <= currentDateTime || endTime <= currentDateTime) {
        toast.error("Please select a future start date and end date");
      } else {
        toast.error("End date should be greater than start date");
      }
    }
  };

  const handleCategoryChange = (value, checked) => {
    const intValue = parseInt(value);

    if (checked) {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        intValue,
      ]);
    } else {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((category) => category !== intValue)
      );
    }
  };
  const handleAttendByChange = (value, checked) => {
    const intValue = parseInt(value);

    if (checked) {
      setselectedAtendend((prevselectedAtendend) => [
        ...prevselectedAtendend,
        intValue,
      ]);
    } else {
      setselectedAtendend((prevselectedAtendend) =>
        prevselectedAtendend.filter((category) => category !== intValue)
      );
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent p={10}>
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
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  ref={titleRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="createdBy">Choose Creator</FormLabel>
                <Select
                  id="createdBy"
                  ref={createdByRef}
                  placeholder="Select creator"
                  required
                >
                  {users.map((user) => (
                    <option key={user.id} type="number" value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
                <FormLabel htmlFor="categoryIds" mb={"15px"}>
                  Choose Category
                </FormLabel>
                <CheckboxGroup id="categoryIds" required>
                  <VStack align="start">
                    <Checkbox
                      value="1"
                      onChange={(e) =>
                        handleCategoryChange(e.target.value, e.target.checked)
                      }
                      isChecked={selectedCategories.includes(1)}
                    >
                      Sport
                    </Checkbox>
                    <Checkbox
                      value="2"
                      onChange={(e) =>
                        handleCategoryChange(e.target.value, e.target.checked)
                      }
                      isChecked={selectedCategories.includes(2)}
                    >
                      Games
                    </Checkbox>
                  </VStack>
                </CheckboxGroup>
                <FormLabel htmlFor="attendedBy" mb={"15px"}>
                  Attended by
                </FormLabel>
                <CheckboxGroup id="attendedBy" value={selectedAtendend}>
                  <VStack align="start">
                    {users.map((user) => (
                      <Checkbox
                        key={user.id}
                        value={user.id}
                        onChange={(e) =>
                          handleAttendByChange(e.target.value, e.target.checked)
                        }
                        isChecked={selectedAtendend.includes(user.id)}
                      >
                        {user.name}
                      </Checkbox>
                    ))}

                    {/* Add more checkboxes as needed */}
                  </VStack>
                </CheckboxGroup>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  type="text"
                  id="description"
                  ref={descriptionRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="image">Image URL</FormLabel>
                <Input type="text" id="image" ref={imageRef} defaultValue="" />
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                  type="text"
                  id="location"
                  ref={locationRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="startDate">Start Date</FormLabel>
                <Input
                  type="datetime-local"
                  id="startDate"
                  ref={startDateRef}
                  defaultValue=""
                  required
                />
                <FormLabel htmlFor="endDate">End Date</FormLabel>
                <Input
                  type="datetime-local"
                  id="endDate"
                  ref={endDateRef}
                  defaultValue=""
                  required
                />
                {/* Add more input fields as needed */}
                <Box width={"100%"} pt={"15px"}>
                  <HStack align="end">
                    <Spacer />
                    <Button type="submit" colorScheme="blue">
                      Add Event
                    </Button>
                  </HStack>
                </Box>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;
