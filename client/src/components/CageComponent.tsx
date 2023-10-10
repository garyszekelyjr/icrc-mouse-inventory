import { useContext, Dispatch, SetStateAction } from 'react';
import { Pressable, Text } from 'native-base';

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>,
    setOwner: Dispatch<SetStateAction<string | undefined>>,
    setMice: Dispatch<SetStateAction<string | undefined>>,
    setProtocol: Dispatch<SetStateAction<string | undefined>>,
    HomeContext: any,
    cage: {
        id: string,
        owner: string,
        mice: string,
        protocol: string
    }
}

function Cage({ setOpen, setOwner, setMice, setProtocol, HomeContext, cage }: Props): JSX.Element {
    const context = useContext(HomeContext) as {
        id: string,
        owner: string,
        mice: string,
        protocol: string
    };

    return (
        <Pressable
            width={`${90 / 7}%`}
            height={`${90 / 10}%`}
            justifyContent='space-evenly'
            alignItems='center'
            padding={15}
            borderWidth={1}
            margin={1}
            backgroundColor={cage.mice && parseInt(cage.mice) > 0 ? '#FFCCCB' : '#90EE90'}
            onPress={() => {
                context['id'] = cage.id
                context['owner'] = cage.owner;
                context['mice'] = cage.mice;
                context['protocol'] = cage.protocol;

                setOwner(cage.owner);
                setMice(cage.mice.toString());
                setProtocol(cage.protocol);

                setOpen(true);
            }}>
            <Text>{cage.owner}</Text>
            <Text>{cage.mice}</Text>
        </Pressable>
    )
}

export default Cage;