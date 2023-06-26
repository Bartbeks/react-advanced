import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Box,
  Image,
  Button,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Text,
  Flex,
  Tag,
  Wrap,
  WrapItem,
  ButtonGroup,
} from "@chakra-ui/react";
import { Warning } from "../components/AlertDialog";
import { CatsContext } from "../store/user-context";

export const Eventdetails = ({ event, handleDelete }) => {
  const { categories } = useContext(CatsContext);

  const startTime = new Date(event.startTime);

  const timeStart = startTime.toLocaleTimeString("nl-NL", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dayName = startTime.toLocaleDateString("nl-NL", {
    weekday: "short",
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
  // const formattedEndDate = endTime.toLocaleDateString("nl-NL", {
  //   month: "numeric",
  // });
  // const formattedEndTime = endTime.toLocaleTimeString("nl-NL", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <Card
      p={"30px"}
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="outline"
      colorScheme="facebook"
    >
      <Box p={"50px"}>
        <Heading size="xl">{dayName}</Heading>
        <Flex>
          <Heading size="md">{day}</Heading> -
          <Heading size="md">{month}</Heading>
        </Flex>
        <Heading size="md">{year}</Heading>
        <Heading size="md">{timeStart}</Heading>
      </Box>
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={event.image}
        alt={event.title}
      />
      <Stack>
        <CardBody>
          <Heading size="md">{event.title}</Heading>

          <Text style={{ maxWidth: "50ch", minWidth: "50ch" }} py="2">
            {event.description}
          </Text>
          {event.categoryIds.length > 0 && (
            <Flex>
              {categories
                .filter((category) => event.categoryIds.includes(category.id))
                .map((category) => (
                  <Wrap key={category.id} spacing={"15px"}>
                    <WrapItem>
                      <Tag m={"15px"}>{category.name}</Tag>
                    </WrapItem>
                  </Wrap>
                ))}
            </Flex>
          )}
        </CardBody>

        <CardFooter>
          <ButtonGroup gap="4">
            <Button
              mr="15px"
              variant="solid"
              colorScheme="blue"
              onClick={handleBoxClick}
            >
              Details
            </Button>
          </ButtonGroup>
          <Warning handleDelete={handleDelete} id={event.id}></Warning>
        </CardFooter>
      </Stack>
    </Card>

    // <Box>
    //   <Heading>{event.title}</Heading>
    //   <Image src={event.image} alt={event.title} />
    //   <p>{event.description}</p>
    //   <p>
    //     <span>
    //       date: {formattedDate} time: {formattedTime}
    //     </span>
    //     <span>
    //       {" "}
    //       date: {formattedEndDate} Time {formattedEndTime}
    //     </span>
    //   </p>
    //   <p>Event Categories:</p>

    //   <>
    //     {categories.map((category) => (
    //       <badge key={category.id}>{category.name}</badge>
    //     ))}
    //   </>

    //   <Button mr={"1rem"} onClick={handleBoxClick}>
    //     Details
    //   </Button>

    //   <Warning handleDelete={handleDelete} id={event.id}></Warning>
    // </Box>
  );
};
