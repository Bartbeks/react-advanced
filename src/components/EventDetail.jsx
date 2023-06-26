import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Box, Image, Button } from "@chakra-ui/react";
import { Warning } from "../components/AlertDialog";
import { CatsContext } from "../store/user-context";

export const Eventdetails = ({ event, handleDelete }) => {
  const { categories } = useContext(CatsContext);

  const startTime = new Date(event.startTime);
  const formattedDate = startTime.toLocaleDateString("nl-NL", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = startTime.toLocaleTimeString("nl-NL", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTime = new Date(event.endTime);
  const formattedEndDate = endTime.toLocaleDateString("nl-NL", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndTime = endTime.toLocaleTimeString("nl-NL", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const navigate = useNavigate();
  console.log(event);
  const handleBoxClick = () => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <Box>
      <Heading>{event.title}</Heading>
      <Image src={event.image} alt={event.title} />
      <p>{event.description}</p>
      <p>
        <span>
          date: {formattedDate} time: {formattedTime}
        </span>
        <span>
          {" "}
          date: {formattedEndDate} Time {formattedEndTime}
        </span>
      </p>
      <p>Event Categories:</p>

      <>
        {categories.map((category) => (
          <p key={category.id}>{category.name}</p>
        ))}
      </>

      <Button mr={"1rem"} onClick={handleBoxClick}>
        Details
      </Button>

      <Warning handleDelete={handleDelete} id={event.id}></Warning>
    </Box>
  );
};
