import * as React from "react";
import {useState} from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("Hello world");
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        try {
            const salt = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users/salt/${data.get("email")}`
            );
            console.log(`saltRes: ${salt.data}`);

            const hashedPassword = await bcrypt.hash(
                data.get("password"),
                salt.data
            );
            console.log(`hashedPassword: ${hashedPassword}`);

            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/${data.get("email")}/verify`,
                {
                    email: data.get("email"),
                    hashedPassword: hashedPassword,
                }
            );
            console.log(`Result: ${res}`);
            localStorage.setItem("userID", res.data.id);
            localStorage.setItem("firstName", res.data.firstName);
            localStorage.setItem("lastName", res.data.lastName);
            window.location.href = "/";
        } catch (err) {
            if (err.response.status === 404) {
                setErrorMessage("Invalid email address.");
            } else if (err.response.status === 403) {
                setErrorMessage("Incorrect password, please try again.");
            } else {
                console.error(err);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Sign In
                        </Button>
                        {errorMessage && (
                            <Typography color="error" variant="body2">
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
