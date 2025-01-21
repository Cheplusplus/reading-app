import styles from "./page.module.css";

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
let paragraph =
  "It could not have been ten seconds, and yet it seemed a long time that their hands were clasped together.  He had time to learn every detail of her hand.  He explored the long fingers, the shapely nails, the work-hardened palm with its row of callouses, the smooth flesh under the wrist.  Merely from feeling it he would have known it by sight.  In the same instant it occurred to him that he did not know what colour the girl's eyes were.  They were probably brown, but people with dark hair sometimes had blue eyes.  To turn his head and look at her would have been inconceivable folly.  With hands locked together, invisible among the press of bodies, they stared steadily in front of them, and instead of the eyes of the girl, the eyes of the aged prisoner gazed mournfully at Winston out of nests of hair.";
let lines = splitParagraphIntoLines(paragraph, 100); // Max line length set to 50

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {lines.map((element) => (
          <p>{element}</p>
        ))}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
