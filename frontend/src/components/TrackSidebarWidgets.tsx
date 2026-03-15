import styles from "../pages/TrackPage.module.css";

export default function TrackSidebarWidgets() {
  // Mock data for now
  return (
    <>
      <div className={styles.progressWidget}>
        <div className={styles.progressTitle}>Track Progress</div>
        <div className={styles.progressCircle}>42%</div>
        <div className={styles.progressText}>42% Complete</div>
        <div style={{ color: '#bfc9d1', fontSize: '0.98rem', marginTop: 8 }}>
          Completed activities: 7 / 18
        </div>
        <div style={{ marginTop: 12, color: '#4e8d9c', fontWeight: 600, fontSize: '1rem' }}>
          Next target: <br />
          <span style={{ color: '#22223b', fontWeight: 700 }}>Complete Foundations of Data</span>
        </div>
        <button className={styles.trackBtn} style={{ marginTop: 18, width: '100%' }}>Resume Track</button>
      </div>
      <div className={styles.badgesWidget}>
        <div className={styles.progressTitle}>Badges Earned</div>
        <div className={styles.badgeList}>
          <span className={styles.badgeIcon}>🏅</span>
          <span className={styles.badgeIcon}>💡</span>
          <span className={styles.badgeIcon}>🌱</span>
        </div>
      </div>
      <div className={styles.nextStepsWidget}>
        <div className={styles.progressTitle}>Recommended Next Steps</div>
        <div className={styles.nextStepList}>
          <div className={styles.nextStepItem}>
            <div className={styles.nextStepThumb} style={{backgroundImage: "url('https://source.unsplash.com/random/38x38?sig=1')"}} />
            <div className={styles.nextStepInfo}>
              <div style={{ fontWeight: 600 }}>Watch: Best practices for labeling data</div>
              <div style={{ color: '#bfc9d1', fontSize: '0.95rem' }}>10 min • Video</div>
            </div>
          </div>
          <div className={styles.nextStepItem}>
            <div className={styles.nextStepThumb} style={{backgroundImage: "url('https://source.unsplash.com/random/38x38?sig=2')"}} />
            <div className={styles.nextStepInfo}>
              <div style={{ fontWeight: 600 }}>Take: Quick quiz - data types</div>
              <div style={{ color: '#bfc9d1', fontSize: '0.95rem' }}>6 min • Quiz</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.supportWidget}>
        <div className={styles.progressTitle}>Need help?</div>
        <div style={{ color: '#4e8d9c', fontSize: '1rem', marginBottom: 8 }}>
          Join the community or schedule a mentor session to get feedback on your capstone.
        </div>
        <button className={styles.supportBtn}>Get Support</button>
      </div>
    </>
  );
}
