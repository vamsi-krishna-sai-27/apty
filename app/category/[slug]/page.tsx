import Link from "next/link";
import { categories } from "@/app/data/categories";

export default function Linkers(){
    return (
        <div>
            {categories.map((category)=>(
                <Link 
                    key={category.id}
                    href={`/category/${category.slug}`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    )
}