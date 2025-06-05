import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });

   const { userId } = await auth();
  
    let bookmarkedIds: string[] = [];
  
    if (userId) {
      const bookmarked = await getBookmarkedCompanions(userId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      bookmarkedIds = bookmarked.map((companion) => companion?.id);
    }

  return (
    <main>
      <section className="flex justify-between gap-4">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard 
            key={companion.id} 
            {...companion}
            color={getSubjectColor(companion.subject)}
            bookmarked={bookmarkedIds.includes(companion.id)}
          />
        ))}
      </section>
    </main>
  )
}

export default CompanionsLibrary