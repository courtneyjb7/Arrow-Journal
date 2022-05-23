import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./Monthly.css";
import axios from "axios";
import {
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
  EditableInput,
  EditablePreview,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon, DeleteIcon, CloseIcon } from "@chakra-ui/icons";

function Monthly() {
  const [dumps, setDumps] = useState([]);

  function removeOneDump(index) {
    makeDeleteCall(dumps[index]);

    const updated = dumps.filter((dump, i) => {
      return i !== index;
    });

    setDumps(updated);
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

  async function makePostCall(dump) {
    try {
      const response = await axios.post("http://localhost:5000/dumps", dump);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <VStack className="monthly">
      <WelcomeMessage />
      <HStack className="body">
        <MonthlyCalendar />
        <VStack className="brainDump">
          <BrainDumpForm handleSave={updateBrainDump} />
          <BrainDump dumpData={dumps} removeDump={removeOneDump} />
        </VStack>
      </HStack>
    </VStack>
  );
}

function WelcomeMessage() {
  var today = new Date();

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

  return (
    <Heading className="welcome">
      Hi, BJ Klingenberg! Today is {days[today.getDay()]},{" "}
      {months[today.getMonth()]} {today.getDate()} {today.getFullYear()}.
    </Heading>
  );
}

function MonthlyCalendar() {
  const [date, onChange] = useState(new Date());
  const navigate = useNavigate();

  function routeToDaily(props) {
    console.log(props);
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
  // const {
  // isEditing,
  // getSubmitButtonProps,
  // getCancelButtonProps,
  // getEditButtonProps,
  // } = useEditableControls();
  const isEditing = false;

  const rows = props.dumpData.map((row, index) => {
    return isEditing ? (
      <Tr key={index}>
        <Td>
          <Editable defaultValue={row.content} isPreviewFocusable={false}>
            <EditablePreview />
            <Input as={EditableInput} />
          </Editable>
        </Td>
        <Td isNumeric>
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} />
            <IconButton icon={<CloseIcon />} />
          </ButtonGroup>
        </Td>
      </Tr>
    ) : (
      <Tr key={index}>
        <Td>
          <Editable defaultValue={row.content} isPreviewFocusable={false}>
            <EditablePreview />
            <Input as={EditableInput} />
          </Editable>
        </Td>
        <Td isNumeric>
          <ButtonGroup justifyContent="center" size="sm">
            <IconButton
              className="edit"
              aria-label="edit dump"
              icon={<EditIcon />}
            />
            <IconButton
              className="delete"
              aria-label="delete dump"
              icon={<DeleteIcon />}
              onClick={() => props.removeDump(index)}
            />
          </ButtonGroup>
        </Td>
      </Tr>
    );
  });
  return <Table>{rows}</Table>;
}

export default Monthly;
