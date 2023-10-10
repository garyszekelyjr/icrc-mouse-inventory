import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import Home from './pages/HomePage';
import Login from './pages/LoginPage';

import Navbar from './components/NavbarComponent';

function App(): JSX.Element {
    const [authenticated, setAuthenticated] = useState<boolean>(true);

    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
                {authenticated ? <Home /> : <Login setAuthenticated={setAuthenticated} />}
            </SafeAreaView>
        </NativeBaseProvider>
    );
}

export default App;
