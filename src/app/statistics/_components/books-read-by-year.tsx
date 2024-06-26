"use client";

import { Book } from "@prisma/client";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BooksReadByYear({
  books,
  year,
}: {
  books: Book[];
  year: number;
}) {
  const booksRead = books.filter((book) => {
    const yearRead = book.dateRead?.getFullYear();
    return book.status === "READ" && yearRead === year;
  });

  const booksReadByMonth = {
    January: booksRead.filter((book) => book.dateRead?.getMonth() === 0).length,
    February: booksRead.filter((book) => book.dateRead?.getMonth() === 1)
      .length,
    March: booksRead.filter((book) => book.dateRead?.getMonth() === 2).length,
    April: booksRead.filter((book) => book.dateRead?.getMonth() === 3).length,
    May: booksRead.filter((book) => book.dateRead?.getMonth() === 4).length,
    June: booksRead.filter((book) => book.dateRead?.getMonth() === 5).length,
    July: booksRead.filter((book) => book.dateRead?.getMonth() === 6).length,
    August: booksRead.filter((book) => book.dateRead?.getMonth() === 7).length,
    September: booksRead.filter((book) => book.dateRead?.getMonth() === 8)
      .length,
    October: booksRead.filter((book) => book.dateRead?.getMonth() === 9).length,
    November: booksRead.filter((book) => book.dateRead?.getMonth() === 10)
      .length,
    December: booksRead.filter((book) => book.dateRead?.getMonth() === 11)
      .length,
  };

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
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Books read that month",
        data: [...Object.values(booksReadByMonth)],
        backgroundColor: ["rgba(255, 127, 80, 0.8)"],
      },
    ],
  };

  return (
    <div className="h-[400px] lg:h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
