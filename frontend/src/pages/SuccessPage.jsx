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
              { num: '02', text: 'Join the official WhatsApp/Discord channel shared via email' },
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
