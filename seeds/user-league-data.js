async function generateUserLeagues(users, leagueId) {
  return users.map((user) => {
    return {
      userId: user.id,
      leagueId: leagueId,
    };
  });
}

module.exports = generateUserLeagues;
