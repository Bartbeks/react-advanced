import { Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
export const NewEvent = ({ handleOpenAddModal }) => {
  return (
    <Button
      colorScheme="messenger"
      borderRadius={"100%"}
      height="80px"
      width="80px"
      onClick={handleOpenAddModal}
    >
      <PlusSquareIcon boxSize={6}></PlusSquareIcon>
    </Button>
  );
};
