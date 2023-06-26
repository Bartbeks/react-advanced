import { Button } from "@chakra-ui/react";
export const NewEvent = ({ handleOpenAddModal }) => {
  return (
    <Button colorScheme="blue" onClick={handleOpenAddModal}>
      Add new Event
    </Button>
  );
};
