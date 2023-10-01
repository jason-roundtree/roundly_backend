async function generatePlayerRounds(rounds, players) {
  const pr = rounds.map((round) => {
    return players.map((player) => {
      return {
        player_id: player.id,
        round_id: round.id,
      };
    });
  });
  return pr;
}

module.exports = generatePlayerRounds;
