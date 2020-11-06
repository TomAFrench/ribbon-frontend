import React from "react";
import { useParams } from "react-router-dom";
import { useInstrument } from "../../hooks/useInstruments";
import Content404 from "../Content404";
import PurchaseInstrument from "./PurchaseInstrument";

type PurchaseInstrumentWrapperProps = {};

interface ParamTypes {
  instrumentSymbol: string;
}

const PurchaseInstrumentWrapper: React.FC<PurchaseInstrumentWrapperProps> = () => {
  const { instrumentSymbol } = useParams<ParamTypes>();
  const res = useInstrument(instrumentSymbol);
  let comp;

  switch (res.status) {
    case "success":
      comp = (
        <PurchaseInstrument
          instrument={res.instrument}
          product={{
            name: "Twin Yield ETH-USDC",
            targetCurrency: "ETH",
            paymentCurrency: "USDC",
            expiryTimestamp: 1604361600,
            instruments: [],
          }}
        ></PurchaseInstrument>
      );
      break;
    case "error":
      comp = <Content404></Content404>;
      break;
    case "loading":
      comp = <div style={{ textAlign: "center" }}>Loading...</div>;
      break;
  }
  return comp;
};

export default PurchaseInstrumentWrapper;