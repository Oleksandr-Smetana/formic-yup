import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

// ================= useFormik() ===================

function App() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите email")
      .matches(emailRegexp, "Некорректный email")
      .required("Обязательное поле"),
    password: yup.string().min(6).max(12).required("Обязательное поле"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Обязательное поле"),
    name: yup.string().min(1).max(12).required("Обязательное поле"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      resetForm();
    }, // метод, що викликає функцію при відправленні форми
  });

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  console.log("formik: ", formik);

  return (
    <>
      <form onSubmit={handleSubmit} className={"form"}>
        <label htmlFor={"email"}>E-mail</label>
        <input
          id={"email"}
          type={"email"}
          name={"email"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {/* {touched.email && errors.email ? toast.warn(errors.email) : null} */}
        {touched.email && errors.email && <p>{errors.email}</p>}

        <label htmlFor={"password"}>Пароль</label>
        <input
          id={"password"}
          type={"password"}
          name={"password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {/* {touched.password && errors.password
          ? toast.warn(errors.password)
          : null} */}
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
        {/* {touched.confirmPassword && errors.confirmPassword
          ? toast.warn(errors.confirmPassword)
          : null} */}
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
        {/* {touched.name && errors.name ? toast.warn(errors.name) : null} */}
        {touched.name && errors.name && <p>{errors.name}</p>}

        <button type="submit" disabled={isValid && !dirty}>
          Регистрация
        </button>
      </form>
      {/* <ToastContainer
        autoClose={2000}
        position="top-center"
        theme="colored"
        limit={1}
      /> */}
    </>
  );
}

export default App;

// ================= <Formik /> ===================

// <Formik
//   initialValues={{
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   }} // слід задати щоб Реакт не лаявся, що форма не керована
//   validateOnBlur // валідація при переході в інше поле
//   onSubmit={(values) => {
//     console.log(values);
//   }} // метод, що викликає функцію при відправленні форми
//   validationsSchema={validationsSchema}
// >
//   {({
//     values,
//     errors,
//     touched, // чи взаємодіяли ми з цим полем раніше?
//     isValid, // чи валідна форма на даний момент?
//     dirty, // чи змінювались взагалі колись значення форми?
//     handleChange, // викликається щоразу, коли змінюються поля форми
//     handleBlur, // викликається, коли переходимо з поля
//     handleSubmit, // прив'язується до кнопки відправки форми і викликатиме функцію onSubmit
//   }) => {
//     <Form onSubmit={handleSubmit} className={"form"}>
//       {/* <Field
//         type="text"
//         name="email"
//         placeholder="Email Address"
//         className="textbox"
//       />
//       {touched.email && errors.email && <p>{errors.email}</p>} */}
//       <label htmlFor={"email"}>E-mail</label>
//       <input
//         id={"email"}
//         type={"email"}
//         name={"email"}
//         value={values.email}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       ></input>
//       {touched.email && errors.email && <p>{errors.email}</p>}
//       <label htmlFor={"password"}>Пароль</label>
//       {/* id={"email"} */}
//       <input
//         id={"password"}
//         type={"password"}
//         name={"password"}
//         value={values.password}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       ></input>
//       {touched.password && errors.password && <p>{errors.password}</p>}
//       <label htmlFor={"confirmPassword"}>Подтвердите пароль</label>
//       <input
//         id={"confirmPassword"}
//         type={"password"}
//         name={"confirmPassword"}
//         value={values.confirmPassword}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       ></input>
//       {touched.confirmPassword && errors.confirmPassword && (
//         <p>{errors.confirmPassword}</p>
//       )}
//       <label htmlFor={"name"}>Ваше имя</label>
//       <input
//         id={"name"}
//         type={"text"}
//         name={"name"}
//         value={values.name}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       ></input>
//       {touched.name && errors.name && <p>{errors.name}</p>}
//       <button type={"submit"} disable={!isValid && !dirty}>
//         Регистрация
//       </button>
//     </Form>;
//   }}
// </Formik>
