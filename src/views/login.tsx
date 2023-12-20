import { ChangeEvent, useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthStore } from "../store/auth";
import loginBanner from "../assets/login-banner.png";

function Login() {
  const login = useAuthStore((state) => state.login);

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorUser, setErrorUser] = useState<string>("");

  const onLogin = () => {
    if (!validateUser(user)) {
      setErrorUser("Usuario no valido.");
      return;
    }
    if (!validatePassword(user, password)) {
      setErrorPassword("Contraseña no valida.");
      return;
    }

    login({ user, password });
  };

  const validateUser = (user: string): boolean => {
    const userRegex = /^[a-z]+$/;

    if (userRegex.test(user)) return true;
    return false;
  };

  const validatePassword = (user: string, password: string): boolean => {
    const passwordRegex = new RegExp(
      `^123${user.charAt(0).toUpperCase()}${user.slice(1)}$`
    );

    if (passwordRegex.test(password)) return true;
    return false;
  };

  const handleChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorUser("");
    setUser(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorPassword("");
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 1,
          p: 2,
          minWidth: 300,
          width: 400,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Grid
          container
          item
          justifyContent="center"
          direction="column"
          xs={12}
          sm={12}
        >
          <img src={loginBanner} alt="login-banner" style={{ width: "100%" }} />
          <FormControl sx={{ mt: 2, mr: 1, ml: 1, mb: 1 }} variant="outlined">
            <TextField
              id="user"
              label="Usuario"
              variant="outlined"
              value={user}
              onChange={handleChangeUser}
            />
          </FormControl>
          {errorUser && (
            <Typography
              sx={{
                ml: 1,
                color: "#f44336",
              }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errorUser}
            </Typography>
          )}
          <FormControl
            sx={{ mt: errorUser ? 2 : 4, mr: 1, ml: 1, mb: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          </FormControl>
          {errorPassword && (
            <Typography
              sx={{
                ml: 1,
                color: "#f44336",
              }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errorPassword}
            </Typography>
          )}
          <Button
            variant="outlined"
            sx={{ mt: errorPassword ? 2 : 4, mr: 1, ml: 1, mb: 1 }}
            onClick={onLogin}
          >
            LOGIN
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Login;
