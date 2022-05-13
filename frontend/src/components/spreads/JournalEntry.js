import React from "react";
import { useState } from "react";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  IconButton,
  Textarea,
  Flex,
  Spacer,
  Box,
  HStack,
  Grid,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";
import { CloseIcon } from "@chakra-ui/icons";

function JournalEntry(props) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var today = props.date;
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var day = days[today.getDay()];
  var month = months[today.getMonth()];
  today = mm + "/" + dd;

  function EntryHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    return (
      <Flex>
        <Box p="4">
          <Heading>
            {day}, {month} {dd}
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
              <AlertDialogHeader>Done Journaling?</AlertDialogHeader>
              <AlertDialogCloseButton />

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button colorScheme="red" ml={3}>
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
      <form onSubmit={submitForm}>
        <FormControl>
          <FormLabel htmlFor="prompt1">{props.titles[0]}</FormLabel>
          <Textarea
            id="prompt1"
            name="prompt1"
            onChange={handleChange}
            placeholder={props.placeholders[0]}
          />
          <Grid templateColumns="repeat(2, 1fr)">
            <Box>
              <FormLabel htmlFor="prompt2">{props.titles[1]}</FormLabel>
              <Textarea
                id="prompt2"
                name="prompt2"
                onChange={handleChange}
                placeholder={props.placeholders[1]}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="prompt3">{props.titles[2]}</FormLabel>
              <Textarea
                id="prompt3"
                name="prompt3"
                onChange={handleChange}
                placeholder={props.placeholders[2]}
              />
            </Box>
          </Grid>
          <FormLabel htmlFor="prompt4">{props.titles[3]}</FormLabel>
          <Textarea
            id="prompt4"
            name="prompt4"
            onChange={handleChange}
            placeholder={props.placeholders[3]}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Save
        </Button>
      </form>
    );
  }
  return (
    <div>
      <EntryHeader></EntryHeader>

      <EntryForm></EntryForm>
    </div>
  );
}

export default JournalEntry;