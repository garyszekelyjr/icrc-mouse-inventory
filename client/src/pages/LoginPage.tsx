import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Column, Input, Text } from 'native-base';

interface Props {
    setAuthenticated: Dispatch<SetStateAction<boolean>>
}

function Login({ setAuthenticated }: Props): JSX.Element {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            const response = await fetch('https://script.google.com/macros/s/AKfycbz-mz4J88tv47D9Yv9GkDnCNG_XrRv9CQmEwasgfmg4BL3rpsoq9WC79aU1DreQxRlW/exec?' + new URLSearchParams({ sheet: 'User' }));
            setUsers(await response.json());
        })();
    }, [setUsers]);

    return (
        <Column space={3} flex={0.5} justifyContent='center' padding={15}>
            <Input value={username} onChangeText={setUsername} placeholder='Username' />
            <Input type='password' value={password} onChangeText={setPassword} placeholder='Password' />
            <Button onPress={() => {
                const user = users.find((user) => user['username'] === username);
                if (user) {
                    if (user['password'] === password) {
                        setAuthenticated(true);
                        return;
                    }
                }
                setUsername('')
                setPassword('');
            }}>Log In</Button>
        </Column>
    );
}

export default Login;