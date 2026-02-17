import css from "./page.module.css"
import {Metadata} from "next";

export const metadata : Metadata = {
    title: "NoteHub - Not Found",
    description: "The requested note was not found.",
    openGraph: {
      title: "NoteHub - Not Found",
      description: "The requested note was not found.",
      url: `http://localhost:3000/not-found`,
      images: [
{
          url: " https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "NoteHub - Not Found",
        },
      ],
  },
}


export default function NotFound() {
    return( <>
         <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
       
)
}