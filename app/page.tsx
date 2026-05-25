import {categories} from './data/categories'
import Link from "next/link";
export default function Home() {

  return (
    <main className=" min-h-screen flex flex-col items-center py-20">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl">AptiTrack</h1>
            <p className="text-sm text-center font-light max-w-200">Practice aptitude and reasoning questions, track your progress, and prepare smarter.</p>
          </div>
          <div className="flex justify-center flex-wrap gap-10 mt-10 px-10" >
            {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                    >
                      <div className="flex flex-col border p-4 hover:cursor-pointer hover:bg-zinc-800 hover:scale-105 transition-all" >
                          <div>{category.name}</div>
                          <div>{category.questions} Questions</div>
                          <div>{category.topics} Topics </div>
                      </div>
                    </Link>
              ))}
              
          </div>
    </main>
  );
}
