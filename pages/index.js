import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import main from "./../ai/main";
import readXlsxFile from "read-excel-file";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [lastSchedule, setLastSchedule] = useState(null);
  const weekDays = ["saturday", "sunday", "monday", "tuesday", "wednesday"];
  useEffect(() => {
    if (lastSchedule !== null) {
      console.log(
        "🚀 ~ file: index.js ~ line 11 ~ Home ~ lastSchedule",
        lastSchedule
      );
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Weekly Schedule</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {lastSchedule === null ? (
        <main className={styles.main}>
          <h1 className={styles.title}>Weekly Schedule</h1>
          <p className={styles.description}>
            Download Source
            <a href="/ai991.zip">zip file</a>
            <a href="/ai991.tar.xz">tar.xz file</a>
          </p>
          <p className={styles.description}>
            Download sample SEMESTERS excel file from{" "}
            <a href="/sample.xlsx">HERE!</a>
          </p>
          <p className={styles.description}>
            Download sample CURRICULUM excel file from{" "}
            <a href="/sample2.xlsx">HERE!</a>
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>IMPORT THE SCHEDULE FOR ALL SEMESTERS. </h3>
              <p>note: download sample file and reformat your file... </p>
              <input
                onChange={(e) => {
                  let semester = "";
                  readXlsxFile(e.target.files[0]).then((rows) => {
                    rows.map((m, i) => {
                      if (m[1] === null && m[2] === null) {
                        semester = m[0];
                      }
                      if (i > 1) {
                        if (m[2] !== null || m[1] !== null) {
                          setFile((file) => [
                            ...file,
                            {
                              lesson: m[0],
                              prof: m[1],
                              unit: m[2],
                              semester: semester,
                            },
                          ]);
                        }
                      }
                    });
                  });
                  setLoading(false);
                }}
                id="input"
                type="file"
              />
            </div>
            <div className={styles.card}>
              <h3>IMPORT THE CURRICULUM.</h3>
              <p>note: download sample file and reformat your file... </p>
              <input
                onChange={(e) => {
                  readXlsxFile(e.target.files[0]).then((rows) => {
                    let day = "";
                    let lesson = "";
                    rows.map((a, i) => {
                      if (i > 0) {
                        a.map((b, j) => {
                          if (j < 1) {
                            day = b;
                          }
                          if (j > 0) {
                            if (j % 2 !== 0) {
                              lesson = b;
                            } else {
                              setSchedule((schedule) => [
                                ...schedule,
                                {
                                  lesson: lesson,
                                  day: day,
                                  prof: b === null ? b : b.split(",")[0],
                                  unit: b === null ? b : b.split(",")[1],
                                  semester: "null",
                                },
                              ]);
                              lesson = "";
                            }
                          }
                        });
                      }
                    });
                  });
                  setLoading(false);
                }}
                type="file"
              />
            </div>
            {loading ? (
              <>
                <div className={styles.card}>
                  <h3>Select File</h3>
                  <p>Select file to run program</p>
                </div>
              </>
            ) : (
              <Link href="/#" scroll={false}>
                <a
                  onClick={() => {
                    setLastSchedule(main(file, schedule));
                  }}
                  className={styles.card}
                >
                  <h3>Run algorithm</h3>
                  <p>
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </a>
              </Link>
            )}
          </div>
        </main>
      ) : (
        <>
          <table
            border="5"
            cellSpacing="0"
            align="center"
            style={{ border: "5px" }}
            dir="rtl"
          >
            <thead>
              <tr>
                <td>
                  <b>ساعت/روز</b>
                </td>
                {weekDays.map((day, i) => {
                  if (day === "saturday") {
                    return <th key={day + i}>شنبه</th>;
                  } else if (day === "sunday") {
                    return <th key={day + i}>یکشنبه</th>;
                  } else if (day === "monday") {
                    return <th key={day + i}>دوشنبه</th>;
                  } else if (day === "tuesday") {
                    return <th key={day + i}>سه‌شنبه</th>;
                  } else if (day === "wednesday") {
                    return <th key={day + i}>چهارشنبه</th>;
                  }
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>8-9:30</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["8-9:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["8-9:30"].replaceAll(" / ", "<br />")
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["8-9:30"].replaceAll(" / ", "<br />")
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["8-9:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["8-9:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>9:30-11</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["9:30-11"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["9:30-11"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["9:30-11"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["9:30-11"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["9:30-11"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>11-12:30</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["11-12:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["11-12:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["11-12:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["11-12:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["11-12:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>12:30-14</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["12:30-14"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["12:30-14"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["12:30-14"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["12:30-14"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["12:30-14"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>14-15:30</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["14-15:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["14-15:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["14-15:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["14-15:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["14-15:30"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td>15:30-17</td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["saturday"]["15:30-17"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["sunday"]["15:30-17"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["monday"]["15:30-17"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["tuesday"]["15:30-17"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
                <td>
                  {ReactHtmlParser(
                    lastSchedule["wednesday"]["15:30-17"].replaceAll(
                      " / ",
                      "<br />"
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <footer style={{marginTop: "100px"}} className={styles.footer}>
        <p>Alireza Souran / Peyman Khalili</p>
      </footer>
    </div>
  );
}
