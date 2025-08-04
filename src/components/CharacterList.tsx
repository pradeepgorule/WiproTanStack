import  { useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { Character, CharacterListProps } from '../types';

const fetchCharacters = async (page: number) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    return res.json();
};




export default function CharacterList() {
    const search = useSearch({ strict: false });
    const navigate = useNavigate();
    const page = Number(search.page) || 1;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['characters', page],
        queryFn: () => fetchCharacters(page),
        keepPreviousData: true,
    });

    useEffect(() => {
        localStorage.setItem('currentPage', String(page));
    }, [page]);

    const handlePageChange = (newPage: number) => {
        navigate({ to: '/', search: { page: newPage } });
    };

    const CharacterList = data as CharacterListProps;

    return (
        <div>
            <button
                onClick={() => refetch()}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Refresh
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        {CharacterList.results.map((char: Character) => (
                            <div
                                key={char.id}
                                onClick={() => navigate({ to: `/character/${char.id}` })}
                                className="border p-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <img src={char.image} alt={char.name} className="w-20 h-20" />
                                <div>{char.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            Prev
                        </button>
                        <span>Page {page}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!CharacterList.info.next}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}