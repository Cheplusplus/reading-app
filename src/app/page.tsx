import Link from "next/link";
import styles from "./page.module.css";
import Background from "./components/Background/Background";

const page = async () => {
  return (
    <>
      <Background />
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.banner}>
          <h1 className={styles.title}>Engaging Reading Practice</h1>
          <p className={styles.subtitle}>Enhance your reading comprehension with AI-generated stories and questions!</p>
        </header>

        {/* Start Reading Button */}
        <div className={styles.start_btn_div}>
          <Link href={"./reading-app"}>
            <button className={styles.start_btn}>Start Reading</button>
          </Link>
        </div>
        {/* About This App Section */}
        <section className={styles.section}>
          <h2>About This App</h2>
          <p>
            Welcome to our AI-based Reading App! This application generates a unique story and set of questions each time you use it. You get to set your preferred reading speed, and the story is delivered to you in a window at that pace. Once the
            story is complete, you’ll be asked comprehension questions to test how well you understood what you read.
          </p>
          <p>
            My name is Ché, and I’m a software developer instructor. Over the years, I’ve noticed many of my students struggle with reading comprehension. I created this app as a tool to help them—and anyone else—improve their reading skills and
            comprehension.
          </p>
          <p>Please keep in mind that this app is still a work in progress. It’s also a centerpiece on my CV and a tool I’m showcasing in my job hunt. Thank you for checking it out!</p>
        </section>

        {/* Ways It Can Help You Improve Section */}
        <section className={`${styles.section} ${styles.lightSection}`}>
          <h2>Ways It Can Help You Improve</h2>
          <ul>
            <li>
              <strong>Personalized Reading Speed:</strong> Set your own pace and train yourself to gradually increase reading rate without losing comprehension.
            </li>
            <li>
              <strong>Real-Time Story Display:</strong> Focus on the text as it appears, preventing you from skipping ahead or reading passively.
            </li>
            <li>
              <strong>Comprehension Questions:</strong> Immediately test how well you understood the story with AI-generated questions.
            </li>
            <li>
              <strong>Progress Tracking:</strong> Measure your progress over time and see your improvements.
            </li>
          </ul>
        </section>

        {/* Reading Comprehension Information Section */}
        <section className={styles.section}>
          <h2>Reading Comprehension</h2>
          <p>
            Reading comprehension involves not just understanding the words on the page, but also interpreting context, identifying main ideas, and synthesizing information to form a coherent understanding of the text. In academic, professional, and
            personal contexts, strong reading comprehension skills are invaluable for success.
          </p>
          <p>By training with well-timed reading sessions and targeted questions, you can boost your ability to focus and absorb information more effectively.</p>
        </section>
      </div>
    </>
  );
};

export default page;
