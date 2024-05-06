import DOMPurify from "isomorphic-dompurify";

export default function BookDetails() {
  const img = "/covers/nicomachean-ethics.jpeg";
  const title = "Nicomachean Ethics";
  const author = "Aristotle";
  const description =
    "<b>\"One swallow does not make a summer; neither does one day. Similarly neither can one day, or a brief space of time, make a man blessed and happy\" </b><br><br>Previously published as <i>Ethics</i>, Aristotle's <i>The Nicomachean Ethics</i> addresses the question of how to live well and originates the concept of cultivating a virtuous character as the basis of his ethical system. Here Aristotle sets out to examine the nature of happiness, and argues that happiness consists in 'activity of the soul in accordance with virtue', including moral virtues, such as courage, generosity and justice, and intellectual virtues, such as knowledge, wisdom and insight. The <i>Ethics</i> also discusses the nature of practical reasoning, the value and the objects of pleasure, the different forms of friendship, and the relationship between individual virtue, society and the State. Aristotle's work has had a profound and lasting influence on all subsequent Western thought about ethical matters. <br><br>This Penguin Classics edition is translated from the Greek by J.A.K. Thomson with revisions and notes by Hugh Tredennick, and an introduction and bibliography by Jonathan Barnes. <br><br>For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.";

  return (
    <div>
      <article className="bg-white rounded-lg p-6 flex flex-col justify-center items-center gap-12">
        <section className="flex flex-row justify-center items-center gap-6">
          <img src={img} className="w-60 h-72 rounded-lg" />
          <div>
            <h1 className="font-bold text-2xl">{title}</h1>
            <h2 className="text-xl text-slate-700">{author}</h2>
          </div>
        </section>
        <hr className="h-[2px] w-full bg-slate-300" />
        <section
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </article>
    </div>
  );
}
