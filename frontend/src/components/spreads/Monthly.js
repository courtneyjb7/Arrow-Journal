import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "./Monthly.css";
import axios from "axios";
import {
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Heading,
  HStack,
  VStack,
  Tr,
  Td,
  Table,
  ButtonGroup,
  IconButton,
  Editable,
  EditablePreview,
  Input,
  Tbody,
  useEditableControls,
  EditableTextarea,
  Image,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

function Monthly() {
  const { state } = useLocation();
  const [dumps, setDumps] = useState([]);

  console.log(state);

  function editOneDump(index, dumpToUpdate) {
    const updatedDump = makePutCall(dumps[index], dumpToUpdate);
    const updated = dumps;
    updated[index] = updatedDump;

    setDumps(updated);
  }

  function removeOneDump(index) {
    makeDeleteCall(dumps[index]);

    const updated = dumps.filter((dump, i) => {
      return i !== index;
    });

    setDumps(updated);
  }

  async function makePostCall(dump) {
    try {
      const response = await axios.post("http://localhost:5000/dumps", dump);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePutCall(dump, dumpToUpdate) {
    try {
      const response = await axios.put(
        `http://localhost:5000/dumps/${dump.id}`,
        dumpToUpdate
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(dump) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/dumps/${dump.id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateBrainDump(dump) {
    makePostCall(dump).then((result) => {
      console.log(result);
      if (result && result.status === 201) {
        setDumps([...dumps, result.data]);
      }
    });
  }

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:5000/dumps");
      return response.data.dumps_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setDumps(result);
      }
    });
  }, []);

  return (
    <VStack className="monthly">
      <Image className="logo" src="Arrow.png" alt="Arrow Journal" />
      <WelcomeMessage className="welcome" />
      <HStack className="body">
        <MonthlyCalendar />
        <VStack className="brainDump">
          <BrainDumpForm handleSave={updateBrainDump} />
          <BrainDump
            dumpData={dumps}
            handleSave={editOneDump}
            removeDump={removeOneDump}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}

function WelcomeMessage() {
  var today = new Date();
  const { state } = useLocation();
  const navigate = useNavigate();

  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  let months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  function goToProfile() {
    navigate("/profile", { state: state });
  }
  const first = state.name.split(" ")[0];
  return (
    <Stack spacing={8} direction="row">
      <Heading className="welcome">
        Hi, {first}! Today is {days[today.getDay()]}, {months[today.getMonth()]}{" "}
        {today.getDate()} {today.getFullYear()}.
      </Heading>
      <AvatarGroup spacing="1rem">
        <Avatar bg="#6A877F" onClick={goToProfile} _hover={{ bg: "#d08a78" }} />
      </AvatarGroup>
    </Stack>
  );
}

function MonthlyCalendar() {
  const [date, onChange] = useState(new Date());
  const navigate = useNavigate();

  function routeToDaily(props) {
    navigate("/daily", { state: { date: props } });
  }

  return (
    <Calendar onChange={onChange} value={date} onClickDay={routeToDaily} />
  );
}

function BrainDumpForm(props) {
  const [dump, setDump] = useState({
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "content") {
      setDump({ content: value });
    }
  }

  function saveDump() {
    if (!(dump.content === "")) {
      props.handleSave(dump);
      setDump({ content: "" });
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor="brainDump">
        BRAIN DUMP
        <Textarea
          type="text"
          name="content"
          id="content"
          value={dump.content}
          variant="outline"
          onChange={handleChange}
          placeholder="What's on your mind?"
          _placeholder={{ opacity: 0.4, color: "inherit" }}
        />
      </FormLabel>
      <IconButton
        className="save"
        aria-label="save dump"
        icon={<CheckIcon />}
        onClick={saveDump}
      />
    </FormControl>
  );
}

function BrainDump(props) {
  const [dump, setDump] = useState({
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "content") {
      setDump({ content: value });
    }
  }

  function EditableControls(props) {
    const { isEditing, getSubmitButtonProps, getEditButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label="save edit"
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
          aria-label="edit dump"
        />
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => props.removeDump(props.index)}
          aria-label="delete dump"
        />
      </ButtonGroup>
    );
  }

  function saveDump(hs, idx) {
    if (!(dump.content === "")) {
      hs(idx, dump);
      setDump({ content: "" });
    }
  }

  function restoreDump() {
    if (!(dump.content === "")) {
      setDump({ content: "" });
    }
  }

  const rows = props.dumpData.map((row, index) => {
    return (
      <Tr key={index}>
        <Td>
          <Editable
            defaultValue={row.content}
            isPreviewFocusable={false}
            onSubmit={() => saveDump(props.handleSave, index)}
            onCancel={() => restoreDump()}
          >
            <EditablePreview />
            <Input
              as={EditableTextarea}
              type="text"
              name="content"
              id="content"
              value={dump.content}
              variant="outline"
              onChange={handleChange}
            />
            <br />
            <EditableControls removeDump={props.removeDump} index={index} />
          </Editable>
        </Td>
      </Tr>
    );
  });
  return (
    <Table>
      <Tbody>{rows}</Tbody>
    </Table>
  );
}

export default Monthly;
