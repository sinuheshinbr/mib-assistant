import React from "react";
import { useFormikContext, Field } from "formik";
import { InputBase } from "@material-ui/core";

const Quadrante = (props) => {
  const {
    values: {
      latDegree,
      latMinute,
      latDirection,
      lngDegree,
      lngMinute,
      lngDirection
    },
    setFieldValue
  } = useFormikContext();

  React.useEffect(() => {
    let line;
    let column;
    let lineRow;
    let quadrante;
    if (latDirection.toLowerCase() === "n") {
      latDegree < 90 ? (line = "2") : (line = "1");
    } else if (latDirection.toLowerCase() === "s") {
      latDegree < 90 ? (line = "3") : (line = "4");
    } else {
      line = "";
    }
    if (lngDirection.toLowerCase() === "w") {
      lngDegree < 90 ? (column = "1") : (column = "4");
    } else if (lngDirection.toLowerCase() === "e") {
      lngDegree < 90 ? (column = "2") : (column = "3");
    } else {
      column = "";
    }
    lineRow = line + column;
    switch (lineRow) {
      case "11":
        quadrante = "1";
        break;
      case "12":
        quadrante = "2";
        break;
      case "13":
        quadrante = "3";
        break;
      case "14":
        quadrante = "4";
        break;
      case "21":
        quadrante = "5";
        break;
      case "22":
        quadrante = "6";
        break;
      case "23":
        quadrante = "7";
        break;
      case "24":
        quadrante = "8";
        break;
      case "31":
        quadrante = "9";
        break;
      case "32":
        quadrante = "10";
        break;
      case "33":
        quadrante = "11";
        break;
      case "34":
        quadrante = "12";
        break;
      case "41":
        quadrante = "13";
        break;
      case "42":
        quadrante = "14";
        break;
      case "43":
        quadrante = "15";
        break;
      case "44":
        quadrante = "16";
        break;
      default:
        quadrante = "";
    }
    setFieldValue(props.name, quadrante);
  }, [
    latDegree,
    latMinute,
    latDirection,
    lngDegree,
    lngMinute,
    lngDirection,
    setFieldValue,
    props.name
  ]);

  return <Field name="quadrante" type="input" readOnly as={InputBase} />;
};

export default Quadrante;
