import React, { useContext } from "react";
import { Link } from "@chakra-ui/react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { UsersContext } from "../store/user-context";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const { users } = useContext(UsersContext);
  const showEventDetailLink = location.pathname === `/event/${eventId}`;
  return (
    <Flex justifyContent="center">
      <Flex bg="gray.200" p={4} justify="space-between" width={"50vw"}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            <Link
              color={location.pathname === "/" ? "blue.500" : "blue.800"}
              _hover={{ color: "blue.500" }}
              _focus={{ outline: "none", boxShadow: "0 0 0 2px blue" }}
              onClick={() => navigate("/")}
              mr={4}
            >
              Events
            </Link>
            {showEventDetailLink && (
              <Link mr={4} color={"red"}>
                Event Detail
              </Link>
            )}
          </Text>
        </Box>
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Meet the makers
            </MenuButton>
            <MenuList>
              {users.map((user) => (
                <>
                  <MenuItem key={user.id}>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src={user.image}
                      alt={user.name}
                      mr="12px"
                    />
                    <span>{user.name}</span>
                  </MenuItem>
                </>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};
