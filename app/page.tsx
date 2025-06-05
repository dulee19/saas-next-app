import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionLists from '@/components/CompanionsList'
import Cta from '@/components/CTA'
import { getAllCompanions, getBookmarkedCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);
  
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