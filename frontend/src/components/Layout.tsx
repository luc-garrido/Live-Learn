import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {

  return (

    <div>

      <header
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "16px"
        }}
      >
        <h2>Live & Learn</h2>
      </header>

      <main
        style={{
          padding: "30px"
        }}
      >
        {children}
      </main>

    </div>

  );

}