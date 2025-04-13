export const getUserAverages = (user: User) => {
  if (!user.stats) return { userSpeeds: [], userScores: [] };
  const userSpeeds = user.stats
    .reduce((acc: number[], current) => {
      if (!acc.includes(current.speed)) {
        acc.push(current.speed);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);

  const userScores = userSpeeds.reduce((acc: number[], speed) => {
    const filteredStats = user.stats.filter((stat) => stat.speed === speed);
    const avg = filteredStats.reduce((acc: number, stat) => acc + stat.score, 0) / filteredStats.length;
    acc.push(avg);
    return acc;
  }, []);

  return { userSpeeds, userScores };
};
