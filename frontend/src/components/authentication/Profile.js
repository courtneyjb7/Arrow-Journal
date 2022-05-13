import './SignUp.css';
import { ChakraProvider } from '@chakra-ui/react';
import {Button, Stack, Heading, Text} from '@chakra-ui/react';
import React from 'react';
import logo from '../../Arrow.png';


function Profile(props) {
    var first = props.name.split(" ")[0];
  return (
    <ChakraProvider >
        
      <div className="SignUp">
      <img src={logo} alt='Arrow' className="SignUp-logo"/>
        <header className="SignUp-header">
                  
          <p className="SignUp-title">
            Hi, {first}!
          </p>
          <Stack spacing={8} >
                        <Heading color='#6A877F' fontSize='xl'>Name</Heading>
                        <Text mt={4}>{props.name}</Text>
                        <Heading color='#6A877F' fontSize='xl'>Email</Heading>
                        <Text mt={4}>{props.email}</Text>
                        <br/>
                <Button color='white'  w='100px' bg='#6A877F' left='70px'>edit</Button>    
            <Button color='white' bg='#6A877F' w='100px' right='50px' >back</Button>
          </Stack>
        </header>
        
      </div>
    </ChakraProvider>
  );
}





export default Profile;
