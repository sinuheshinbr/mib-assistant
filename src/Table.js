import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import * as Yup from "yup";
import Quadrante from "./Quadrante";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

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
      list: [],
      ancient: false
    };
  }

  componentDidMount() {
    let list = localStorage.getItem("list");
    if (list) {
      let newList = JSON.parse(list);
      this.setState({
        list: newList
      });
    }
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  };

  handleSubmit = (values, { resetForm }) => {
    let newList = [...this.state.list];
    let newValues = { ancient: this.state.ancient, ...values };
    newList.unshift(newValues);
    localStorage.setItem("list", JSON.stringify(newList));
    this.setState({ list: newList });
    resetForm();
    this.focusTextInput();
  };

  handleDelete = (index) => {
    let newList = [...this.state.list];
    newList.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(newList));
    this.setState({ list: newList });
  };

  handleClear = () => {
    localStorage.clear();
    this.setState({
      list: []
    });
  };

  handleCheck = () => {
    this.setState({
      ancient: !this.state.ancient
    });
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
                    <th></th>
                    <th>Ancient?</th>
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
                      <Button variant="contained" type="submit">
                        +
                      </Button>
                    </td>
                    <td>
                      <Checkbox
                        color="primary"
                        checked={this.checked}
                        onChange={this.handleCheck}
                      />
                    </td>
                    <td>
                      <div>
                        <Button
                          style={{ width: "150px", padding: "6px" }}
                          onClick={this.handleClear}
                          variant="contained"
                        >
                          <DeleteIcon className="icon" />
                          Clear data
                        </Button>
                      </div>
                      <div className="personal"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table>
                <tbody>
                  {this.state.list.map((obj, index) => (
                    <tr key={index}>
                      <td>{obj.latDegree}</td>
                      <td>{obj.latMinute}</td>
                      <td>{obj.latDirection}</td>
                      <td>{obj.lngDegree}</td>
                      <td>{obj.lngMinute}</td>
                      <td>{obj.lngDirection}</td>
                      <td>{obj.quadrante}</td>
                      <td>
                        <DeleteIcon onClick={() => this.handleDelete(index)} />
                      </td>
                      <td>{obj.ancient ? "Ancient MIB" : "MIB"}</td>
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
