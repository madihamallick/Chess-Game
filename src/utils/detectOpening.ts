import openings from '../data/openings.json';

type Opening = {
  eco: string;
  name: string;
  moves: string;
};

export function detectOpening(moves: string[]): string {
  for (const opening of openings as Opening[]) {
    const openingMoves = opening.moves.split(' ');
    const isMatch = openingMoves.every((move, index) => move === moves[index]);

    if (isMatch) {
      return opening.name;
    }
  }

  return 'No Opening';
}
