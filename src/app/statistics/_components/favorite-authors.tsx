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

  const indexAxis: "x" | "y" | undefined = "y";

  const options = {
    indexAxis,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          precision: 0,
          autoSkip: false,
        },
      },
    },
  };

  const data = {
    labels: [...mostFrequentAuthors.map((el) => el[0])],
    datasets: [
      {
        label: "Books read from this author",
        data: [...mostFrequentAuthors.map((el) => el[1])],
        backgroundColor: ["rgba(0, 128, 128, 0.8)"],
      },
    ],
  };

  return (
    <div className="h-[350px] lg:h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
