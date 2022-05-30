import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormLabel,
  FormControl,
  Button,
  Text,
  IconButton,
  Textarea,
  Flex,
  Spacer,
  Box,
  Grid,
  Heading,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

function JournalEntry(props) {
  const navigate = useNavigate();
  function EntryHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    return (
      <Flex>
        <Spacer />
        <Box p="4">
          <Heading>
            <Text fontSize={"6xl"}>{props.pageType}</Text>
          </Heading>
        </Box>
        <Spacer />
        <Box p="4">
          <IconButton
            variant="outline"
            onClick={onOpen}
            colorScheme="teal"
            aria-label="Save and Exit"
            icon={<CloseIcon />}
          />
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>
                Done Journaling? Save Before Exiting
              </AlertDialogHeader>
              <AlertDialogCloseButton />

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() =>
                    navigate("/monthly", {
                      state: { name: props.name, email: props.email },
                    })
                  }
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      </Flex>
    );
  }

  function EntryForm() {
    const [entry, setEntry] = useState({
      prompt1: "",
      prompt2: "",
      prompt3: "",
      prompt4: "",
    });

    function handleChange(event) {
      const { name, value } = event.target;
      if (name === "prompt1")
        setEntry({
          prompt1: value,
          prompt2: entry["prompt2"],
          prompt3: entry["prompt3"],
          prompt4: entry["prompt4"],
        });
      else if (name === "prompt2")
        setEntry({
          prompt1: entry["prompt1"],
          prompt2: value,
          prompt3: entry["prompt3"],
          prompt4: entry["prompt4"],
        });
      else if (name === "prompt3")
        setEntry({
          prompt1: entry["prompt1"],
          prompt2: entry["prompt2"],
          prompt3: value,
          prompt4: entry["prompt4"],
        });
      else
        setEntry({
          prompt1: entry["prompt1"],
          prompt2: entry["prompt2"],
          prompt3: entry["prompt3"],
          prompt4: value,
        });
    }

    function submitForm() {
      props.handleSubmit(entry);
      setEntry({ prompt1: "", prompt2: "", prompt3: "", prompt4: "" });
    }

    return (
      <Flex>
        <Spacer></Spacer>
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel htmlFor="prompt1">
              <Heading>{props.titles[0]}</Heading>
            </FormLabel>
            <Textarea
              id="prompt1"
              name="prompt1"
              onChange={handleChange}
              height={"200px"}
              width={"1000px"}
              placeholder={props.placeholders[0]}
            />
            <Grid templateColumns="repeat(2, 1fr)">
              <Box>
                <FormLabel htmlFor="prompt2">
                  <Heading>{props.titles[1]}</Heading>
                </FormLabel>
                <Textarea
                  id="prompt2"
                  name="prompt2"
                  height={"200px"}
                  width={"500px"}
                  onChange={handleChange}
                  placeholder={props.placeholders[1]}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="prompt3">
                  <Heading>{props.titles[2]}</Heading>
                </FormLabel>
                <Textarea
                  id="prompt3"
                  name="prompt3"
                  height={"200px"}
                  width={"500px"}
                  onChange={handleChange}
                  placeholder={props.placeholders[2]}
                />
              </Box>
            </Grid>
            <FormLabel htmlFor="prompt4">
              <Heading>{props.titles[3]}</Heading>
            </FormLabel>
            <Textarea
              id="prompt4"
              name="prompt4"
              height={"200px"}
              width={"1000px"}
              onChange={handleChange}
              placeholder={props.placeholders[3]}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Save
          </Button>
        </form>
        <Spacer></Spacer>
      </Flex>
    );
  }
  return (
    <Box>
      <EntryHeader></EntryHeader>

      <EntryForm></EntryForm>
    </Box>
  );
}

export default JournalEntry;
