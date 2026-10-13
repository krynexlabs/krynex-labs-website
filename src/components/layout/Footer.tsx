import Link from 'next/link';
import { siteConfig, navItems } from '@/data/site-data';
import BrandMark from '@/components/ui/BrandMark';
import CurrentYear from '@/components/ui/CurrentYear';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="site-container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Krynex Labs — home">
              <BrandMark size={30} />
              <span className={styles.logoText}>KRYNEX LABS</span>
            </Link>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.description}>
              {siteConfig.description}
            </p>
          </div>

          <div className={styles.columns}>
            <nav aria-label="Company Navigation">
              <p className={styles.heading} role="heading" aria-level={3}>Navigation</p>
              <ul className={styles.list}>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Focus Areas">
              <p className={styles.heading} role="heading" aria-level={3}>What We Do</p>
              <ul className={styles.list}>
                <li><Link href="/what-we-do#saas-products">SaaS Product Development</Link></li>
                <li><Link href="/what-we-do#business-software">Business Software</Link></li>
                <li><Link href="/what-we-do#intelligent-technology">Intelligent Technology</Link></li>
                <li><Link href="/about#approach">Our Approach</Link></li>
              </ul>
            </nav>

            <nav aria-label="Legal & Inquiries">
              <p className={styles.heading} role="heading" aria-level={3}>Company</p>
              <ul className={styles.list}>
                <li><Link href="/contact">Contact Krynex Labs</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className={styles.parent}>
            SaaS software products and business software.
          </p>
        </div>

        <p className={styles.wordmark} aria-hidden="true">KRYNEX LABS</p>
      </div>
    </footer>
  );
}
