import CompanionCard from '@/components/CompanionCard'
import CompanionLists from '@/components/CompanionsList'
import Cta from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="1"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
       
       <CompanionCard
          id="2"
          name="Countsy of the Number Wizard"
          topic="Derivatives & Integrals"
          subject="science"
          duration={30}
          color="#e5d0ff"
        />

        <CompanionCard
          id="3"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          subject="language"
          duration={30}
          color="#bde7ff"
        />
      </section>

      <section className="home-section">
        <CompanionLists
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  )
}

export default Page