import Hero         from '@/sections/Hero'
import QuickLinks   from '@/sections/QuickLinks'
import Events       from '@/sections/Events'
import Highlights   from '@/sections/Highlights'
import Speakers     from '@/sections/Speakers'
import Registration from '@/sections/Registration'
import Sponsors     from '@/sections/Sponsors'
import Contact      from '@/sections/Contact'
import Footer       from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Events />
      <Highlights />
      <Speakers />
      <Registration />
      <Sponsors />
      <Contact />
      <Footer />
    </>
  )
}
