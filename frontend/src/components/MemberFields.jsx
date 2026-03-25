import styles from './MemberFields.module.css'

const ROLL_REGEX = /^[0-9]{2}[a-zA-Z]{1,2}[0-9]{3}@psgtech\.ac\.in$/

export default function MemberFields({ index, data, onChange, errors }) {
  const label = index === 0 ? 'MEMBER 01' : 'MEMBER 02'
  const prefix = index === 0 ? 'member1' : 'member2'

  const handleChange = (field, value) => {
    onChange(index, field, value)
  }

  return (
    <div className={styles.memberBlock}>
      <div className={styles.memberHeader}>
        <span className={styles.memberLabel}>{label}</span>
        <div className={styles.memberLine} />
      </div>

      <div className={styles.grid}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <span className={styles.labelPrefix}>{'> '}</span>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={`${styles.input} ${errors[`${prefix}_name`] ? styles.inputError : ''}`}
            placeholder="Enter full name"
            value={data.name}
            onChange={e => handleChange('name', e.target.value)}
            autoComplete="off"
          />
          {errors[`${prefix}_name`] && (
            <span className={styles.errorMsg}>{errors[`${prefix}_name`]}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <span className={styles.labelPrefix}>{'> '}</span>
            Email ID <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={`${styles.input} ${errors[`${prefix}_email`] ? styles.inputError : ''}`}
            placeholder="23n231@psgtech.ac.in"
            value={data.email}
            onChange={e => handleChange('email', e.target.value.toLowerCase())}
            autoComplete="off"
          />
          <span className={styles.hint}>Format: 23n231@psgtech.ac.in</span>
          {errors[`${prefix}_email`] && (
            <span className={styles.errorMsg}>{errors[`${prefix}_email`]}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <span className={styles.labelPrefix}>{'> '}</span>
            Roll Number <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={`${styles.input} ${errors[`${prefix}_rollNumber`] ? styles.inputError : ''}`}
            placeholder="Enter roll number (e.g. 23N231)"
            value={data.rollNumber}
            onChange={e => handleChange('rollNumber', e.target.value)}
            autoComplete="off"
          />
          {errors[`${prefix}_rollNumber`] && (
            <span className={styles.errorMsg}>{errors[`${prefix}_rollNumber`]}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            <span className={styles.labelPrefix}>{'> '}</span>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            className={`${styles.input} ${errors[`${prefix}_phone`] ? styles.inputError : ''}`}
            placeholder="10-digit mobile number"
            value={data.phone}
            onChange={e => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            autoComplete="off"
          />
          {errors[`${prefix}_phone`] && (
            <span className={styles.errorMsg}>{errors[`${prefix}_phone`]}</span>
          )}
        </div>
      </div>
    </div>
  )
}
