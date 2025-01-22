"use client";
import styles from "./page.module.css";
import { useState } from "react";

function splitAtMiddleComma(str: string) {
  // Find all the commas in the string
  const commaIndexes = [...str.matchAll(/,/g)].map((match) => match.index);

  // If there are no commas or just one comma, return the string as-is
  if (commaIndexes.length === 0) return [str, ""];
  if (commaIndexes.length === 1) return [str + ".", ""];

  // Find the index of the middle comma
  const middleCommaIndex = commaIndexes[Math.floor(commaIndexes.length / 2)];

  // Split the string at the middle comma
  const beforeComma = str.slice(0, middleCommaIndex + 1);
  const afterComma = str.slice(middleCommaIndex + 1);

  return [beforeComma, afterComma + "."];
}

function splitParagraphIntoLines(paragraph: string, maxLineLength = 200) {
  // Replace any newline characters
  paragraph = paragraph.replace(/[\r\n]+/g, "");
  let sentences = paragraph.split("."); // Split the paragraph into sentences
  let lines: string[] = [];
  // Loop through each sentence and add it to the current line if it fits
  sentences.forEach((sentence, index) => {
    //This prevents the last '.' being added to the empty space of the paragraph
    if (index === sentences.length - 1) {
      return;
    }
    // Check if adding the sentence exceeds the maximum line length
    if (sentence.length + 1 > maxLineLength) {
      // Split the sentence by the middle comma and push each part onto the lines array
      let [firstPart, secondPart] = splitAtMiddleComma(sentence);
      lines.push(firstPart);
      if (secondPart !== "") lines.push(secondPart);
    } else {
      // Push the current line to the lines array
      lines.push(sentence + ".");
    }
  });

  return lines;
}

// Example usage:
let paragraph = `Soon we were hemmed in with trees, which in places arched right over the roadway till we passed as through a tunnel; and again great frowning rocks guarded us boldly on either side.  Though we were in shelter, we could hear the rising wind, for it moaned and whistled through the rocks, and the branches of the trees crashed together as we swept along.  It grew colder and colder still, and fine, powdery snow began to fall, so that soon we and all around us were covered with a white blanket.  The keen wind still carried the howling of the dogs, though this grew fainter as we went on our way.  The baying of the wolves sounded nearer and nearer, as though they were closing round on us from every side.  I grew dreadfully afraid, and the horses shared my fear.  The driver, however, was not in the least disturbed; he kept turning his head to left and right, but I could not see anything through the darkness.`;
let lines = splitParagraphIntoLines(paragraph, 100); // Max line length set to 50

export default function Home() {
  let [position, setPosition] = useState(50);
  let [wordsPerMinute, setWPM] = useState(500);
  let [lineNumber, setLineNumber] = useState(0);

  let nextLine = () => {
    console.log(lineNumber);
    const int = setInterval(() => setPosition((current) => current - wordsPerMinute / 2000), 1);
    let len = lines[lineNumber].length;
    let res = new Promise((res) =>
      setTimeout(() => {
        clearInterval(int);
        setLineNumber((current) => current + 1);
        setPosition(50);
        res("");
      }, (len / wordsPerMinute) * 60 * 180)
    );
    return res;
  };

  let readLines = async () => {
    while (lineNumber < lines.length - 1) {
      let t = nextLine();

      await t;
      lineNumber++;
      console.log(t);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* {lines.map((element, index) => (
          <p key={index} style={{ marginLeft: `${position}px` }}>
            {element}
          </p>
        ))} */}

        <p className={styles.line} style={{ left: `${position}%` }}>
          {lines[lineNumber]}
        </p>

        <button onClick={() => readLines()}>Test</button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
