import React, { useState } from "react";
import Signup from "./component/Signup";
import YupSignup from "./component/YupSignup";

import { createTheme, ThemeProvider } from "@mui/material";
import { Wrapper } from "./component/Styled";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        size: "medium",
      },
    },
  },
});

const App = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <h2>{toggle ? "Yup Signup Form" : "React Hook Signup Form"}</h2>

        {toggle ? <YupSignup /> : <Signup />}
        <h5 onClick={() => setToggle(!toggle)}>
          Click here to change
          {toggle ? " React Hook Signup Form" : " Yup Signup Form"}
        </h5>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
