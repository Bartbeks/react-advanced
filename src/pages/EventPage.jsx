import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UsersContext, CatsContext } from "../store/user-context";
import {
  Image,
  Box,
  Text,
  Flex,
  Button,
  Tag,
  Wrap,
  WrapItem,
  Spacer,
} from "@chakra-ui/react";
import UpdateEventModal from "../components/UpdateEventModal";
import { updateEvent } from "../api/eventApi";
import { ToastContainer } from "react-toastify";

export const EventPage = () => {
  const location = useLocation();
  const { event } = location.state;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modifydEvent, setModifydEvent] = useState(event);

  const startTime = new Date(modifydEvent.startTime);
  const endTime = new Date(modifydEvent.endTime);

  const dayName = startTime.toLocaleDateString("nl-NL", {
    weekday: "short",
  });
  const time = startTime.toLocaleTimeString("nl-NL", {
    hour: "numeric",
    minute: "numeric",
  });
  const day = startTime.toLocaleDateString("nl-NL", {
    day: "numeric",
  });
  const month = startTime.toLocaleDateString("nl-NL", {
    month: "numeric",
  });
  const year = startTime.toLocaleDateString("nl-NL", {
    year: "numeric",
  });
  const dayNameEnd = endTime.toLocaleDateString("nl-NL", {
    weekday: "short",
  });
  const timeEnd = endTime.toLocaleTimeString("nl-NL", {
    hour: "numeric",
    minute: "numeric",
  });
  const dayEnd = endTime.toLocaleDateString("nl-NL", {
    day: "numeric",
  });
  const monthEnd = endTime.toLocaleDateString("nl-NL", {
    month: "numeric",
  });
  const yearEnd = endTime.toLocaleDateString("nl-NL", {
    year: "numeric",
  });

  useEffect(() => {
    setModifydEvent(event);
  }, [event]);
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
        const tmpUser = {};
        tmpUser.id = element.id;
        tmpUser.name = element.name;
        tmpUser.image = element.image;
        attendedBy.push(tmpUser);
      }
    });
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        {isUpdateModalOpen && (
          <UpdateEventModal
            event={modifydEvent}
            closeModal={handleCloseUpdateModal}
            isModalOpen={isUpdateModalOpen}
            handleUpdate={updateEventHandler}
          />
        )}
        <Flex direction="column" alignItems="center">
          <Flex direction={"row"} width={"100%"}>
            <Flex alignItems="start">
              <Text fontSize="6xl">{modifydEvent.title}</Text>
            </Flex>
            <Spacer></Spacer>
            <Flex>
              <Text style={{ marginTop: "15px", paddingRight: "15px" }}>
                Creator: {MyUser.name}
              </Text>
              <Image
                borderRadius="full"
                boxSize="80px"
                src={MyUser.image}
                alt={modifydEvent.title}
              />
            </Flex>
          </Flex>

          <Flex alignItems="start" width={"100%"}>
            <Text fontSize="4xl">Location: {modifydEvent.location}</Text>
          </Flex>

          <Flex direction="column" alignItems="start" width={"100%"} gap={2}>
            <Flex>
              <Text fontSize="lg" textTransform="uppercase" pr={1}>
                {dayName}
              </Text>
              <Text fontSize="lg">{day}-</Text>
              <Text fontSize="lg">{month}-</Text>
              <Text fontSize="lg" pr={2}>
                {year}
              </Text>
              <Text fontSize="lg"> {time}</Text>
            </Flex>
            <Flex>
              <Text fontSize="lg" textTransform="uppercase" pr={1}>
                {dayNameEnd}
              </Text>
              <Text fontSize="lg">{dayEnd}-</Text>
              <Text fontSize="lg">{monthEnd}-</Text>
              <Text fontSize="lg" pr={2}>
                {yearEnd}
              </Text>
              <Text fontSize="lg"> {timeEnd}</Text>
            </Flex>
          </Flex>

          <Flex justifyContent={"start"} width={"100%"}>
            <Image
              boxSize="400px"
              objectFit="cover"
              src={modifydEvent.image}
              alt={modifydEvent.title}
            />
          </Flex>
          <Flex alignItems="start" width={"100%"}>
            <Text fontSize="md" style={{ maxWidth: "60ch", marginTop: "15px" }}>
              {modifydEvent.description}
            </Text>
          </Flex>
          {modifydEvent.categoryIds.length > 0 && (
            <>
              <Flex alignItems="start" width={"100%"}>
                {categories
                  .filter((category) =>
                    modifydEvent.categoryIds.includes(category.id)
                  )
                  .map((category) => (
                    <Wrap key={category.id} spacing={"15px"}>
                      <WrapItem>
                        <Tag m={"15px"}>{category.name}</Tag>
                      </WrapItem>
                    </Wrap>
                  ))}
              </Flex>
            </>
          )}
          <Flex justifyContent={"start"} width={"100%"}>
            <Text p={"15px"}>Attended by:</Text>
            {attendedBy.map((attenend) => (
              <Box key={attenend.id}>
                <Text p={"15px"}>{attenend.name}</Text>
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={attenend.image}
                  alt={attenend.name}
                  mr="12px"
                />
              </Box>
            ))}
          </Flex>
          <Flex width={"100%"}>
            <Spacer></Spacer>
            <Button
              colorScheme="blue"
              mr={"1rem"}
              onClick={handleOpenUpdateModal}
            >
              Update Event
            </Button>
          </Flex>
        </Flex>
        {/* Display other event details */}
        <ToastContainer />
      </Flex>
    </>
  );
};
