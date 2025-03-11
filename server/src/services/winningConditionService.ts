export function checkIfPlayerWon(
  playerId: string,
  latestMove: number,
  matrix: string[]
): string[] {
  const winnings: string[] = [];

  const vertical = checkVertical(playerId, latestMove, matrix);
  if (vertical) winnings.push(vertical);

  const horizontal = checkHorizontal(playerId, latestMove, matrix);
  if (horizontal) winnings.push(horizontal);

  const forwardSlash = checkSlash(playerId, latestMove, matrix, true);
  if (forwardSlash) winnings.push(forwardSlash);

  const backSlash = checkSlash(playerId, latestMove, matrix, false);
  if (backSlash) winnings.push(backSlash);

  return winnings;
}

function checkVertical(
  playerId: string,
  latestMove: number,
  matrix: string[]
): string | null {
  let numbers = "";

  // Get the starting index
  let index = latestMove % 3;

  for (let i = index; i < matrix.length; i += 3) {
    if (matrix[i] !== playerId) {
      return null;
    }

    numbers += i;
  }

  return numbers;
}

function checkHorizontal(
  playerId: string,
  latestMove: number,
  matrix: string[]
): string | null {
  let numbers = "";

  const column = Math.floor(latestMove / 3);

  // Get the starting index
  let index = latestMove;
  while (index - 1 >= column * 3) {
    index -= 1;
  }

  for (let i = index; i < (column + 1) * 3; i++) {
    if (matrix[i] !== playerId) {
      return null;
    }

    numbers += i;
  }

  return numbers;
}

function checkSlash(
  playerId: string,
  latestMove: number,
  matrix: string[],
  isForward: boolean
): string | null {
  const acceptable = isForward ? [2, 4, 6] : [0, 4, 8];

  if (!acceptable.includes(latestMove)) return null;

  let numbers = "";

  for (let i = 0; i < acceptable.length; i++) {
    const index = acceptable[i];
    if (matrix[index] !== playerId) {
      return null;
    }

    numbers += index;
  }

  return numbers;
}
