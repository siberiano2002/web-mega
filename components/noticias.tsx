// components/Noticias.tsx
import Image from "next/image";
import Link from "next/link";

// Define la estructura de tus noticias
interface Noticia {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  mainImage: string;
}

interface Props {
  noticias: Noticia[];
}

export default function Noticias({ noticias }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Noticias</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia) => (
          <div
            key={noticia._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <Link href={`/noticias/${noticia.slug}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={noticia.mainImage}
                  alt={noticia.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">{noticia.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(noticia.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{noticia.excerpt}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}