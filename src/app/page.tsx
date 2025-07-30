import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Bienvenido 👋 <br />
        Elegí un juego para empezar
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        <GameCard
          title="Panal de letras"
          description="Formá la mayor cantidad de palabras posibles usando las letras dadas."
          href="/games/spelling-bee"
          emoji="🐝"
          color="bg-yellow-200"
        />

        <GameCard
          title="Wordle"
          description="Adiviná la palabra del día en 6 intentos o menos."
          href="/games/wordle"
          emoji="🟩"
          color="bg-green-200"
        />
      </div>
    </main>
  );
}

type GameCardProps = {
  title: string;
  description: string;
  href: string;
  emoji: string;
  color?: string;
};

const GameCard = ({
  title,
  description,
  href,
  emoji,
  color = "bg-white",
}: GameCardProps) => {
  return (
    <Link
      href={href}
      className={`rounded-2xl shadow-lg p-6 hover:scale-105 transform transition-all duration-300 ${color} text-gray-800 flex flex-col justify-between`}
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};
