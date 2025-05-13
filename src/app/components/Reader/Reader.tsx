"use client";
import styles from "./reader.module.css";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Spinner from "../Spinner/spinner";
import { Progress } from "@/components/ui/progress";

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
  // paragraph = paragraph.replace(/[\r\n]+/g, "\r"); // Replace any newline characters
  const sentences = paragraph.split("."); // Split the paragraph into sentences
  const lines: string[] = [];
  // Loop through each sentence and add it to the current line if it fits
  sentences.forEach((sentence, index) => {
    if (sentence.length === 0) return;
    //Prevent the last '.' being added to the empty space of the paragraph
    if (index === sentences.length) return;
    // Check if adding the sentence exceeds the maximum line length
    if (sentence.length + 1 > maxLineLength) {
      // Split the sentence by the middle comma and push each part onto the lines array
      const [firstPart, secondPart] = splitAtMiddleComma(sentence);
      lines.push(firstPart);
      if (secondPart !== "") lines.push(secondPart); //If there are no commas make sure the second part is not empty
    } else {
      // Push the current line to the lines array if it doesn't end with ?
      lines.push(sentence.endsWith("?") ? sentence : sentence + ".");
    }
  });
  return lines;
}

type ReaderProps = {
  piece: string;
  setPage: Dispatch<SetStateAction<"reader" | "questions" | "results">>;
  wordsPerMinute: number;
  setWPM: Dispatch<SetStateAction<number>>;
  loading: boolean;
  fetchNewChallenge: (difficulty: "beginner" | "intermediate" | "expert") => Promise<void>;
};

export default function Reader({ piece, setPage, wordsPerMinute, setWPM, loading, fetchNewChallenge }: ReaderProps) {
  const state = useState<number>(0);
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  let lineNumber = state[0];
  const setLineNumber = state[1];
  const maxLineLength: number = 500; // For tuning: MIGHT NEED THIS LATER FOR ADJUSTING FOR SCREEN SIZES
  const lines: string[] = splitParagraphIntoLines(piece, maxLineLength);
  const [hideControls, setHideControls] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  /**
   * Set the duration and speed for the current line to scroll across the screen and reset the state for the next line.
   * @returns {Promise<string>} res
   */
  const readLine = (): Promise<string> => {
    const words = lines[lineNumber].trimStart().split(" ").length;
    let duration = (words / wordsPerMinute) * 60 * 1000;
    if (duration < 400) duration = 400;
    return new Promise<string>((res) => {
      setTimeout(() => {
        res("");
        console.log(duration);
      }, duration); // The duration the line should scroll for.
    });
  };

  /**
   * Start reading the next line after each line is completed.
   */
  const startReading = async () => {
    let currentLine = 0;
    while (currentLine < lines.length) {
      await readLine();
      setLineNumber((prev) => prev + 1);
      currentLine += 1;
      setProgress((currentLine / lines.length) * 100);
    }
    setPage("questions");
  };

  return (
    <div className={styles.center}>
      {loading ? (
        <div className={styles.loading_container}>
          <Spinner />
          <p className={styles.spinner}>Generating New Challenge...</p>
          <p>Please be patient</p>
        </div>
      ) : (
        <p className={styles.line}>{lines[lineNumber]}</p>
      )}
      <Progress value={progress} className={styles.progress_bar} />
      <div className={hideControls ? styles.hide : styles.controls}>
        {piece.length < 1 ? (
          <button disabled={loading} className={`${styles.btn} ${styles.control}`} onClick={() => fetchNewChallenge(difficulty)}>
            Generate
          </button>
        ) : (
          <button
            disabled={loading}
            className={`${styles.btn} ${styles.control}`}
            onClick={() => {
              setHideControls(true);
              startReading();
            }}
          >
            Start Reading
          </button>
        )}
        {piece.length > 1 ? (
          <label className={`${styles.labl} ${styles.control}`}>
            Reading Speed (WPM):
            <input
              className={styles.inpt}
              value={wordsPerMinute}
              onInput={(e) => {
                const value = Number.parseInt(e.currentTarget.value);
                if (Number.isNaN(value)) {
                  setWPM(0);
                  return;
                }
                setWPM(value);
              }}
            ></input>
          </label>
        ) : (
          <label className={`${styles.labl} ${styles.control}`}>
            Difficulty:
            <select
              className={styles.inpt2}
              onChange={(e) => {
                if (e.target.value === "beginner" || e.target.value === "intermediate" || e.target.value === "expert") setDifficulty(e.target.value);
              }}
            >
              <option value={"beginner"}>Beginner</option>
              <option value={"intermediate"}>Intermediate</option>
              <option value={"expert"}>Expert</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
