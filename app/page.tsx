import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionLists from '@/components/CompanionsList'
import Cta from '@/components/CTA'
import { getAllCompanions, getBookmarkedCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);
  
  const user = await currentUser();

  let bookmarkedIds: string[] = [];

  if (user?.id) {
    const bookmarked = await getBookmarkedCompanions(user?.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    bookmarkedIds = bookmarked.map((companion) => companion?.id);
  }

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            {...companion}
            key={companion.id}
            color={getSubjectColor(companion.subject)}
            bookmarked={bookmarkedIds.includes(companion.id)} 
          />
        ))}

      </section>

      <section className="home-section">
        <CompanionLists
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  )
}

export default Page