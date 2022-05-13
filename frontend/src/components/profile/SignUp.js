import './SignUp.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Input, Stack , InputGroup, InputRightElement, Button, FormControl,
  FormLabel,
  FormHelperText,} from '@chakra-ui/react';
import React, { useState } from 'react';
import logo from '../../Arrow.png';
import fire from '../../fire.js';
import { useNavigate} from "react-router-dom";


function SignUp() {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwEmpty, setpwEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [formatErrorMessage, setformatErrorMessage] = useState("");
  let navigate = useNavigate();  
  
    function submit(){
        // console.log(`Submitted: ${name}, ${email}, ${pw}`);
        
        if (pw===""){
          setpwEmpty(true);
          setformatErrorMessage("Empty field(s)");
        } 
        else{setpwEmpty(false);} 
        if (email===""){
          setEmailEmpty(true);
          setformatErrorMessage("Empty field(s)");
        } 
        else{setEmailEmpty(false);} 
        if (name===""){
          setformatErrorMessage("Empty field(s)");
          setNameEmpty(true);
        } 
        else{setNameEmpty(false);} 
        if (name!==""&&email!==""&&pw!==""){
          fire.auth().createUserWithEmailAndPassword(email, pw)
              .then(() => {
                console.log("Authentication submitted!");
                setformatErrorMessage("");
                navigate(`/monthly`);
              })
              .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error: ", errorCode, ": ", errorMessage);
                setformatErrorMessage(removeFirstWord(errorMessage));
              }); 
        }
        

    }
  return (
    <ChakraProvider>
        
      <div className="SignUp">
      <img src={logo} alt='Arrow' className="SignUp-logo"/>
        <header className="SignUp-header">
                  
          <p className="SignUp-title">
            Sign Up
          </p>
          <Stack spacing={8} direction='column'>
            <Stack spacing={5} direction='column'>
              <FormControl isInvalid={nameEmpty}>
                    <FormLabel htmlFor='name' color='#6A877F'>Name</FormLabel>
                    <Input id='name' type='name' htmlSize={50} width='auto' bg='white' 
                      onChange = {(e) => setName(e.target.value)}
                      value={name}/>
                  </FormControl>
                  <FormControl isInvalid={emailEmpty}>
                    <FormLabel htmlFor='email' color='#6A877F'>Email</FormLabel>
                    <Input id='email' type='name' htmlSize={50} width='auto' bg='white' 
                      onChange = {(e) => setEmail(e.target.value)}
                      value={email}/>
                  </FormControl>
                <PasswordInput pw={pw} setPw={setPw} pwEmpty={pwEmpty} formatErrorMessage={formatErrorMessage}></PasswordInput>
                <Button color='white' bg='#6A877F' w='100px' type='submit' onClick={() => submit()}>sign up</Button>
            </Stack>
            <Button color='white' bg='#6A877F' w='100px' right='50px' >back</Button>
          </Stack>

        </header>
        
      </div>
    </ChakraProvider>
  );
}

function PasswordInput(props) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <FormControl isInvalid={props.pwEmpty}>
          <FormLabel htmlFor='pw' color='#6A877F'>Password</FormLabel>
            <Input id='pw' htmlSize={50} width='auto' bg='white' 
              type={show ? 'text' : 'password'}
              onChange = {(e) => props.setPw(e.target.value)}
              value={props.pw}/>
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
            <FormHelperText>Password must be at least 6 characters</FormHelperText>
            <FormHelperText color='#B35864' maxWidth={400}>{props.formatErrorMessage}</FormHelperText>
        </FormControl>
        
      </InputGroup>
    )
  }
  function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
  
    if (indexOfSpace === -1) {
      return '';
    }
  
    return str.substring(indexOfSpace + 1);
  }





export default SignUp;
