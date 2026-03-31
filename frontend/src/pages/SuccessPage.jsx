import { useEffect, useState } from 'react'
import styles from './SuccessPage.module.css'
import ContactSection from '../components/ContactSection'

export default function SuccessPage({ data, onReset }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [data])

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <>
    <div className={`${styles.page} ${visible ? styles.pageVisible : ''}`}>
      <div className={styles.bgGrid} />
      <div className={styles.scanLine} />

      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.iconWrap}>
          <div className={styles.iconRing1} />
          <div className={styles.iconRing2} />
          <div className={styles.iconRing3} />
          <div className={styles.iconCore}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.checkSvg}>
              <path d="M8 20L16 28L32 12" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className={styles.statusTag}>
          <span className={styles.statusDot} />
          REGISTRATION CONFIRMED
        </div>

        <h1 className={styles.title}>
          ACCESS <span className={styles.accent}>GRANTED</span>
        </h1>

        <p className={styles.subtitle}>
          You're in. Team <strong className={styles.teamHighlight}>{data.teamName}</strong> is
          officially registered for CipherClash. Prepare your arsenal.
        </p>

        {/* WhatsApp Group CTA */}
        <a
          href="https://chat.whatsapp.com/JrCrQ0JLhD0LVPgjQNXcs6?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBanner}
        >
          <div className={styles.whatsappIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className={styles.whatsappContent}>
            <span className={styles.whatsappLabel}>JOIN THE OFFICIAL GROUP</span>
            <span className={styles.whatsappText}>Click here to join our WhatsApp group for event updates &amp; announcements</span>
          </div>
          <div className={styles.whatsappArrow}>→</div>
        </a>

        {/* Info Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>TEAM INTEL</span>
            <span className={styles.cardTime}>
              {data.registeredAt ? formatDate(data.registeredAt) : 'Just now'}
            </span>
          </div>

          <div className={styles.teamMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>TEAM NAME</span>
              <span className={styles.metaValue}>{data.teamName}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>DEPARTMENT</span>
              <span className={styles.metaValue}>{data.department}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>YEAR</span>
              <span className={styles.metaValue}>Year {data.yearOfStudy}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>EVENT DATE</span>
              <span className={styles.metaValue}>April 1</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.membersLabel}>REGISTERED OPERATIVES</div>
          <div className={styles.members}>
            {data.members.map((member, i) => (
              <div key={i} className={styles.memberCard}>
                <div className={styles.memberNum}>0{i + 1}</div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberEmail}>{member.email}</span>
                  <span className={styles.memberRoll}>{member.rollNumber}</span>
                </div>
                <div className={styles.memberStatus}>
                  <span className={styles.activeDot} />
                  ACTIVE
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className={styles.nextSteps}>
          <div className={styles.nextTitle}>
            <span className={styles.nextPrefix}>//</span> WHAT'S NEXT
          </div>
          <div className={styles.steps}>
            {[
              { num: '01', text: 'Watch your email for event confirmation and schedule details' },
              { num: '02', text: 'Join our official WhatsApp group below for real-time event updates' },
              { num: '03', text: 'Report to the venue 30 minutes before the event starts' },
              { num: '04', text: 'Bring your PSG Tech ID card for verification at entry' },
            ].map(step => (
              <div key={step.num} className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <span className={styles.stepText}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.resetBtn} onClick={onReset}>
            ← Register Another Team
          </button>
        </div>
      </div>
    </div>
    <ContactSection />
    </>
  )
}
