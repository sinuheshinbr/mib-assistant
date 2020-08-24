import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as Yup from "yup";
import Quadrante from "./Quadrante";

const initialValues = {
  latDegree: "",
  latMinute: "",
  latDirection: "",
  lngDegree: "",
  lngMinute: "",
  lngDirection: "",
  quadrante: ""
};

const SignupSchema = Yup.object().shape({
  latDegree: Yup.number()
    .typeError("Numbers Only")
    .required("Required")
    .max(180, "Max 180 degrees"),
  latMinute: Yup.number()
    .typeError("Numbers Only")
    .required("Required")
    .max(60, "Max 60 minutes"),
  latDirection: Yup.string()
    .required("Required")
    .matches(/(n|s)/i, "Choose N or S"),
  lngDegree: Yup.number()
    .typeError("Numbers Only")
    .required("Required")
    .max(180, "Max 180 degrees"),
  lngMinute: Yup.number()
    .typeError("Numbers Only")
    .required("Required")
    .max(60, "Max 60 minutes"),
  lngDirection: Yup.string()
    .required("Required")
    .matches(/(e|w)/i, "Choose E or W")
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      list: []
    };
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  };

  handleSubmit = (values, { resetForm }) => {
    let newList = [...this.state.list];
    newList.unshift(values);
    this.setState({
      list: newList,
      quadrante: "a"
    });
    resetForm();
    this.focusTextInput();
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={SignupSchema}
        >
          {({ values }) => (
            <Form>
              <table className="table">
                <thead>
                  <tr>
                    <th>Lat °</th>
                    <th>Lat '</th>
                    <th>Lat (N/S)</th>
                    <th>Lng °</th>
                    <th>Lng '</th>
                    <th>Lng (E/W)</th>
                    <th>Quadrant</th>
                    <th>Add</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Field
                        required
                        name="latDegree"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="latDegree" />}
                        inputRef={this.textInput}
                      />
                    </td>
                    <td>
                      <Field
                        name="latMinute"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="latMinute" />}
                      />
                    </td>
                    <td>
                      <Field
                        name="latDirection"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="latDirection" />}
                      />
                    </td>
                    <td>
                      <Field
                        name="lngDegree"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="lngDegree" />}
                      />
                    </td>
                    <td>
                      <Field
                        name="lngMinute"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="lngMinute" />}
                      />
                    </td>
                    <td>
                      <Field
                        name="lngDirection"
                        type="input"
                        as={TextField}
                        helperText={<ErrorMessage name="lngDirection" />}
                      />
                    </td>
                    <td>
                      <Quadrante name="quadrante" />
                    </td>
                    <td>
                      <Button type="submit">+</Button>
                    </td>
                  </tr>
                  {this.state.list.map((obj, index) => (
                    <tr key={index}>
                      <th>{obj.latDegree}</th>
                      <th>{obj.latMinute}</th>
                      <th>{obj.latDirection}</th>
                      <th>{obj.lngDegree}</th>
                      <th>{obj.lngMinute}</th>
                      <th>{obj.lngDirection}</th>
                      <th>{obj.quadrante}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Table;
