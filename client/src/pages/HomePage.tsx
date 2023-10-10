import { useState, useContext, useEffect } from 'react';
import { Button, Column, Flex, FormControl, Input, Modal, Select } from 'native-base';

import Cage from '../components/CageComponent';

import HomeContext from '../contexts/HomeContext';

function Home(): JSX.Element {
    const [cages, setCages] = useState([]);

    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [owner, setOwner] = useState<string | undefined>();
    const [mice, setMice] = useState<string | undefined>()
    const [protocol, setProtocol] = useState<string | undefined>();

    const context = useContext(HomeContext) as {
        id: string,
        owner: string,
        mice: string,
        protocol: string
    };;

    useEffect(() => {
        (async () => {
            const response = await fetch('https://script.google.com/macros/s/AKfycbz-mz4J88tv47D9Yv9GkDnCNG_XrRv9CQmEwasgfmg4BL3rpsoq9WC79aU1DreQxRlW/exec?' + new URLSearchParams({ sheet: 'Cage' }));
            setCages(await response.json());
        })();
    }, [setCages]);

    return (
        <>
            <Flex flex={1} direction='row' wrap='wrap' justify='center' alignContent='center' padding={15}>
                {cages.map((cage) => (
                    <Cage
                        key={cage['id']}
                        setOpen={setOpen}
                        setOwner={setOwner}
                        setMice={setMice}
                        setProtocol={setProtocol}
                        HomeContext={HomeContext}
                        cage={cage as { id: string, owner: string, mice: string, protocol: string }}
                    />
                ))}
            </Flex>
            <Modal isOpen={open} onClose={() => {
                setOpen(false);
                setDisabled(true);
            }}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>{`Cage ${context['id']}`}</Modal.Header>
                    <Modal.Body>
                        <Column space={3}>
                            {disabled ? <Button onPress={() => { setDisabled(false); }}>Edit</Button> : (
                                <Button onPress={() => {
                                    setDisabled(true);
                                    setOwner(context['owner']);
                                    setMice(context['mice']);
                                    setProtocol(context['protocol']);
                                }} colorScheme='danger' variant='subtle'>Cancel</Button>
                            )}
                            <FormControl>
                                <FormControl.Label>Owner</FormControl.Label>
                                <Select selectedValue={owner} onValueChange={(owner) => { setOwner(owner); }} isDisabled={disabled}>
                                    <Select.Item value='Paige' label='Paige' />
                                    <Select.Item value='Isaac' label='Isaac' />
                                    <Select.Item value='Bria' label='Bria' />
                                    <Select.Item value='Joanna' label='Joanna' />
                                    <Select.Item value='Josh' label='Josh' />
                                    <Select.Item value='Alex' label='Alex' />
                                    <Select.Item value='Eric' label='Eric' />
                                </Select>
                            </FormControl>
                            <FormControl isDisabled={disabled}>
                                <FormControl.Label># of Mice</FormControl.Label>
                                <Input value={mice} onChangeText={setMice} isReadOnly={disabled} />
                            </FormControl>
                            <FormControl isDisabled={disabled}>
                                <FormControl.Label>Protocol</FormControl.Label>
                                <Input value={protocol} onChangeText={setProtocol} isReadOnly={disabled} />
                            </FormControl>
                        </Column>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex={1} onPress={async () => {
                            setDisabled(true);
                            await fetch('https://script.google.com/macros/s/AKfycbz-mz4J88tv47D9Yv9GkDnCNG_XrRv9CQmEwasgfmg4BL3rpsoq9WC79aU1DreQxRlW/exec', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: context['id'],
                                    owner: owner,
                                    mice: parseInt(mice),
                                    protocol: protocol
                                })
                            });
                            const response = await fetch('https://script.google.com/macros/s/AKfycbz-mz4J88tv47D9Yv9GkDnCNG_XrRv9CQmEwasgfmg4BL3rpsoq9WC79aU1DreQxRlW/exec?' + new URLSearchParams({ sheet: 'Cage' }));
                            setCages(await response.json());
                            setOpen(false);
                        }} variant={disabled ? 'outline' : 'solid'} disabled={disabled}>Save</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal >
        </>
    )
}

export default Home;