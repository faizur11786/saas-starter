import type { Footer } from '@/payload-types'
import { FooterNav } from './Nav'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { CMSLink } from '@/components/custom/cms-link'
import RichText from '@/components/custom/rich-text'
import { siteConfig } from '@/config/site'
interface FooterClientProps {
  data: Footer
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  return (
    <footer className="mt-auto border-t border-border py-12 space-y-12 bg-secondary">
      <div className="container px-4 flex justify-between">
        <Link href={'/'}>
          <Logo />
        </Link>
      </div>
      <div className="container px-4">
        {data.legal && <RichText className="mb-6" data={data.legal} enableGutter={false} />}
      </div>

      <FooterNav data={data} />

      <nav>
        <ul className="flex gap-4 justify-center items-center ">
          {data.navItems?.map((link) => (
            <li key={link.id} className="text-muted-foreground text-sm">
              <CMSLink {...link.link} />
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-sm !mt-3 text-center text-muted-foreground">
        {`© 2025 ${siteConfig.name}. All rights reserved.`}
      </p>
    </footer>
  )
}
