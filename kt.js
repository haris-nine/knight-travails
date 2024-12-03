class KnightPathFinder {
  constructor() {
    this.movementOffsets = [
      [1, 2], [2, 1], [2, -1], [1, -2],
      [-1, -2], [-2, -1], [-2, 1], [-1, 2]
    ];
  }

  isValidPosition(pos) {
    const [x, y] = pos;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  getPossibleMoves(pos) {
    return this.movementOffsets
      .map(([dx, dy]) => [pos[0] + dx, pos[1] + dy])
      .filter(this.isValidPosition);
  }

  findShortestPath(start, end) {
    const queue = [[start]];
    const visited = new Set([start.toString()]);

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const currentPos = currentPath[currentPath.length - 1];

      if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
        return currentPath;
      }

      for (const nextMove of this.getPossibleMoves(currentPos)) {
        if (!visited.has(nextMove.toString())) {
          visited.add(nextMove.toString());
          queue.push([...currentPath, nextMove]);
        }
      }
    }

    return null;
  }

  knightMoves(start, end) {
    const path = this.findShortestPath(start, end);
    
    if (!path) {
      console.log(`No path found from ${start} to ${end}`);
      return;
    }

    console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach((pos, index) => {
      console.log(`  ${index}: ${pos}`);
    });

    return path;
  }
}

const finder = new KnightPathFinder();
finder.knightMoves([0, 0], [3, 3]);
finder.knightMoves([3, 3], [7, 7]);
finder.knightMoves([7,7], [0, 0]);