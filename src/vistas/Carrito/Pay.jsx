import React, { useEffect } from "react";

const WompiButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    script.setAttribute("data-render", "button");
    script.setAttribute(
      "data-public-key",
      "pub_test_jGZdlZTIT9P3LU2IKMYQfuT3JDyqpm0A"
    );
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount-in-cents", "4950000");
    script.setAttribute("data-reference", "4XMPGKWWPKWQ-MIGUE");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <form></form>;
};

export default WompiButton;
