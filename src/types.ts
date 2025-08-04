export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface InfoProps {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;

}

export interface CharacterListProps {
    info: InfoProps;
    results: Character[];
}