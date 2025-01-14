# Flappy Bird Game

A simple and fun game inspired by the classic Flappy Bird. Help the bird navigate through the pipes and earn points!

## How to Play

- Click anywhere on the screen or press the `Space` or `Enter` key to make the bird jump.
- Try to avoid hitting the pipes. The game ends if the bird collides with a pipe or falls out of the screen.
- Earn points by passing through the pipes!

## Game Logic

The bird constantly falls due to gravity, and when the player clicks or presses a key, the bird jumps. The pipes move towards the bird and must be avoided by the player. Each time the bird successfully passes a pipe, the score increases.

The game has the following components:

- **Bird**: The player-controlled bird that jumps.
- **Pipes**: Randomized pipes that move from right to left.
- **Score**: The player earns points by passing through pipes.
- **Game Over Modal**: The game ends when a collision occurs, and the player is given an option to restart.

## Technologies Used

- React
- TypeScript
- Next.js (for SSR support)
- HTML5 Canvas (for custom rendering)
- CSS (for basic styling)
- Image assets (bird and background)

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Open a pull request.

