import { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Aqui você pode chamar a API de cadastro
    alert(`Cadastro: ${name} - ${email}`);
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.logoLL}>
            <span className={styles.logoMark}>L&L</span>
            <span className={styles.logoText}>Live & Learn</span>
          </div>
          <h1>Crie sua conta no Live & Learn</h1>
          <p>Comece sua jornada personalizada de aprendizado agora mesmo.</p>
          <div className={styles.iconsRow}>
            <span className={`${styles.iconCircle} ${styles.icon1}`}>🎓</span>
            <span className={`${styles.iconCircle} ${styles.icon2}`}>📖</span>
            <span className={`${styles.iconCircle} ${styles.icon3}`}>💡</span>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.logoLL}>
            <span className={styles.logoMark}>L&L</span>
            <span className={styles.logoText}>Live & Learn</span>
          </div>
          <div className={styles.formTitle}>Criar conta</div>
          <div className={styles.formSubtitle}>Preencha os campos abaixo para começar a aprender.</div>
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <input
                className={styles.input}
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.button} type="submit">Cadastrar</button>
          </form>
          <div className={styles.bottomText}>
            Já tem uma conta? <a href="/" style={{ color: '#4e8d9c', textDecoration: 'none' }}>Entrar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
