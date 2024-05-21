"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { findMostFrequentElements } from "@/lib/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FavoriteAuthors({ authors }: { authors: string[] }) {
  if (authors.length === 0) {
    return <div>You have not added any read book yet.</div>;
  }

  const mostFrequentAuthors = findMostFrequentElements(authors, 5);

  const options = {};

  const data = {
    labels: [...mostFrequentAuthors.map((el) => el[0])],
    datasets: [
      {
        label: "Books read from this author",
        data: [...mostFrequentAuthors.map((el) => el[1])],
        backgroundColor: ["rgba(132, 99, 255, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
