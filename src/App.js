import React from "react";
// import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./App.css";

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

function App() {
  const validationsSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .matches(emailRegexp, "Doesn't match the rule")
      .required("Required"),
    password: yup
      .string()
      // .typeError("Должна быть строка")
      .min(6)
      .max(12)
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch")
      .required("Required"),
    name: yup
      .string()
      // .typeError("Должна быть строка")
      .min(1)
      .max(12)
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }} // слід задати щоб Реакт не лаявся, що форма не керована
      validateOnBlur // валідація при переході в інше поле
      onSubmit={(values) => {
        console.log(values);
      }} // метод, що викликає функцію при відправленні форми
      validationsSchema={validationsSchema}
    >
      {({
        values,
        errors,
        touched, // чи взаємодіяли ми з цим полем раніше?
        isValid, // чи валідна форма на даний момент?
        dirty, // чи змінювались взагалі колись значення форми?
        handleChange, // викликається щоразу, коли змінюються поля форми
        handleBlur, // викликається, коли переходимо з поля
        handleSubmit, // прив'язується до кнопки відправки форми і викликатиме функцію onSubmit
      }) => {
        <Form onSubmit={handleSubmit} className={"form"}>
          {/* <Field
            type="text"
            name="email"
            placeholder="Email Address"
            className="textbox"
          />
          {touched.email && errors.email && <p>{errors.email}</p>} */}
          <label htmlFor={"email"}>E-mail</label>
          <input
            id={"email"}
            type={"email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <label htmlFor={"password"}>Пароль</label>
          id={"email"}
          <input
            id={"password"}
            type={"password"}
            name={"password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <label htmlFor={"confirmPassword"}>Подтвердите пароль</label>
          <input
            id={"confirmPassword"}
            type={"password"}
            name={"confirmPassword"}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.confirmPassword && errors.confirmPassword && (
            <p>{errors.confirmPassword}</p>
          )}
          <label htmlFor={"name"}>Ваше имя</label>
          <input
            id={"name"}
            type={"text"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <button type={"submit"} disable={!isValid && !dirty}>
            Регистрация
          </button>
        </Form>;
      }}
    </Formik>
  );
}

export default App;
