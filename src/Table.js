import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, InputBase, Button } from "@material-ui/core";

const Table = () => (
  <div>
    <Formik
      initialValues={{
        latDegree: "",
        latMinute: "",
        latDirection: "",
        lgnDegree: "",
        lngMinute: "",
        lngDirection: "",
        quadrante: "4"
      }}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
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
                <th>Adicionar</th>
                <th>Quadrante</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Field name="latDegree" type="input" as={TextField} />
                </th>
                <th>
                  <Field name="latMinute" type="input" as={TextField} />
                </th>
                <th>
                  <Field name="latDirection" type="input" as={TextField} />
                </th>
                <th>
                  <Field name="lngDegree" type="input" as={TextField} />
                </th>
                <th>
                  <Field name="lngMinute" type="input" as={TextField} />
                </th>
                <th>
                  <Field name="lngDirection" type="input" as={TextField} />
                </th>
                <th>
                  <Button type="submit">+</Button>
                </th>
                <th>
                  <Field
                    name="quadrante"
                    type="input"
                    readOnly
                    as={InputBase}
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

export default Table;
