import ReaderPageManager from "../components/ReaderPageManager/";

const challenge: Challenge = {
  id: "4",
  readingPiece:
    "Elias had spent most of his life surrounded by machines. As a child, he would take apart broken radios and try to rebuild them, sometimes even improving them in small ways. His fascination with how things worked eventually led him to study engineering. After graduating, he was hired by a robotics company that specialized in designing autonomous drones for rescue missions.\n\nOne day, the company received a request from a remote village located in a mountainous region recently hit by a landslide. The roads had been destroyed, and the area was completely cut off. The rescue teams needed help locating survivors buried under rubble, but helicopters couldn’t get close due to rough winds. That’s when Elias’s team was called in.\n\nElias and his colleagues worked tirelessly to reprogram their drones for rough terrain navigation. They added thermal sensors to detect body heat and reinforced the propellers to handle unpredictable air currents. It wasn’t easy—there were several failed test flights, and the pressure was intense. But time was critical.\n\nThree days later, Elias watched nervously as the first modified drone took off and disappeared over the trees. Within minutes, it began transmitting heat signatures and images. The team triangulated the data and guided emergency crews to the exact locations of trapped villagers. Thanks to the drones, several lives were saved.\n\nAfterward, Elias didn’t feel triumphant. He felt grateful—grateful that his childhood curiosity had grown into something that could make a real difference. For the first time, he saw his work not just as engineering, but as a lifeline.",
  questions: [
    "What early activity influenced Elias’s career choice?",
    "Why were drones needed for the rescue operation?",
    "What challenges did Elias’s team face when preparing the drones?",
    "How did the drones help in the rescue efforts?",
    "What emotion did Elias feel after the operation was over?",
  ],
  answers: [
    ["Flying model planes", "Helping with rescue missions", "Fixing and improving broken radios", "Reading about mountains"],
    ["The helicopters were too expensive", "The roads were blocked and helicopters couldn't access the area", "It was too far for rescue teams to travel", "The village refused help"],
    ["Building new drones from scratch", "Designing software from zero", "Calibrating the GPS system", "Adjusting drones for terrain and weather challenges"],
    ["They recorded video for news channels", "They delivered food to the villagers", "They located survivors using sensors and visuals", "They repaired roads with robotic arms"],
    ["Triumphant", "Proud and boastful", "Grateful and reflective", "Frustrated with the delays"],
  ],
  correctAnswers: [2, 1, 3, 2, 2],
};

const page = () => {
  return <></>;
};

export default page;
