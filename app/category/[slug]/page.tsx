import { topics } from "@/app/data/topics";
import { notFound } from "next/navigation";
import Link from "next/link";
export default async function CategoryPage({params,}: {params: Promise<{ slug: string }>;}) 
{
  const { slug } = await params;

  const filteredTopics = topics.filter(
    (topic) => topic.categorySlug === slug
  );

 if (filteredTopics.length === 0) {
  notFound();
}
  return (
    <main className=" min-h-screen flex flex-col items-center py-20">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-4xl">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
              </div>
              <div className="flex justify-center flex-wrap gap-10 mt-10 px-10" >
                
                    {filteredTopics.map((topic) => (
                        <Link key={topic.id} href={`/topics/${topic.slug}`}>
                            <div  className="flex flex-col border p-4 hover:cursor-pointer hover:bg-zinc-800 hover:scale-105 transition-all">
                                    <div>{topic.name}</div>
                                    <div>{topic.questions} Questions</div>
                            </div>
                        </Link>
                    ))}   
                
              </div>
        </main>

  );
}