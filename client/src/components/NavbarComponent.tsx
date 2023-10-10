import { Dispatch, SetStateAction } from 'react';
import { Button, Flex, Text } from 'native-base';

interface Props {
    authenticated: boolean,
    setAuthenticated: Dispatch<SetStateAction<boolean>>
}

function Navbar({ authenticated, setAuthenticated }: Props): JSX.Element {
    return (
        <Flex direction='row' justify={authenticated ? 'space-between': 'center'} align='center' padding={15}>
            <Text fontSize='xl' fontWeight='bold'>ICRC MOUSE INVENTORY</Text>
            {authenticated ? (<Button onPress={() => { setAuthenticated(false); }} colorScheme='danger'>Log Out</Button>) : <></>}
        </Flex>
    )
}

export default Navbar;