import React, { useState } from "react";
import { loginUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { access_token } = await loginUser(email, password);
      localStorage.setItem("token", access_token);
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Falha no login");
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.logoLL}>
            <span className={styles.logoMark}>L&L</span>
            <span className={styles.logoText}>Live & Learn</span>
          </div>
          <h1>Bem-vindo de volta ao Live & Learn</h1>
          <p>Aprenda intencionalmente. Viva com curiosidade. Retome sua jornada de aprendizado de onde parou.</p>
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
          <div className={styles.formTitle}>Acesse sua conta</div>
          <div className={styles.formSubtitle}>Continue sua jornada personalizada de aprendizado com segurança.</div>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
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
            </div>
            {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
            <button className={styles.button + ' ' + styles.buttonPrimary} type="submit">Entrar</button>
          </form>
          <div className={styles.bottomText}>
            Não tem uma conta? <Link to="/register" className={styles.linkRegister}>Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}