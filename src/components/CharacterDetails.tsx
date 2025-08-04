import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { Character } from '../types';

const fetchCharacter = async (id: string) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return res.json();
};

export default function CharacterDetail() {
    const { id } = useParams({ from: '/character/$id' });
    const { data, isLoading } = useQuery<Character>({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id),
    });


    const CharacterList = data as Character;

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4 border rounded">
            <img src={CharacterList.image} alt={CharacterList.name} className="w-40 h-40" />
            <h2 className="text-xl font-bold">{CharacterList.name}</h2>
            <p>Status: {CharacterList.status}</p>
            <p>Species: {CharacterList.species}</p>
            <p>Gender: {CharacterList.gender}</p>
        </div>
    );
}
