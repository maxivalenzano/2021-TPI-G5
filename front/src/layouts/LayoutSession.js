import React from "react";
import LoadRoutes from "config/LoadRoutes";
import Footer from "components/Footer";

export default function LayoutSesson(props) {
  const { routes } = props;

  return (
    <>
      <LoadRoutes routes={routes} />
      <Footer
        title="Los cracks"
        description="Página diseñada para la matería de DACS"
      />
    </>
  );
}
