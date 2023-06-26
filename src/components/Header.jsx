import { Box, Flex, Image } from "@chakra-ui/react";
import Logo from "../images/GameOnLogo.png";
import { Navigation } from "../components/Navigation";

export const Header = () => {
  return (
    <Box bg="white" color="black" mb={"15px"}>
      <Flex justifyContent="center">
        <Flex>
          <Image src={Logo} alt="Logo" w={"auto"} h={"80px"} />
        </Flex>
        <Flex>
          <Navigation></Navigation>
        </Flex>
      </Flex>
    </Box>
  );
};
