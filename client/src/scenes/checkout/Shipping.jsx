import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

// This component receives some props and renders a form with billing and shipping address
// fields, along with a checkbox to indicate whether the shipping address is the same as the
// billing address. If the checkbox is unchecked, the shipping address fields are displayed.
const Shipping = ({
  values, // The current form values
  touched, // An object containing the fields that have been touched by the user
  errors, // An object containing validation errors for the fields
  handleChange, // A function to handle changes to form values
  handleBlur, // A function to handle when a field is blurred
  setFieldValue, // A function to set a form field value
}) => {
  return (
    <Box m="30px auto">
      {/* Display the billing address form */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      {/* Checkbox to indicate whether the shipping address is the same as the billing address */}
      <Box mb="20px">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
          label="Same for Shipping Address"
        />
      </Box>

      {/* Display the shipping address form if the checkbox is unchecked */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
