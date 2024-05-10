import * as Yup from "yup";

export const coverSchema = Yup.object().shape({
    coveredaddress: Yup.string().required("Cover wallet address is required"),
    amountcovered: Yup.string().required("Amount covered is required"),
    description: Yup.string().required("Description is required")
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(8, "Password is too short")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    //   ),
    // confirm: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Password must match")
    //   .required("Confirm password is required")
    //   .min(8, "Password is too short"),
    // email: Yup.string().email("invalid email").required("Email is required"),
  })

  export default coverSchema