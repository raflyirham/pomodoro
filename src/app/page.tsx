"use client";

import { useEffect, useState } from "react";

const format = require("format-duration");

export default function Home() {
  const [time, setTime] = useState<number>(1 * 60 * 25000);
  const [ongoing, setOnGoing] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>(null);
  const [status, setStatus] = useState<string>("Focus");

  function handleTimer() {
    if (ongoing) {
      setOnGoing(false);
    } else {
      setOnGoing(true);
    }
  }

  function handleReset() {
    setTime(1 * 60 * 25000);
    setOnGoing(false);
  }

  useEffect(() => {
    if (!ongoing) {
      clearInterval(timer);
    }
  });

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer);
      setOnGoing(false);

      if (status === "Focus") {
        setStatus("Break");
        setTime(1 * 60 * 5000);
      } else {
        setStatus("Focus");
        setTime(1 * 60 * 25000);
      }
    }
  }, [time, timer, status]);

  useEffect(() => {
    if (time >= 1000 && ongoing) {
      const t = setTimeout(() => {
        setTime((prev) => prev - 1000);
      }, 1000);

      setTimer(t);
    }
  }, [time, ongoing]);

  useEffect(() => {
    document.title = format(time) + " | " + status + " | POMODORO";
  });

  return (
    <main className="flex flex-col justify-center items-center min-h-screen min-w-full bg-[#16161a]">
      <div className="flex flex-col justify-between items-center bg-[#242629] rounded h-[50vh] min-w-[50vw] max-md:w-[80%]">
        <div className="flex flex-col justify-center h-[80%] w-[100%] px-5 py-6">
          <h1 className="font-semibold text-2xl text-[#fffffe] text-center uppercase">
            {status}
          </h1>
          <p className="font-bold text-[#fffffe] text-7xl mt-8 text-center">
            {format(time)}
          </p>
        </div>

        <div className="w-[100%]">
          <button
            className="bg-[#7f5af0] w-[100%] px-2 py-2 text-[#fffffe] font-bold hover:bg-[#8567e0] active:bg-[#5d38cb] duration-500"
            onClick={handleTimer}
          >
            {ongoing ? "PAUSE" : "START"}
          </button>
          <button
            className="bg-red-800 w-[100%] px-2 py-2 text-[#fffffe] font-bold hover:bg-red-600 active:bg-red-900 duration-500"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </main>
  );
}
