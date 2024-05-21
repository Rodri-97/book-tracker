"use client";

import { BookStatus } from "@prisma/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function BooksByStatus({
  bookStatuses,
}: {
  bookStatuses: BookStatus[];
}) {
  const toRead = bookStatuses.filter((status) => status === "TO_READ").length;
  const currentlyReading = bookStatuses.filter(
    (status) => status === "CURRENTLY_READING"
  ).length;
  const didNotFinish = bookStatuses.filter(
    (status) => status === "DID_NOT_FINISH"
  ).length;
  const read = bookStatuses.filter((status) => status === "READ").length;

  const options = {};

  const data = {
    labels: ["To Read", "Currently Reading", "Did Not Finish", "Read"],
    datasets: [
      {
        label: "Books by Status",
        data: [toRead, currentlyReading, didNotFinish, read],
        backgroundColor: [
          "rgba(70, 130, 180, 0.8)",
          "rgba(60, 179, 113, 0.8)",
          "rgba(255, 165, 0, 0.8)",
          "rgba(138, 43, 226, 0.8)",
        ],
      },
    ],
  };
  return (
    <div>
      <Pie options={options} data={data} />
    </div>
  );
}
