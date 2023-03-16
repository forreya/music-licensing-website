// import the necessary components and libraries
import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  // set up state variables and get cart data from redux store
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const navigate = useNavigate();

  // handle the form submission for each step
  const handleFormSubmit = async (values, actions, navigate) => {
    // move to next step
    setActiveStep(activeStep + 1);

    // calculate total price of items in cart
    const totalPrice = cart.reduce((total, beat) => {
      return total + beat.count * beat.price;
    }, 0);

    // if shipping address is the same as billing address, copy billing address to shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    // if user clicks 'place order', run the createOrder function
    if (isSecondStep) {
      createOrder(totalPrice, values);
    }

    actions.setTouched({});
  };

  // create an order with the total price and user data
  const createOrder = (totalPrice, values) => {
    return fetch('http://localhost:4000/create-order', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalPrice, email: values.email, phoneNumber: values.phoneNumber }),
      credentials: 'include',
      })
      .then((response) => {
      return response.json();
      })
      .then((orderDoc) => {
      navigate('/successful-order')
      })
      .catch((error) => {
      console.error(error);
      });
    };

  return (
    // display the checkout form
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          // handle form submission
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* display the Shipping component if it is the first step */}
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/* display the Payment component if it is the second step */}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

// Define an object containing the initial values of the checkout form
const initialValues = {
  // Define an object for the billing address
  billingAddress: {
    // Set initial values for the billing address fields
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  // Define an object for the shipping address, with an initial value of 'true' for the 'isSameAddress' field
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  // Set initial values for the email and phone number fields
  email: "",
  phoneNumber: "",
};

// Schema for validating the checkout form inputs using Yup library.
const checkoutSchema = [
  // The first shape object represents the billing and shipping address fields.
  yup.object().shape({
    // Define validation rules for the billing address fields.
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    // Define validation rules for the shipping address fields.
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  // The second shape object represents the email and phone number fields.
  yup.object().shape({
    // Define validation rules for the email field.
    email: yup.string().required("required"),
    // Define validation rules for the phone number field.
    phoneNumber: yup.string().required("required"),
  }),
];


export default Checkout;